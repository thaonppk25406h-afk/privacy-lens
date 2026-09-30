import React, { useState, useEffect } from 'react';
import {
  Globe,
  ArrowLeft,
  RotateCcw,
  Copy,
  Check,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Edit3,
  X,
  RefreshCw
} from 'lucide-react';
import { PolicySummaryResult } from '../types';
import { PRELOADED_POLICIES, PreloadedPolicyItem } from './preloadedPolicies';

interface PolicySummarizerViewProps {
  onBackToHome: () => void;
  initialResult?: PolicySummaryResult | null;
  initialSampleId?: string | null;
}

const CACHE_PREFIX = 'policy-cache-v4:';

export interface CriteriaStats {
  total: number;
  clear: number;
  incomplete: number;
  notMentioned: number;
  clearPercent: number;
  incompletePercent: number;
  notMentionedPercent: number;
}

/**
 * Pure JavaScript calculation function to compute criteria counts and percentages.
 * Never delegates aggregate counting to LLM to prevent hallucinations.
 */
export function calculateCriteriaStats(result: PolicySummaryResult | null): CriteriaStats {
  if (!result) {
    return {
      total: 13,
      clear: 0,
      incomplete: 0,
      notMentioned: 0,
      clearPercent: 0,
      incompletePercent: 0,
      notMentionedPercent: 0,
    };
  }

  const list = result.tieuChiDanhGia || result.goldenRules || [];
  const total = 13;
  let clear = 0;
  let incomplete = 0;
  let notMentioned = 0;

  list.forEach((item) => {
    const m = String(item.muc || (item as any).status || '').toLowerCase();
    if (m === 'ro_rang' || m === 'clear' || (item as any).passed === true) {
      clear++;
    } else if (m === 'khong_de_cap' || m === 'not_mentioned') {
      notMentioned++;
    } else {
      incomplete++;
    }
  });

  const clearPercent = total > 0 ? (clear / total) * 100 : 0;
  const incompletePercent = total > 0 ? (incomplete / total) * 100 : 0;
  const notMentionedPercent = total > 0 ? (notMentioned / total) * 100 : 0;

  return {
    total,
    clear,
    incomplete,
    notMentioned,
    clearPercent,
    incompletePercent,
    notMentionedPercent,
  };
}

function getTodayFormatted(): string {
  const now = new Date();
  const d = String(now.getDate()).padStart(2, '0');
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const y = now.getFullYear();
  return `${d}/${m}/${y}`;
}

export const PolicySummarizerView: React.FC<PolicySummarizerViewProps> = ({
  onBackToHome,
  initialResult = null,
  initialSampleId = null,
}) => {
  const [inputMode, setInputMode] = useState<'url' | 'text'>('url');
  const [urlInput, setUrlInput] = useState<string>('https://tiktok.com/privacy-policy');
  const [textInput, setTextInput] = useState<string>('');
  const [appNameInput, setAppNameInput] = useState<string>('TikTok');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<PolicySummaryResult | null>(initialResult);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [manualCopyText, setManualCopyText] = useState<string | null>(null);
  const [, setCacheVersion] = useState(0);

  // Automatically sweep away any legacy v1/v2/v3 caches that had 5 criteria
  useEffect(() => {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('policy-cache') && !k.startsWith(CACHE_PREFIX)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
  }, []);

  // Helper to read cached result for a sample
  const getSampleCache = (item: PreloadedPolicyItem): PolicySummaryResult | null => {
    try {
      const raw = localStorage.getItem(`${CACHE_PREFIX}${item.id}:${item.policyDate}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.tieuChiDanhGia && Array.isArray(parsed.tieuChiDanhGia) && parsed.tieuChiDanhGia.length === 13) {
          return parsed;
        }
        localStorage.removeItem(`${CACHE_PREFIX}${item.id}:${item.policyDate}`);
      }
    } catch {
      // ignore
    }
    return null;
  };

  // Unified execution for sample or custom input
  const executeAnalysis = async (
    textToAnalyze: string,
    targetUrl: string | undefined,
    targetAppName: string,
    policyDate: string,
    sampleId?: string,
    isDemo?: boolean,
    forceRefresh = false
  ) => {
    const cacheKey = sampleId ? `${CACHE_PREFIX}${sampleId}:${policyDate}` : null;

    // Check localStorage cache if not forcing refresh
    if (cacheKey && !forceRefresh) {
      try {
        const cachedRaw = localStorage.getItem(cacheKey);
        if (cachedRaw) {
          const cachedData: PolicySummaryResult = JSON.parse(cachedRaw);
          if (cachedData.tieuChiDanhGia && Array.isArray(cachedData.tieuChiDanhGia) && cachedData.tieuChiDanhGia.length === 13) {
            setResult({
              ...cachedData,
              isDemoData: isDemo,
              sampleId,
              policyDate,
            });
            setIsProcessing(false);
            setProcessStep('');
            return;
          }
          // Outdated cache format: purge and re-fetch fresh 13 criteria
          localStorage.removeItem(cacheKey);
        }
      } catch (cacheReadErr) {
        console.warn('Lỗi đọc cache từ localStorage:', cacheReadErr);
      }
    }

    setErrorMessage(null);
    setCopyError(null);
    setManualCopyText(null);
    setIsProcessing(true);

    if (sampleId) {
      setProcessStep(
        forceRefresh
          ? `Đang gửi lại chính sách ${targetAppName} tới AI để phân tích lại...`
          : `Đang gửi chính sách ${targetAppName} tới AI để phân tích lần đầu...`
      );
    } else {
      setProcessStep('Hệ thống pháp lý đang phân tích và đối chiếu 13 tiêu chí tuân thủ...');
    }

    try {
      let summarizeRes: Response;
      try {
        summarizeRes = await fetch('/api/summarize-policy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: textToAnalyze,
            url: targetUrl,
            appName: targetAppName || 'Ứng dụng',
          }),
        });
      } catch (sumErr: any) {
        throw new Error(
          `Không thể kết nối đến máy chủ soát xét (${sumErr?.message || 'Lỗi mạng'}). Vui lòng thử lại!`
        );
      }

      if (!summarizeRes.ok) {
        const errData = await summarizeRes.json().catch(() => ({}));
        throw new Error(errData.error || `Lỗi khi soát xét chính sách bảo mật (HTTP ${summarizeRes.status})`);
      }

      const summarizeData = await summarizeRes.json();
      const now = new Date();
      const cachedAtStr = `${now.toLocaleDateString('vi-VN')} - ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;

      const newResult: PolicySummaryResult = {
        ...summarizeData.data,
        sourceUrl: targetUrl,
        isDemoData: isDemo,
        policyDate,
        cachedAt: cachedAtStr,
        sampleId,
      };

      // Save to localStorage if this was a preloaded sample
      if (cacheKey) {
        try {
          localStorage.setItem(cacheKey, JSON.stringify(newResult));
          setCacheVersion((v) => v + 1);
        } catch (cacheErr) {
          console.warn('Không thể lưu kết quả vào localStorage:', cacheErr);
        }
      }

      setResult(newResult);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
      setProcessStep('');
    }
  };

  // Quick load sample policy with cache check
  const handleLoadSample = (sampleId: string) => {
    const item = PRELOADED_POLICIES.find((p) => p.id === sampleId);
    if (!item) return;
    setUrlInput(item.url);
    setTextInput(item.rawText);
    setAppNameInput(item.name);
    executeAnalysis(
      item.rawText,
      item.url,
      item.name,
      item.policyDate,
      item.id,
      item.isDemoData,
      false
    );
  };

  // Re-analyze sample (wipe cache and re-call AI)
  const handleReanalyze = (sampleId: string) => {
    const item = PRELOADED_POLICIES.find((p) => p.id === sampleId);
    if (!item) return;
    try {
      // Remove both current and any legacy versions
      localStorage.removeItem(`${CACHE_PREFIX}${item.id}:${item.policyDate}`);
      localStorage.removeItem(`policy-cache:${item.id}:${item.policyDate}`);
      localStorage.removeItem(`policy-cache-v2:${item.id}:${item.policyDate}`);
      localStorage.removeItem(`policy-cache-v3:${item.id}:${item.policyDate}`);
      setCacheVersion((v) => v + 1);
    } catch (e) {
      console.warn('Lỗi xóa cache:', e);
    }
    executeAnalysis(
      item.rawText,
      item.url,
      item.name,
      item.policyDate,
      item.id,
      item.isDemoData,
      true
    );
  };

  // Trigger sample if initialSampleId is provided from parent
  useEffect(() => {
    if (initialSampleId) {
      handleLoadSample(initialSampleId);
    }
  }, [initialSampleId]);

  // Perform Manual Policy Review (URL or Text)
  const handleSummarize = async () => {
    setErrorMessage(null);
    setCopyError(null);
    setManualCopyText(null);

    const targetUrl = urlInput.trim();
    let targetAppName = appNameInput.trim();
    const todayStr = getTodayFormatted();

    if (inputMode === 'url') {
      if (!targetUrl || !targetUrl.startsWith('http')) {
        setErrorMessage('Vui lòng nhập URL hợp lệ bắt đầu bằng http:// hoặc https://');
        return;
      }

      // Check if URL matches a preloaded sample
      const matchingSample = PRELOADED_POLICIES.find(
        (p) => p.url.toLowerCase() === targetUrl.toLowerCase()
      );
      if (matchingSample) {
        handleLoadSample(matchingSample.id);
        return;
      }

      setIsProcessing(true);
      setProcessStep('Đang kết nối và tải nội dung từ trang web...');

      try {
        let crawlRes: Response;
        try {
          crawlRes = await fetch('/api/crawl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: targetUrl }),
          });
        } catch (fetchErr: any) {
          throw new Error(
            `Không thể kết nối đến máy chủ ứng dụng (${fetchErr?.message || 'Lỗi mạng'}). Vui lòng thử lại hoặc dán trực tiếp văn bản!`
          );
        }

        if (!crawlRes.ok) {
          const errData = await crawlRes.json().catch(() => ({}));
          throw new Error(
            errData.error || `Không thể tải trang web (HTTP ${crawlRes.status}: ${crawlRes.statusText})`
          );
        }

        const crawlData = await crawlRes.json();
        if (!targetAppName) {
          targetAppName = crawlData.title || 'Ứng dụng';
        }

        await executeAnalysis(
          crawlData.text,
          targetUrl,
          targetAppName,
          todayStr,
          undefined,
          false,
          true
        );
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setErrorMessage(msg);
        setIsProcessing(false);
        setProcessStep('');
      }
    } else {
      if (!textInput || textInput.trim().length < 40) {
        setErrorMessage('Vui lòng nhập hoặc dán nội dung chính sách bảo mật ít nhất 40 ký tự!');
        return;
      }
      await executeAnalysis(
        textInput,
        undefined,
        targetAppName || 'Ứng dụng di động',
        todayStr,
        undefined,
        false,
        true
      );
    }
  };

  const handleCopySummary = async () => {
    if (!result) return;
    setCopyError(null);
    setManualCopyText(null);

    const stats = calculateCriteriaStats(result);
    const notes = result.diemDangLuuY || result.violations || [];
    const dateOfPolicy = result.policyDate || getTodayFormatted();
    const sourceDescription = result.sourceUrl
      ? `${result.sourceUrl} (lấy ngày ${dateOfPolicy})`
      : `Văn bản dán trực tiếp (lấy ngày ${dateOfPolicy})`;

    const summaryText = `--- BÁO CÁO SOÁT XÉT CHÍNH SÁCH BẢO MẬT ---
Đơn vị / Ứng dụng: ${result.appName}
Nguồn: ${sourceDescription}
Thời gian thẩm định AI: ${result.analyzedAt}
Kết quả đối soát 13 tiêu chí pháp lý: ${stats.clear}/${stats.total} rõ ràng, ${stats.incomplete}/${stats.total} chưa đầy đủ, ${stats.notMentioned}/${stats.total} không đề cập

5 TRỤ CỘT BẢO MẬT DỮ LIỆU:
1. Dữ liệu thu thập: ${result.fivePoints.collectedData}
2. Mục đích xử lý: ${result.fivePoints.purpose}
3. Chuyển giao bên thứ ba: ${result.fivePoints.thirdPartySharing}
4. Thời hạn lưu trữ: ${result.fivePoints.retentionPeriod}
5. Quyền của chủ thể dữ liệu: ${result.fivePoints.userRights}

CÁC ĐIỂM ĐÁNG LƯU Ý:
${notes.length === 0
        ? 'Không phát hiện điểm đáng lưu ý bất thường nào đối với các tiêu chí trong văn bản này.'
        : notes
          .map(
            (v) =>
              `- [${v.severity}] ${v.title} (${v.tieuChiLienQuan || v.ruleViolated}): ${v.detail} [${v.legalBasis}]`
          )
          .join('\n')
      }

LỘ TRÌNH KHUYẾN NGHỊ:
${result.recommendations.map((r) => `* ${r}`).join('\n')}
-------------------------------------------------------
Kết quả do AI tạo ra, chỉ mang tính tham khảo, không thay thế tư vấn pháp lý.`;

    let copiedSuccess = false;

    // Method 1: Modern navigator.clipboard API
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(summaryText);
        copiedSuccess = true;
      } catch (clipErr) {
        console.warn('navigator.clipboard.writeText không thành công, thử cách dự phòng:', clipErr);
      }
    }

    // Method 2: Fallback textarea + document.execCommand('copy')
    if (!copiedSuccess && typeof document !== 'undefined') {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = summaryText;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = '0';
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const execOk = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (execOk) {
          copiedSuccess = true;
        }
      } catch (execErr) {
        console.warn('document.execCommand dự phòng cũng thất bại:', execErr);
      }
    }

    if (copiedSuccess) {
      setCopiedSummary(true);
      setCopyError(null);
      setManualCopyText(null);
      setTimeout(() => {
        setCopiedSummary(false);
      }, 2000);
    } else {
      setCopiedSummary(false);
      setCopyError('Không thể tự động sao chép, vui lòng chọn và copy văn bản thủ công');
      setManualCopyText(summaryText);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMessage(null);
    setCopyError(null);
    setManualCopyText(null);
  };

  const currentStats = result ? calculateCriteriaStats(result) : null;
  const criteriaList = result ? (result.tieuChiDanhGia || result.goldenRules || []) : [];
  const notesList = result ? (result.diemDangLuuY || result.violations || []) : [];

  return (
    <div className="space-y-8 py-2">
      {/* Top Header / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Quay lại"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Soát Xét Chính Sách Bảo Mật</h1>
              <span className="text-xs text-slate-400 font-medium">· Regulatory Legal Review</span>
            </div>
            <p className="text-xs text-slate-500">
              Đối soát 13 tiêu chí pháp lý chuẩn theo GDPR, Nghị định 13/2023/NĐ-CP và Luật Bảo vệ dữ liệu cá nhân 2025
            </p>
          </div>
        </div>

        {result && (
          <div className="flex items-center gap-2">
            {result.sampleId && (
              <button
                onClick={() => handleReanalyze(result.sampleId!)}
                disabled={isProcessing}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
                title="Xóa cache và gọi lại AI phân tích lại nội dung chính sách này"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>Phân tích lại</span>
              </button>
            )}
            <button
              onClick={handleCopySummary}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1.5 ${copiedSummary
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Đã chép!' : 'Chép kết quả'}</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Soát xét app khác</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Input Form (When no result yet) */}
      {!result && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
            {/* Input Mode Selector */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200 w-fit text-xs font-medium">
              <button
                type="button"
                onClick={() => setInputMode('url')}
                className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${inputMode === 'url' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Đường dẫn URL Website</span>
              </button>
              <button
                type="button"
                onClick={() => setInputMode('text')}
                className={`px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${inputMode === 'text' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Dán văn bản điều khoản</span>
              </button>
            </div>

            {/* URL Input Form */}
            {inputMode === 'url' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Đường dẫn trang Chính sách bảo mật (Privacy Policy URL):
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/privacy-policy"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                    />
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Ví dụ: https://tiktok.com/privacy-policy, https://shopee.vn/docs/privacy
                  </p>
                </div>

                <div className="w-full sm:w-1/2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tên tổ chức / Ứng dụng (Tùy chọn):
                  </label>
                  <input
                    type="text"
                    value={appNameInput}
                    onChange={(e) => setAppNameInput(e.target.value)}
                    placeholder="TikTok, Shopee, Zalo..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-full sm:w-1/2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Tên ứng dụng / Đơn vị ban hành:
                  </label>
                  <input
                    type="text"
                    value={appNameInput}
                    onChange={(e) => setAppNameInput(e.target.value)}
                    placeholder="Ví dụ: App Đèn Pin Siêu Sáng"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nội dung văn bản chính sách bảo mật:
                  </label>
                  <textarea
                    rows={6}
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Dán toàn bộ hoặc các điều khoản cần rà soát tại đây..."
                    className="w-full p-3.5 rounded-lg border border-slate-300 text-slate-900 text-xs font-sans focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>
            )}

            {/* Error Message with direct switch button */}
            {errorMessage && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-rose-800 text-xs flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1.5 flex-1">
                  <div className="font-bold">Lỗi tải nội dung hoặc thẩm định:</div>
                  <div className="leading-relaxed">{errorMessage}</div>
                  {inputMode === 'url' && (
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setInputMode('text');
                          setErrorMessage(null);
                        }}
                        className="inline-flex items-center gap-1 font-semibold text-rose-700 hover:text-rose-900 underline mt-1"
                      >
                        Chuyển sang tab "Dán văn bản điều khoản" ngay →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Processing state */}
            {isProcessing && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
                  <span>Đang xử lý nội dung pháp lý...</span>
                  <span className="font-mono text-slate-500">{processStep}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-slate-900 h-1.5 rounded-full animate-pulse w-4/5" />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="button"
                onClick={handleSummarize}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-xs disabled:opacity-50"
              >
                Tiến hành soát xét văn bản
              </button>
            </div>
          </div>

          {/* Preloaded Policy Samples */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Hồ sơ chính sách mẫu có sẵn (1-Click Review):
              </h4>
              <p className="text-xs text-slate-500">
                Bấm vào mẫu để AI phân tích trực tiếp từ văn bản thật hoặc tải kết quả đã lưu trong bộ nhớ tạm
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PRELOADED_POLICIES.map((sample) => {
                const cached = getSampleCache(sample);
                const sampleStats = cached ? calculateCriteriaStats(cached) : null;
                return (
                  <div
                    key={sample.id}
                    onClick={() => handleLoadSample(sample.id)}
                    className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 bg-white cursor-pointer transition-all space-y-2.5 group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      {sample.isDemoData && (
                        <div className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-300">
                          <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>DỮ LIỆU MINH HỌA - KHÔNG PHẢI CHÍNH SÁCH THẬT</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {sample.name}
                        </span>
                        {sampleStats ? (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                            {sampleStats.clear}/{sampleStats.total} rõ ràng
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                            {sample.policyDate}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {sample.url}
                      </div>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-700 group-hover:underline pt-1 flex items-center justify-between">
                      <span>{cached ? 'Xem kết quả đã lưu →' : 'Gửi AI phân tích →'}</span>
                      <span className="text-[10px] text-slate-400 font-normal">Lấy ngày {sample.policyDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Result Section */}
      {result && currentStats && (
        <div className="space-y-6">
          {/* Demo Data Notice Banner (Only for sample with isDemoData = true) */}
          {result.isDemoData && (
            <div className="rounded-xl bg-amber-50 border-2 border-amber-300 p-4 text-amber-950 flex items-start gap-3 shadow-xs">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-xs uppercase tracking-wide text-amber-900 flex items-center gap-1.5">
                  <span>DỮ LIỆU MINH HỌA - KHÔNG PHẢI CHÍNH SÁCH THẬT</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Văn bản và kết quả soát xét này là dữ liệu mẫu mô phỏng phục vụ mục đích kiểm thử tính năng, không phản ánh chính sách thực tế của tổ chức hay ứng dụng thật.
                </p>
              </div>
            </div>
          )}

          {/* Copy Failure Fallback Panel */}
          {copyError && manualCopyText && (
            <div className="rounded-xl bg-amber-50 border border-amber-300 p-4 space-y-2 text-xs shadow-xs">
              <div className="flex items-center justify-between text-amber-900 font-semibold">
                <span className="flex items-center gap-1.5 text-rose-700 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  {copyError}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setCopyError(null);
                    setManualCopyText(null);
                  }}
                  className="text-slate-400 hover:text-slate-700 text-xs flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Đóng</span>
                </button>
              </div>
              <p className="text-slate-600 text-[11px]">
                Nhấp chuột vào ô bên dưới, bôi đen toàn bộ (Ctrl+A / Cmd+A) và bấm Ctrl+C / Cmd+C để sao chép:
              </p>
              <pre className="select-all p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] max-h-48 overflow-y-auto whitespace-pre-wrap break-words border border-slate-800">
                {manualCopyText}
              </pre>
            </div>
          )}

          {/* Header Banner & 3-Segment Distribution Bar (Replaces Risk Score) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-semibold text-slate-500">
                  Hồ Sơ Soát Xét Điều Khoản
                </span>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {result.appName}
                </h2>

                {/* Explicit Source URL & Date retrieved */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Nguồn:</span>
                  {result.sourceUrl ? (
                    <a
                      href={result.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium font-mono text-indigo-600 hover:text-indigo-800 hover:underline bg-indigo-50/70 px-2 py-0.5 rounded border border-indigo-100 max-w-full"
                      title="Mở liên kết nguồn chính sách gốc trong tab mới"
                    >
                      <span className="truncate max-w-[240px] sm:max-w-md">{result.sourceUrl}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  ) : (
                    <span className="text-slate-700 font-medium">Văn bản dán trực tiếp</span>
                  )}
                  <span className="text-slate-400">·</span>
                  <span>
                    lấy ngày <strong>{result.policyDate || getTodayFormatted()}</strong>
                  </span>
                  <span className="text-slate-400">·</span>
                  <span>Độ dài: {result.charCount} ký tự</span>
                </div>

                {/* Cache note & Re-analyze action */}
                {result.cachedAt && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span>
                        Phân tích bởi AI ngày <strong>{result.cachedAt}</strong>, dựa trên bản chính sách lấy ngày <strong>{result.policyDate || getTodayFormatted()}</strong>
                      </span>
                    </span>
                    {result.sampleId && (
                      <button
                        type="button"
                        onClick={() => handleReanalyze(result.sampleId!)}
                        disabled={isProcessing}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 bg-white hover:bg-indigo-50 px-2 py-1 rounded border border-slate-300 transition-colors shadow-2xs disabled:opacity-50"
                        title="Xóa cache và gọi lại AI phân tích lại nội dung"
                      >
                        <RefreshCw className={`w-3 h-3 ${isProcessing ? 'animate-spin' : ''}`} />
                        <span>Phân tích lại</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* 3-Part Proportional Distribution Card (Calculated purely by JS code) */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 min-w-[280px] sm:min-w-[340px] space-y-2.5 self-start lg:self-center">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Đối Soát 13 Tiêu Chí:</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {currentStats.clear}/{currentStats.total} rõ ràng
                  </span>
                </div>

                {/* 3-segment horizontal progress bar */}
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                  {currentStats.clear > 0 && (
                    <div
                      style={{ width: `${currentStats.clearPercent}%` }}
                      className="bg-emerald-500 h-full transition-all duration-500"
                      title={`Rõ ràng: ${currentStats.clear}/${currentStats.total} (${Math.round(currentStats.clearPercent)}%)`}
                    />
                  )}
                  {currentStats.incomplete > 0 && (
                    <div
                      style={{ width: `${currentStats.incompletePercent}%` }}
                      className="bg-amber-400 h-full transition-all duration-500"
                      title={`Chưa đầy đủ: ${currentStats.incomplete}/${currentStats.total} (${Math.round(currentStats.incompletePercent)}%)`}
                    />
                  )}
                  {currentStats.notMentioned > 0 && (
                    <div
                      style={{ width: `${currentStats.notMentionedPercent}%` }}
                      className="bg-slate-400 h-full transition-all duration-500"
                      title={`Không đề cập: ${currentStats.notMentioned}/${currentStats.total} (${Math.round(currentStats.notMentionedPercent)}%)`}
                    />
                  )}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span><strong>{currentStats.clear}</strong> Rõ ràng</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                    <span><strong>{currentStats.incomplete}</strong> Chưa đầy đủ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                    <span><strong>{currentStats.notMentioned}</strong> Không đề cập</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 border-t border-slate-200/80 pt-1.5 text-center font-medium">
                  {currentStats.clear}/{currentStats.total} tiêu chí rõ ràng · {currentStats.incomplete} chưa đầy đủ · {currentStats.notMentioned} không đề cập
                </div>
              </div>
            </div>

            {/* 5 Core Pillars Structured View */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                5 Trụ Cột Quản Trị Dữ Liệu Cốt Lõi:
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                    <span className="font-mono text-indigo-600 font-bold">1.</span>
                    <span>Phạm vi dữ liệu cá nhân thu thập:</span>
                  </div>
                  <p className="text-xs text-slate-700 pl-5 pt-1 leading-relaxed">
                    {result.fivePoints.collectedData}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                    <span className="font-mono text-indigo-600 font-bold">2.</span>
                    <span>Cơ sở & Mục đích xử lý:</span>
                  </div>
                  <p className="text-xs text-slate-700 pl-5 pt-1 leading-relaxed">
                    {result.fivePoints.purpose}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                    <span className="font-mono text-indigo-600 font-bold">3.</span>
                    <span>Chuyển giao cho đối tác bên thứ ba:</span>
                  </div>
                  <p className="text-xs text-slate-700 pl-5 pt-1 leading-relaxed">
                    {result.fivePoints.thirdPartySharing}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                    <span className="font-mono text-indigo-600 font-bold">4.</span>
                    <span>Thời hạn lưu trữ & Tiêu hủy dữ liệu:</span>
                  </div>
                  <p className="text-xs text-slate-700 pl-5 pt-1 leading-relaxed">
                    {result.fivePoints.retentionPeriod}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                    <span className="font-mono text-indigo-600 font-bold">5.</span>
                    <span>Quyền và kênh khiếu nại của người dùng:</span>
                  </div>
                  <p className="text-xs text-slate-700 pl-5 pt-1 leading-relaxed">
                    {result.fivePoints.userRights}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Checklist 13 Tiêu Chí Pháp Lý (GDPR & Luật BV DLCN 2025) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Đối Soát 13 Tiêu Chí Pháp Lý (GDPR, NĐ 13 & Luật 2025)
                </h3>
                <p className="text-xs text-slate-500">
                  Kiểm tra tính minh bạch và sự đầy đủ của điều khoản theo từng tiêu chuẩn bảo vệ dữ liệu cá nhân
                </p>
              </div>
              <div className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg shrink-0">
                {currentStats.clear}/{currentStats.total} tiêu chí rõ ràng
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {criteriaList.map((tc, index) => {
                const isClear = tc.muc === 'ro_rang' || (tc as any).status === 'CLEAR';
                const isIncomplete = tc.muc === 'chua_day_du' || (tc as any).status === 'INCOMPLETE';
                const ruleNumber = tc.id || (tc as any).ruleNumber || index + 1;
                const title = tc.ten || (tc as any).title || `Tiêu chí ${ruleNumber}`;
                const desc = tc.moTa || (tc as any).criterion || '';
                const quote = tc.trichDan || (tc as any).detail || 'Không đề cập';
                const legal = tc.canCuPhapLy || (tc as any).legalReference || 'GDPR & NĐ 13/2023';

                return (
                  <div
                    key={ruleNumber}
                    className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs text-slate-900 leading-snug">
                          {ruleNumber}. {title}
                        </span>
                        {isClear ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded text-[11px] shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Rõ ràng
                          </span>
                        ) : isIncomplete ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded text-[11px] shrink-0">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Chưa đầy đủ
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px] shrink-0">
                            <HelpCircle className="w-3.5 h-3.5 text-slate-500" /> Không đề cập
                          </span>
                        )}
                      </div>

                      {desc && (
                        <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
                      )}

                      <div className="text-[11px] text-slate-700 bg-slate-50 rounded-lg p-2.5 border border-slate-100 leading-relaxed">
                        <strong className="text-slate-900">Trích dẫn chứng cứ:</strong>{' '}
                        <span className="italic">{quote}</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 font-mono pt-1.5 border-t border-slate-100">
                      Căn cứ: {legal}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Các Điểm Đáng Lưu Ý (diemDangLuuY) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Các Điểm Đáng Lưu Ý ({notesList.length} điểm ghi nhận):
            </h3>

            {notesList.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Không phát hiện điểm đáng lưu ý bất thường nào đối với các tiêu chí chuẩn trong văn bản này.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {notesList.map((v, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>{v.title}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded self-start sm:self-auto ${v.severity === 'HIGH'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                      >
                        Mức độ: {v.severity}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600">
                      <strong>Tiêu chí liên quan:</strong> {v.tieuChiLienQuan || v.ruleViolated}
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong>Chi tiết nội dung:</strong> {v.detail}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Căn cứ tham chiếu: {v.legalBasis}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Khuyến Nghị Hoàn Thiện */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Khuyến Nghị Sửa Đổi Dành Cho Đội Ngũ Pháp Chế & DPO:
            </h3>

            <div className="space-y-2">
              {result.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-800"
                >
                  <span className="font-mono font-bold text-indigo-600">{i + 1}.</span>
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 italic">
              * Kết quả do AI tạo ra, chỉ mang tính tham khảo, không thay thế tư vấn pháp lý.
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Soát xét văn bản khác</span>
              </button>

              {result.sampleId && (
                <button
                  onClick={() => handleReanalyze(result.sampleId!)}
                  disabled={isProcessing}
                  className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  title="Xóa cache và gọi lại AI phân tích lại nội dung chính sách này"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isProcessing ? 'animate-spin' : ''}`} />
                  <span>Phân tích lại</span>
                </button>
              )}

              <button
                onClick={handleCopySummary}
                className={`px-4 py-2 rounded-lg border font-semibold text-xs transition-colors flex items-center gap-1.5 ${copiedSummary
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSummary ? 'Đã chép!' : 'Xuất văn bản tóm lược'}</span>
              </button>
            </div>

            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Về trang tổng quan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

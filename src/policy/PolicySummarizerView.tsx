import React, { useState } from 'react';
import {
  FileText,
  Globe,
  ArrowLeft,
  RotateCcw,
  Copy,
  Check,
  AlertTriangle,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Edit3,
  Scale,
  Printer
} from 'lucide-react';
import { PolicySummaryResult } from '../types';
import { PRELOADED_POLICIES } from './preloadedPolicies';

interface PolicySummarizerViewProps {
  onBackToHome: () => void;
  initialResult?: PolicySummaryResult | null;
  onOpenCertificate?: () => void;
}

export const PolicySummarizerView: React.FC<PolicySummarizerViewProps> = ({
  onBackToHome,
  initialResult = null,
  onOpenCertificate,
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

  // Quick load preloaded sample
  const handleLoadSample = (sampleId: string) => {
    const item = PRELOADED_POLICIES.find((p) => p.id === sampleId);
    if (!item) return;
    setErrorMessage(null);
    setIsProcessing(true);
    setProcessStep('Đang chuẩn bị hồ sơ soát xét ' + item.name + '...');
    setUrlInput(item.url);
    setTextInput(item.rawText);
    setAppNameInput(item.analyzedResult.appName);

    setTimeout(() => {
      setResult(item.analyzedResult);
      setIsProcessing(false);
      setProcessStep('');
    }, 350);
  };

  // Perform Policy Review
  const handleSummarize = async () => {
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      let contentToAnalyze = textInput;
      let targetUrl = urlInput.trim();
      let targetAppName = appNameInput.trim();

      if (inputMode === 'url') {
        if (!targetUrl || !targetUrl.startsWith('http')) {
          throw new Error('Vui lòng nhập URL hợp lệ bắt đầu bằng http:// hoặc https://');
        }

        const matchingSample = PRELOADED_POLICIES.find(
          (p) => p.url.toLowerCase() === targetUrl.toLowerCase()
        );
        if (matchingSample) {
          setProcessStep('Đang tải nội dung văn bản pháp lý...');
          await new Promise((r) => setTimeout(r, 350));
          setProcessStep('Đang đối soát 5 trụ cột và 5 quy tắc vàng...');
          await new Promise((r) => setTimeout(r, 350));
          setResult(matchingSample.analyzedResult);
          setIsProcessing(false);
          setProcessStep('');
          return;
        }

        setProcessStep('Đang kết nối và tải nội dung từ trang web...');
        const crawlRes = await fetch('/api/crawl', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: targetUrl }),
        });

        if (!crawlRes.ok) {
          const errData = await crawlRes.json().catch(() => ({}));
          throw new Error(errData.error || `Không thể tải trang web (HTTP ${crawlRes.status})`);
        }

        const crawlData = await crawlRes.json();
        contentToAnalyze = crawlData.text;
        if (!targetAppName) {
          targetAppName = crawlData.title || 'Ứng dụng';
        }
      } else {
        if (!contentToAnalyze || contentToAnalyze.trim().length < 40) {
          throw new Error('Vui lòng nhập hoặc dán nội dung chính sách bảo mật ít nhất 40 ký tự!');
        }
      }

      setProcessStep('Hệ thống pháp lý đang phân tích và đối chiếu 5 trụ cột tuân thủ...');

      const summarizeRes = await fetch('/api/summarize-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: contentToAnalyze,
          url: inputMode === 'url' ? targetUrl : undefined,
          appName: targetAppName || 'Ứng dụng di động',
        }),
      });

      if (!summarizeRes.ok) {
        const errData = await summarizeRes.json().catch(() => ({}));
        throw new Error(errData.error || 'Lỗi khi soát xét chính sách bảo mật');
      }

      const summarizeData = await summarizeRes.json();
      setResult(summarizeData.data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
      setProcessStep('');
    }
  };

  const handleCopySummary = () => {
    if (!result) return;
    const summaryText = `--- BÁO CÁO SOÁT XÉT CHÍNH SÁCH BẢO MẬT (PRIVACY POLICY AUDIT) ---
Đơn vị / Ứng dụng: ${result.appName}
Nguồn văn bản: ${result.sourceUrl || 'Văn bản trực tiếp'}
Thời gian thẩm định: ${result.analyzedAt}
Risk Score: ${result.riskScore}/100 [${result.riskRating} - ${result.ratingLabel}]

5 TRỤ CỘT BẢO MẬT DỮ LIỆU:
1. Dữ liệu thu thập: ${result.fivePoints.collectedData}
2. Mục đích xử lý: ${result.fivePoints.purpose}
3. Chuyển giao bên thứ ba: ${result.fivePoints.thirdPartySharing}
4. Thời hạn lưu trữ: ${result.fivePoints.retentionPeriod}
5. Quyền của chủ thể dữ liệu: ${result.fivePoints.userRights}

CẢNH BÁO RỦI RO PHÁP LÝ:
${result.violations.length === 0
        ? 'Không phát hiện vi phạm pháp lý nghiêm trọng đối với 5 quy tắc vàng.'
        : result.violations
          .map(
            (v) =>
              `- [${v.severity}] ${v.title} (${v.ruleViolated}): ${v.detail} [${v.legalBasis}]`
          )
          .join('\n')
      }

LỘ TRÌNH KHUYẾN NGHỊ TUÂN THỦ:
${result.recommendations.map((r) => `* ${r}`).join('\n')}
-------------------------------------------------------
Xác thực bởi Privacy Compass Enterprise`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handleReset = () => {
    setResult(null);
    setErrorMessage(null);
  };

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
              Thẩm định 5 trụ cột và phát hiện điều khoản rủi ro pháp lý theo GDPR và Luật Bảo vệ dữ liệu cá nhân 2025
            </p>
          </div>
        </div>

        {result && (
          <div className="flex items-center gap-2">
            {onOpenCertificate && (
              <button
                onClick={onOpenCertificate}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Scale className="w-3.5 h-3.5 text-indigo-600" />
                <span>Xem chứng thư</span>
              </button>
            )}
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
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

            {/* Error Message */}
            {errorMessage && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-rose-800 text-xs flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Lỗi thẩm định văn bản:</div>
                  <div className="mt-0.5 leading-relaxed">{errorMessage}</div>
                </div>
              </div>
            )}

            {/* Processing state */}
            {isProcessing && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
                  <span>Đang thẩm định nội dung pháp lý...</span>
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
                Các kịch bản thực tế từ tuân thủ chuẩn mực đến vi phạm nghiêm trọng
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PRELOADED_POLICIES.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => handleLoadSample(sample.id)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 bg-white cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {sample.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${sample.analyzedResult.riskRating === 'HIGH'
                          ? 'bg-rose-50 text-rose-700'
                          : sample.analyzedResult.riskRating === 'MEDIUM'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}
                    >
                      {sample.analyzedResult.riskScore}/100
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {sample.url}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700 group-hover:underline">
                    Xem kết quả soát xét →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Result Section (Commercial Policy Review View) */}
      {result && (
        <div className="space-y-6">
          {/* Header Banner & Risk Score */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-500">
                  Hồ Sơ Soát Xét Điều Khoản
                </span>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {result.appName}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  {result.sourceUrl ? (
                    <a
                      href={result.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 hover:text-slate-900 hover:underline flex items-center gap-1 font-medium font-mono"
                    >
                      <span>{result.sourceUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span>Nguồn: Văn bản dán trực tiếp</span>
                  )}
                  <span>·</span>
                  <span>Độ dài: {result.charCount} ký tự</span>
                  <span>·</span>
                  <span>Thời gian: {result.analyzedAt}</span>
                </div>
              </div>

              {/* Risk Score Box */}
              <div className="flex items-center gap-4 self-start lg:self-center">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 min-w-[190px] text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Điểm Đánh Giá Rủi Ro (Risk Score)
                  </span>
                  <div className="text-3xl font-black text-slate-900 my-0.5 tabular-nums">
                    {result.riskScore}
                    <span className="text-sm font-normal text-slate-400"> / 100</span>
                  </div>
                  <div
                    className={`text-[11px] font-bold mt-1 ${result.riskRating === 'HIGH'
                        ? 'text-rose-700'
                        : result.riskRating === 'MEDIUM'
                          ? 'text-amber-700'
                          : 'text-emerald-700'
                      }`}
                  >
                    {result.ratingLabel}
                  </div>
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

          {/* Checklist 5 Quy Tắc Vàng */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Đối Soát Tuân Thủ 5 Quy Tắc Vàng (GDPR & Luật 2025)
              </h3>
              <p className="text-xs text-slate-500">
                Kiểm tra tính tương thích của điều khoản với các nguyên tắc bảo vệ quyền riêng tư bắt buộc
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {result.goldenRules.map((rule) => (
                <div
                  key={rule.ruleNumber}
                  className="p-4 rounded-xl border border-slate-200 bg-white space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">
                      {rule.ruleNumber}. {rule.title}
                    </span>
                    {rule.passed ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đạt
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                        <XCircle className="w-3.5 h-3.5" /> Vi phạm
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600">{rule.criterion}</p>
                  <div className="text-[11px] text-slate-700 bg-slate-50 rounded-lg p-2.5 border border-slate-100 leading-relaxed">
                    <strong>Đánh giá:</strong> {rule.detail}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Căn cứ: {rule.legalReference}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cảnh Báo Vi Phạm Pháp Lý */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Cảnh Báo Rủi Ro & Lỗ Hổng Điều Khoản ({result.violations.length} điểm cần xử lý):
            </h3>

            {result.violations.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Không phát hiện điều khoản vi phạm pháp lý nghiêm trọng nào đối với chính sách này.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {result.violations.map((v, i) => (
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
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-amber-50 text-amber-800'
                          }`}
                      >
                        Mức độ: {v.severity}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600">
                      <strong>Vi phạm nguyên tắc:</strong> {v.ruleViolated}
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong>Chi tiết pháp lý:</strong> {v.detail}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Căn cứ điều luật: {v.legalBasis}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Legal Advisory Roadmap */}
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

              <button
                onClick={handleCopySummary}
                className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Xuất văn bản tóm lược</span>
              </button>

              {onOpenCertificate && (
                <button
                  onClick={onOpenCertificate}
                  className="px-4 py-2 rounded-lg border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>In chứng thư kiểm toán</span>
                </button>
              )}
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

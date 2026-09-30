import React, { useState, useRef, useMemo } from 'react';
import {
  Upload,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  RotateCcw,
  ShieldAlert,
  Copy,
  Check,
  Search,
  FileCheck2,
  Printer
} from 'lucide-react';
import { ApkScanResult, AppCategory } from '../types';
import { CATEGORIES_INFO } from './permissionRef';
import { SAMPLE_APKS } from './sampleApks';
import { parseApkFile, evaluatePermissions } from './apkAnalyzer';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface ApkScannerViewProps {
  onBackToHome: () => void;
  initialScanResult?: ApkScanResult | null;
  onOpenCertificate?: () => void;
  /** Fix #1: Callback so App.tsx can sync the latest scan result (or null on reset) */
  onScanComplete?: (result: ApkScanResult | null) => void;
}

export const ApkScannerView: React.FC<ApkScannerViewProps> = ({
  onBackToHome,
  initialScanResult = null,
  onOpenCertificate,
  onScanComplete,
}) => {
  // Fix #1: sync selectedCategory với initialScanResult.appCategory thay vì luôn mặc định 'flashlight'
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>(
    initialScanResult?.appCategory ?? 'flashlight'
  );
  const [scanResult, setScanResult] = useState<ApkScanResult | null>(initialScanResult);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  // Fix #9: progress tracking thực tế thay vì animate-pulse cố định
  const [scanProgress, setScanProgress] = useState(0);

  // Table search & filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'dangerous' | 'violations'>('all');

  // Fix #7: Sort state for permissions table
  const [sortField, setSortField] = useState<'shortName' | 'riskLevel' | 'status' | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: 'shortName' | 'riskLevel' | 'status') => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger file scan — với progress tracking động
  const handleFileProcess = async (file: File) => {
    setErrorMessage(null);
    setIsScanning(true);
    setScanProgress(10);
    setScanStep('Đang giải nén cấu trúc tệp tin APK...');

    try {
      await new Promise((r) => setTimeout(r, 400));
      setScanProgress(30);
      setScanStep('Đang trích xuất AndroidManifest.xml...');

      await new Promise((r) => setTimeout(r, 400));
      setScanProgress(55);
      setScanStep('Đang đối soát quyền với danh mục ' + CATEGORIES_INFO[selectedCategory].nameVi + '...');

      const result = await parseApkFile(file, selectedCategory);

      await new Promise((r) => setTimeout(r, 300));
      setScanProgress(85);
      setScanStep('Đang tính toán chỉ số tuân thủ dữ liệu...');

      await new Promise((r) => setTimeout(r, 200));
      setScanProgress(100);
      setScanResult(result);
      onScanComplete?.(result); // Fix #1: sync lên App.tsx
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setIsScanning(false);
      setScanStep('');
      setScanProgress(0);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  // Fix #3: Dùng thẳng sample data, không re-evaluate → giữ nguyên text giải thích đã viết tay
  // Fix #4: Reset search/filter khi load sample mới để tránh bảng hiển thị trống
  const handleLoadSample = (sample: ApkScanResult) => {
    setErrorMessage(null);
    setIsScanning(true);
    setSelectedCategory(sample.appCategory);
    setSearchQuery('');
    setFilterMode('all');
    setScanProgress(10); // Bắt đầu từ 10% rồi smooth lên 100%
    setScanStep('Đang nạp hồ sơ kiểm toán mẫu...');

    setTimeout(() => {
      setScanProgress(100);
      setScanResult(sample);
      onScanComplete?.(sample); // Fix #1: sync lên App.tsx
      setIsScanning(false);
      setScanStep('');
      setScanProgress(0);
    }, 350);
  };

  const handleReevaluateCategory = (newCategory: AppCategory) => {
    setSelectedCategory(newCategory);
    if (scanResult) {
      const updated = evaluatePermissions(
        scanResult.permissions.map((p) => p.name),
        newCategory,
        scanResult.appName,
        scanResult.packageName,
        scanResult.version,
        scanResult.fileSizeMb
      );
      setScanResult(updated);
      // Fix: Sync lên App.tsx để AuditCertificateModal hiện đúng danh mục mới
      onScanComplete?.(updated);
    }
  };

  // Fix #10: Bổ sung violationsSummary chi tiết vào nội dung clipboard để đủ thông tin nộp hồ sơ
  const handleCopyReport = () => {
    if (!scanResult) return;
    const reportText = `--- BÁO CÁO KIỂM TOÁN QUYỀN ỨNG DỤNG (APK COMPLIANCE REPORT) ---
Ứng dụng: ${scanResult.appName} (${scanResult.packageName} v${scanResult.version})
Danh mục: ${scanResult.categoryNameVi}
Thời gian kiểm toán: ${scanResult.scanTime}
Compliance Index: ${scanResult.complianceScore}/100 [${scanResult.complianceRating} - ${scanResult.ratingLabel}]
Tổng quyền yêu cầu: ${scanResult.totalPermissions}
Quyền nhạy cảm (Dangerous): ${scanResult.dangerousCount}
Số vi phạm phát hiện: ${scanResult.violationCount}

KẾT QUẢ ĐỐI SOÁT QUYỀN:
${scanResult.permissions
        .map(
          (p) =>
            `- [${p.status === 'valid' ? 'HỢP LÝ' : 'VI PHẠM'}] ${p.name}: ${p.categoryExplanation}`
        )
        .join('\n')}

VI PHẠM PHÁP LÝ PHÁT HIỆN (${scanResult.violationCount} vi phạm):
${scanResult.violationsSummary.length > 0
        ? scanResult.violationsSummary.map((v) => `⚠ ${v}`).join('\n')
        : '✓ Không phát hiện vi phạm pháp lý nào trong phiên kiểm toán này.'}

KHUYẾN NGHỊ KHẮC PHỤC (REMEDIATION ROADMAP):
${scanResult.recommendations.map((r) => `* ${r}`).join('\n')}
-------------------------------------------------------
Xác thực bởi Privacy Compass Enterprise`;

    navigator.clipboard.writeText(reportText).catch(() => {
      // Fix #5: Fallback cho môi trường HTTP hoặc trình duyệt chặn Clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = reportText;
      textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    });
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handleReset = () => {
    setScanResult(null);
    setErrorMessage(null);
    setSearchQuery('');
    setFilterMode('all');
    setSortField(null);  // Fix #7: reset sort khi quét file mới
    setSortDir('asc');
    onScanComplete?.(null); // Fix #1: báo App.tsx xóa activeApkResult
    // Intentional: keep selectedCategory so user can re-scan next file in same category
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Fix #6: Badge counts for filter tabs — stable counts unaffected by search query
  const filterCounts = useMemo(() => {
    if (!scanResult) return { all: 0, dangerous: 0, violations: 0 };
    return {
      all: scanResult.totalPermissions,
      dangerous: scanResult.permissions.filter((p) => p.isDangerous).length,
      violations: scanResult.violationCount,
    };
  }, [scanResult]);

  // Filtered permissions list
  const filteredPermissions = useMemo(() => {
    if (!scanResult) return [];
    return scanResult.permissions.filter((p) => {
      // Filter tab
      if (filterMode === 'dangerous' && !p.isDangerous) return false;
      if (filterMode === 'violations' && p.status !== 'violation') return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query) || p.shortName.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query) || p.categoryExplanation.toLowerCase().includes(query);
        return matchesName || matchesDesc;
      }
      return true;
    });
  }, [scanResult, filterMode, searchQuery]);

  // Fix #7: Sorted permissions (applied after filter+search)
  const sortedPermissions = useMemo(() => {
    if (!sortField) return filteredPermissions;
    const riskOrder: Record<string, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 };
    return [...filteredPermissions].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'riskLevel') {
        cmp = riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
      } else if (sortField === 'status') {
        // violations first khi ascending
        cmp = a.status === b.status ? 0 : a.status === 'violation' ? -1 : 1;
      } else {
        cmp = a.shortName.localeCompare(b.shortName);
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filteredPermissions, sortField, sortDir]);

  // Chart data — fill gắn với data object, không phụ thuộc Cell index
  // Fix Chart 1 bug: khi valid=0, data=[Vi phạm] → Cell[0]=xanh(cũ) áp sai → nay fill đi theo data
  const chart1Data = useMemo(() => {
    if (!scanResult) return [] as { name: string; value: number; fill: string; stroke: string }[];
    return [
      { name: 'Hợp lệ', value: scanResult.totalPermissions - scanResult.violationCount, fill: '#10b981', stroke: '#d1fae5' },
      { name: 'Vi phạm', value: scanResult.violationCount, fill: '#f43f5e', stroke: '#ffe4e6' },
    ].filter((d) => d.value > 0);
  }, [scanResult]);

  // Chart 2 data — trước tính 2 lần giống nhau trong JSX, nay extracted ra memo dùng chung
  const riskChartData = useMemo(() => {
    if (!scanResult) return [] as { name: string; value: number; fill: string; stroke: string }[];
    return [
      { name: 'Thấp (LOW)', value: scanResult.permissions.filter((p) => p.riskLevel === 'LOW').length, fill: '#64748b', stroke: '#f1f5f9' },
      { name: 'Trung bình (MEDIUM)', value: scanResult.permissions.filter((p) => p.riskLevel === 'MEDIUM').length, fill: '#f59e0b', stroke: '#fef3c7' },
      { name: 'Cao (HIGH)', value: scanResult.permissions.filter((p) => p.riskLevel === 'HIGH').length, fill: '#f43f5e', stroke: '#ffe4e6' },
    ].filter((d) => d.value > 0);
  }, [scanResult]);

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
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Kiểm Toán Quyền Ứng Dụng (APK Audit)</h1>
              <span className="text-xs text-slate-400 font-medium">· Data Minimization Engine</span>
            </div>
            <p className="text-xs text-slate-500">
              Đối soát quyền ứng dụng theo nguyên tắc tối thiểu hóa dữ liệu (GDPR Điều 5 & Luật BV Dữ Liệu Cá Nhân 2025)
            </p>
          </div>
        </div>

        {scanResult && (
          <div className="flex items-center gap-2">
            {onOpenCertificate && (
              <button
                onClick={onOpenCertificate}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Xem chứng thư</span>
              </button>
            )}
            <button
              onClick={handleCopyReport}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedReport ? 'Đã chép!' : 'Chép báo cáo'}</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Quét tệp khác</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Upload / Selection Card (When no result yet) */}
      {!scanResult && (
        <div className="space-y-6">
          {/* Category Benchmark Selector */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="text-sm font-bold text-slate-900 block">
                  Danh mục ứng dụng đối chiếu (App Benchmark Category):
                </label>
                <p className="text-xs text-slate-500">
                  Chọn phân loại để áp dụng danh mục quyền hợp lệ theo thông lệ kỹ thuật quốc tế
                </p>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as AppCategory)}
                disabled={isScanning}
                className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              >
                {Object.values(CATEGORIES_INFO).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nameVi}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-xs text-slate-600 pt-2 border-t border-slate-100 flex items-start gap-2">
              <span className="font-semibold text-slate-700">Quy tắc chuẩn:</span>
              <span>{CATEGORIES_INFO[selectedCategory].description}.</span>
            </div>
          </div>

          {/* Clean Commercial Upload Dropzone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`rounded-2xl border-2 border-dashed p-10 sm:p-14 text-center transition-all bg-white ${dragOver ? 'border-slate-900 bg-slate-50/80' : 'border-slate-300 hover:border-slate-400'
              }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileInputChange}
              accept=".apk,.xml"
              className="hidden"
            />

            <div className="max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 mx-auto flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">Tải lên tệp tin APK để kiểm toán</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Hỗ trợ định dạng <strong>.apk</strong> hoặc <strong>AndroidManifest.xml</strong> (Dung lượng tối đa 50MB)
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isScanning}
                  className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  Chọn tệp tin từ máy
                </button>
              </div>

              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                Quyền riêng tư: Tệp tin được giải mã hoàn toàn trong bộ nhớ tạm thời và tự động xóa sau phiên làm việc.
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-rose-800 text-xs flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Lỗi xử lý tệp tin:</div>
                <div className="mt-0.5 leading-relaxed">{errorMessage}</div>
              </div>
            </div>
          )}

          {/* Scanning Progress */}
          {isScanning && (
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-700">
                <span className="font-semibold">Đang tiến hành kiểm toán tệp tin...</span>
                <span className="font-mono text-slate-500">{scanStep}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-slate-900 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Preloaded Audit Test Samples */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Hồ sơ kiểm toán mẫu có sẵn (1-Click Audit Test):
              </h4>
              <p className="text-xs text-slate-500">
                Dữ liệu kiểm tra thực tế từ các ứng dụng điển hình trên thị trường
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {SAMPLE_APKS.map((sample) => (
                <div
                  key={sample.packageName}
                  onClick={() => !isScanning && handleLoadSample(sample)}
                  className={`p-4 rounded-xl border bg-white transition-all space-y-2 group ${
                    isScanning
                      ? 'border-slate-100 opacity-40 cursor-not-allowed'
                      : 'border-slate-200 hover:border-slate-400 cursor-pointer'
                  }`}
                  title={isScanning ? 'Đang quét file, vui lòng chờ...' : undefined}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {sample.appName}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${sample.complianceRating === 'RED'
                        ? 'bg-rose-50 text-rose-700'
                        : sample.complianceRating === 'YELLOW'
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-emerald-50 text-emerald-700'
                        }`}
                    >
                      {sample.complianceScore}/100
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {sample.categoryNameVi} · {sample.totalPermissions} quyền ({sample.violationCount} vi phạm)
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700 group-hover:underline">
                    Xem báo cáo mẫu →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Result Section (Commercial Audit View) */}
      {scanResult && (
        <div className="space-y-6">
          {/* Executive Scorecard */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-slate-700">
                    {scanResult.packageName}
                  </span>
                  <span className="text-xs text-slate-400">· v{scanResult.version}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {scanResult.appName}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>Dung lượng: <strong>{scanResult.fileSizeMb} MB</strong></span>
                  <span>·</span>
                  <span>Thời gian quét: <strong>{scanResult.scanTime}</strong></span>
                  <span>·</span>
                  <div className="flex items-center gap-1.5">
                    <span>Danh mục:</span>
                    <select
                      value={scanResult.appCategory}
                      onChange={(e) => handleReevaluateCategory(e.target.value as AppCategory)}
                      className="px-2 py-0.5 rounded border border-slate-300 bg-white font-medium text-slate-800 text-xs"
                    >
                      {Object.values(CATEGORIES_INFO).map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nameVi}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Compliance Score Box */}
              <div className="flex items-center gap-4 self-start lg:self-center">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 min-w-[190px] text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Chỉ Số Tuân Thủ (Compliance Index)
                  </span>
                  <div className="text-3xl font-black text-slate-900 my-0.5 tabular-nums">
                    {scanResult.complianceScore}
                    <span className="text-sm font-normal text-slate-400"> / 100</span>
                  </div>
                  <div
                    className={`text-[11px] font-bold mt-1 ${scanResult.complianceRating === 'RED'
                      ? 'text-rose-700'
                      : scanResult.complianceRating === 'YELLOW'
                        ? 'text-amber-700'
                        : 'text-emerald-700'
                      }`}
                  >
                    {scanResult.ratingLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500">Tổng quyền khai báo</div>
                <div className="text-lg font-bold text-slate-900 mt-0.5 tabular-nums">
                  {scanResult.totalPermissions}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500">Quyền hệ thống thông thường</div>
                <div className="text-lg font-bold text-slate-700 mt-0.5 tabular-nums">
                  {scanResult.totalPermissions - scanResult.dangerousCount}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500">Quyền nhạy cảm (Dangerous)</div>
                <div className="text-lg font-bold text-amber-700 mt-0.5 tabular-nums">
                  {scanResult.dangerousCount}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[11px] text-slate-500">Vi phạm tối thiểu hóa dữ liệu</div>
                <div className={`text-lg font-bold mt-0.5 tabular-nums ${scanResult.violationCount > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {scanResult.violationCount}
                </div>
              </div>
            </div>

            {/* Fix #7: Permission Distribution Charts — dùng Recharts đã cài sẵn */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              {/* Donut chart 1: Hợp lệ vs Vi phạm */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Phân bố kết quả đánh giá</h4>
                <div className="h-44">
                  {scanResult.totalPermissions === 0 ? (
                    <div className="h-full flex items-center justify-center text-xs text-slate-400 italic">
                      Không có dữ liệu quyền để hiển thị
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chart1Data}
                          cx="50%"
                          cy="50%"
                          innerRadius={42}
                          outerRadius={68}
                          dataKey="value"
                          strokeWidth={2}
                        >
                          {chart1Data.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} stroke={entry.stroke} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [`${value ?? 0} quyền`, name ?? '']}
                          contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    Hợp lệ ({scanResult.totalPermissions - scanResult.violationCount})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    Vi phạm ({scanResult.violationCount})
                  </span>
                </div>
              </div>

              {/* Donut chart 2: Phân loại mức độ rủi ro */}
              {/* Fill được gán vào từng data object để tránh sai màu khi filter loại bỏ một mức rủi ro */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Phân loại mức độ rủi ro</h4>
                <div className="h-44">
                  {scanResult.totalPermissions === 0 ? (
                    <div className="h-full flex items-center justify-center text-xs text-slate-400 italic">
                      Không có dữ liệu quyền để hiển thị
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={42}
                          outerRadius={68}
                          dataKey="value"
                          strokeWidth={2}
                        >
                          {riskChartData.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} stroke={entry.stroke} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name) => [`${value ?? 0} quyền`, name ?? '']}
                          contentStyle={{ fontSize: '11px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block" />LOW ({scanResult.permissions.filter((p) => p.riskLevel === 'LOW').length})</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />MEDIUM ({scanResult.permissions.filter((p) => p.riskLevel === 'MEDIUM').length})</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />HIGH ({scanResult.permissions.filter((p) => p.riskLevel === 'HIGH').length})</span>
                </div>
              </div>
            </div>

            {/* Violations Summary Box */}
            {scanResult.violationsSummary.length > 0 && (
              <div className="rounded-xl bg-rose-50/60 border border-rose-200 p-4 space-y-1.5">
                <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Cảnh báo rủi ro pháp lý phát hiện trong APK:</span>
                </div>
                <ul className="text-xs text-rose-800 list-disc pl-5 space-y-1 leading-relaxed">
                  {scanResult.violationsSummary.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* High-Density Tabular Permissions View */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Danh Mục Quyền Thiết Bị ({sortedPermissions.length} / {scanResult.totalPermissions})
                </h3>
                <p className="text-xs text-slate-500">
                  Đối soát chi tiết theo yêu cầu danh mục &quot;{scanResult.categoryNameVi}&quot;
                </p>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo tên quyền..."
                    className="pl-7 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs w-44 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2 pointer-events-none" />
                </div>

                {/* Filter Segments with badge counts — Fix #6 */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs">
                  <button
                    onClick={() => setFilterMode('all')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1 ${filterMode === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    Tất cả
                    <span className="font-mono text-[10px] bg-slate-200 text-slate-600 px-1 rounded">{filterCounts.all}</span>
                  </button>
                  <button
                    onClick={() => setFilterMode('dangerous')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1 ${filterMode === 'dangerous' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    Nguy hại
                    <span className="font-mono text-[10px] bg-amber-100 text-amber-700 px-1 rounded">{filterCounts.dangerous}</span>
                  </button>
                  <button
                    onClick={() => setFilterMode('violations')}
                    className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1 ${filterMode === 'violations' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                      }`}
                  >
                    Vi phạm
                    <span className={`font-mono text-[10px] px-1 rounded ${filterCounts.violations > 0 ? 'bg-rose-100 text-rose-700' : 'bg-slate-200 text-slate-600'}`}>
                      {filterCounts.violations}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* High-density table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    {/* Fix #7: Sortable headers */}
                    <th
                      className="p-3 font-semibold cursor-pointer hover:text-slate-800 select-none whitespace-nowrap"
                      onClick={() => handleSort('shortName')}
                      title="Nhấn để sắp xếp theo tên"
                    >
                      Tên Permission {sortField === 'shortName' ? (sortDir === 'asc' ? '▲' : '▼') : <span className="opacity-40">⇅</span>}
                    </th>
                    <th
                      className="p-3 font-semibold cursor-pointer hover:text-slate-800 select-none whitespace-nowrap"
                      onClick={() => handleSort('status')}
                      title="Nhấn để sắp xếp: vi phạm lên đầu"
                    >
                      Đánh giá tính hợp lý {sortField === 'status' ? (sortDir === 'asc' ? '▲' : '▼') : <span className="opacity-40">⇅</span>}
                    </th>
                    <th
                      className="p-3 font-semibold cursor-pointer hover:text-slate-800 select-none whitespace-nowrap"
                      onClick={() => handleSort('riskLevel')}
                      title="Nhấn để sắp xếp theo mức rủi ro"
                    >
                      Mức độ rủi ro {sortField === 'riskLevel' ? (sortDir === 'asc' ? '▲' : '▼') : <span className="opacity-40">⇅</span>}
                    </th>
                    <th className="p-3 font-semibold">Giải trình &amp; Căn cứ kỹ thuật</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {sortedPermissions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-slate-400">
                        Không tìm thấy quyền nào phù hợp với bộ lọc hiện tại.
                      </td>
                    </tr>
                  ) : (
                    sortedPermissions.map((perm) => (
                      <tr key={perm.name} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-mono">
                          <div className="font-bold text-slate-900">{perm.shortName}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{perm.name}</div>
                        </td>

                        <td className="p-3">
                          {perm.status === 'valid' ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Hợp lý
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[11px]">
                              <XCircle className="w-3.5 h-3.5" /> Vi phạm
                            </span>
                          )}
                        </td>

                        <td className="p-3 font-mono">
                          <span
                            className={`font-semibold px-2 py-0.5 rounded text-[10px] ${perm.riskLevel === 'HIGH'
                              ? 'bg-rose-50 text-rose-700'
                              : perm.riskLevel === 'MEDIUM'
                                ? 'bg-amber-50 text-amber-800'
                                : 'bg-slate-100 text-slate-600'
                              }`}
                          >
                            {perm.riskLevel}
                          </span>
                        </td>

                        <td className="p-3 leading-relaxed">
                          <div className={perm.status === 'violation' ? 'text-rose-900 font-medium' : 'text-slate-700'}>
                            {perm.categoryExplanation}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            {perm.description}
                            {perm.ruleViolated && <span> · {perm.ruleViolated}</span>}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Remediation Plan (Technical Roadmap) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Lộ Trình Khắc Phục Kỹ Thuật (Remediation Roadmap):
            </h3>

            <div className="space-y-2">
              {scanResult.recommendations.map((rec, i) => (
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
                <span>Quét tệp tin khác</span>
              </button>

              <button
                onClick={handleCopyReport}
                className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Xuất văn bản báo cáo</span>
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

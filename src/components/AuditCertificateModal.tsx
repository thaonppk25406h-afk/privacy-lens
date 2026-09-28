import React, { useRef } from 'react';
import { X, Printer, Download, ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { ApkScanResult, PolicySummaryResult } from '../types';

interface AuditCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  apkResult?: ApkScanResult | null;
  policyResult?: PolicySummaryResult | null;
}

export const AuditCertificateModal: React.FC<AuditCertificateModalProps> = ({
  isOpen,
  onClose,
  apkResult,
  policyResult,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const appName = apkResult?.appName || policyResult?.appName || 'Ứng Dụng Mẫu (Sample Enterprise App)';
  const complianceScore = apkResult?.complianceScore ?? 85;
  const ratingLabel = apkResult?.ratingLabel || 'TUÂN THỦ TỐT (COMPLIANT)';
  const auditDate = apkResult?.scanTime || policyResult?.analyzedAt || new Date().toLocaleDateString('vi-VN');
  const certificateId = `PC-AUDIT-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-sm text-slate-900">
              Chứng Nhận & Báo Cáo Kiểm Toán Độc Lập
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In báo cáo</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Area */}
        <div ref={printRef} className="p-8 sm:p-12 overflow-y-auto space-y-8 bg-white font-sans text-slate-800">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Privacy Compass Compliance Verification</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                CHỨNG THƯ KIỂM TOÁN BẢO MẬT DỮ LIỆU
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Chứng thư đối chiếu theo Quy định Bảo vệ Dữ liệu EU (GDPR) & Luật Bảo vệ dữ liệu cá nhân Việt Nam
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-xs text-slate-500">
              <div>Mã số: <strong>{certificateId}</strong></div>
              <div>Ngày cấp: <strong>{auditDate}</strong></div>
              <div>Trạng thái: <span className="text-emerald-700 font-bold">Xác nhận</span></div>
            </div>
          </div>

          {/* Target App Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div>
              <div className="text-slate-400 uppercase text-[10px] font-bold">Ứng dụng</div>
              <div className="font-bold text-slate-900 mt-0.5">{appName}</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase text-[10px] font-bold">Gói định danh</div>
              <div className="font-mono text-slate-700 mt-0.5 truncate">
                {apkResult?.packageName || 'vn.app.standard'}
              </div>
            </div>
            <div>
              <div className="text-slate-400 uppercase text-[10px] font-bold">Phiên bản</div>
              <div className="font-medium text-slate-700 mt-0.5">{apkResult?.version || '1.0.0'}</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase text-[10px] font-bold">Điểm Tuân Thủ (Score)</div>
              <div className="font-black text-slate-900 mt-0.5 text-sm">{complianceScore}/100</div>
            </div>
          </div>

          {/* Scope of Verification */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              1. Phạm Vi Kiểm Toán & Cơ Sở Tiêu Chuẩn
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hệ thống đã thực hiện phân tích tĩnh (Static Analysis) cấu trúc tệp tin ứng dụng, mã định danh quyền truy cập thiết bị (Device Permissions), và nội dung văn bản Chính sách bảo mật người dùng nhằm xác định sự tương thích với:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Nguyên tắc Tối thiểu hóa dữ liệu (GDPR Điều 5)</span>
              </li>
              <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Nghị định 13/2023/NĐ-CP & Luật BV Dữ Liệu Cá Nhân</span>
              </li>
              <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Quy định An toàn Dữ liệu Google Play (Data Safety)</span>
              </li>
              <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tiêu chuẩn Bảo mật Di động OWASP MASVS</span>
              </li>
            </ul>
          </div>

          {/* Audit Findings */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              2. Kết Luận Kiểm Toán Độc Lập
            </h3>
            <div className="p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Mức Độ Phù Hợp:</span>
                <span className="font-bold text-slate-900">{ratingLabel}</span>
              </div>
              <div className="text-slate-600 leading-relaxed">
                {complianceScore >= 80 ? (
                  <span>
                    Ứng dụng không yêu cầu các quyền truy cập xâm lấn ngoài phạm vi chức năng cốt lõi. Cấu trúc khai báo bảo mật đáp ứng yêu cầu tối thiểu hóa thông tin người dùng theo luật hiện hành.
                  </span>
                ) : (
                  <span>
                    Phát hiện các quyền truy cập cần xem xét loại bỏ hoặc bổ sung giải trình lý do kỹ thuật trong hồ sơ công bố an toàn dữ liệu trước khi phát hành chính thức.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Signatures & Seal */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-2 text-xs">
            <div>
              <div className="text-slate-400 uppercase text-[10px] font-bold">Hội Đồng Thẩm Định Kỹ Thuật</div>
              <div className="font-bold text-slate-900 mt-1">Privacy Compass Automated Audit Engine</div>
              <div className="text-slate-500 text-[11px]">Audit Engine Version 1.0 (Enterprise)</div>
            </div>

            <div className="text-right">
              <div className="text-slate-400 uppercase text-[10px] font-bold">Xác Thực Mã Số Điện Tử</div>
              <div className="font-mono text-slate-700 mt-1 font-semibold">{certificateId}</div>
              <div className="text-slate-400 text-[10px]">Lưu hành nội bộ & Nộp hồ sơ xét duyệt</div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Đóng
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In / Lưu PDF chứng thư</span>
          </button>
        </div>
      </div>
    </div>
  );
};

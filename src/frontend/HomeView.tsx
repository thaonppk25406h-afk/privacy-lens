import React from 'react';
import { Smartphone, FileText, ArrowRight, ShieldCheck, CheckCircle2, Lock, Scale, ExternalLink } from 'lucide-react';
import { NavTab } from './Navbar';

interface HomeViewProps {
  onNavigate: (tab: NavTab) => void;
  onQuickSampleApk: () => void;
  onQuickSamplePolicy: () => void;
  onOpenCertificate?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onQuickSampleApk,
  onQuickSamplePolicy,
  onOpenCertificate,
}) => {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Tiêu chuẩn GDPR (EU)</span>
          <span aria-hidden="true">·</span>
          <span>Nghị định 13/2023/NĐ-CP</span>
          <span aria-hidden="true">·</span>
          <span>Luật Bảo vệ dữ liệu cá nhân 2025</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
          Nền tảng kiểm toán dữ liệu di động và tuân thủ pháp lý
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Tự động hóa rà soát quyền ứng dụng (Data Minimization) và thẩm định Chính sách bảo mật người dùng. Sẵn sàng phát hành lên Google Play, App Store và vượt qua các đợt thanh tra bảo mật độc lập.
        </p>

        <div className="pt-2 flex flex-wrap gap-3 justify-center items-center">
          <button
            onClick={() => onNavigate('apk_scanner')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
          >
            <span>Bắt đầu kiểm toán APK</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('policy_summarizer')}
            className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100/70 text-slate-800 font-semibold text-sm transition-all flex items-center gap-2"
          >
            <span>Soát xét Chính sách Bảo mật</span>
          </button>
        </div>

        {/* Enterprise Trust Indicators */}
        <div className="pt-10 flex flex-wrap justify-center items-center gap-y-2 gap-x-8 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Phân tích tĩnh tệp APK & AndroidManifest</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Thẩm định 5 trụ cột pháp lý</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Zero-Retention (Không lưu trữ dữ liệu)</span>
          </div>
        </div>
      </section>

      {/* 2 Core Commercial Audit Solutions */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Hệ Thống Kiểm Toán Cốt Lõi</h2>
            <p className="text-xs text-slate-500">Lựa chọn quy trình thẩm tra chuyên sâu theo nhu cầu doanh nghiệp</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 pt-1">
          {/* Solution 1: APK Scanner */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5 text-indigo-600" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Kiểm Toán Quyền Ứng Dụng (APK Audit)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Phát hiện lạm dụng quyền và vi phạm nguyên tắc Tối thiểu hóa dữ liệu</p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Giải nén cấu trúc nhị phân AndroidManifest.xml để liệt kê toàn bộ các quyền thiết bị được yêu cầu. Đối chiếu với 8 danh mục ứng dụng chuẩn hóa để chỉ ra chính xác các quyền đòi hỏi vô lý kèm mã khuyến nghị gỡ bỏ.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-600">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span>Chỉ số tuân thủ</span>
                  <span className="font-semibold text-slate-900">Compliance Index (0 - 100)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span>Phân loại rủi ro</span>
                  <span className="font-semibold text-slate-900">Chuẩn OWASP & Android Security</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Hồ sơ xuất khẩu</span>
                  <span className="font-semibold text-slate-900">Khai báo Google Play Data Safety</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate('apk_scanner')}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>Mở công cụ quét APK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onQuickSampleApk}
                className="text-xs text-indigo-600 hover:underline font-medium"
              >
                Tải mẫu thẩm định: Đèn Pin Pro
              </button>
            </div>
          </div>

          {/* Solution 2: Policy Summarizer */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Soát Xét Chính Sách Bảo Mật (Policy Review)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Thẩm định pháp lý và phát hiện lỗ hổng điều khoản riêng tư</p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Hệ thống thu thập tự động từ URL hoặc tiếp nhận văn bản điều khoản pháp lý. Tóm lược 5 trụ cột quản trị dữ liệu, phát hiện các điều khoản mơ hồ, chuyển giao dữ liệu trái phép hoặc tước đoạt quyền chủ thể của người dùng.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-600">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span>Thẩm định 5 trụ cột</span>
                  <span className="font-semibold text-slate-900">Phạm vi, Mục đích, Bên thứ 3, Lưu trữ, Quyền hạn</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span>Căn cứ pháp luật</span>
                  <span className="font-semibold text-slate-900">GDPR Art. 5/13/17, NĐ 13/2023, Luật 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cảnh báo rủi ro pháp lý</span>
                  <span className="font-semibold text-slate-900">Risk Severity Score & Lộ trình khắc phục</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate('policy_summarizer')}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <span>Mở công cụ soát xét</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onQuickSamplePolicy}
                className="text-xs text-indigo-600 hover:underline font-medium"
              >
                Tải mẫu thẩm định: TikTok Global
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Audit Workflow */}
      <section className="bg-slate-100/60 rounded-3xl p-8 border border-slate-200/80 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Quy Trình Chuẩn Hóa</span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">3 Bước Hoàn Tất Kiểm Toán Tuân Thủ Dữ Liệu</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-600">BƯỚC 01</span>
            <h4 className="font-bold text-sm text-slate-900">Nhập Tệp Tin Hoặc Đường Dẫn</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tải lên tệp tin APK của ứng dụng hoặc dán đường dẫn trang Chính sách bảo mật đang công bố trên website.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-600">BƯỚC 02</span>
            <h4 className="font-bold text-sm text-slate-900">Hệ Thống Đối Chiếu Tự Động</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Công cụ phân tích nhị phân và đối soát ngữ nghĩa pháp lý với bộ quy tắc GDPR, Nghị định 13 và tiêu chuẩn OWASP.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-2">
            <span className="font-mono text-xs font-bold text-indigo-600">BƯỚC 03</span>
            <h4 className="font-bold text-sm text-slate-900">Nhận Báo Cáo & Chứng Thư</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nhận bản khuyến nghị khắc phục lỗi kỹ thuật và xuất chứng thư kiểm toán phục vụ nộp hồ sơ xét duyệt ứng dụng.
            </p>
          </div>
        </div>
      </section>

      {/* Enterprise Certificate Callout */}
      {onOpenCertificate && (
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">Chứng Thư Kiểm Toán Bảo Mật Độc Lập</h3>
            </div>
            <p className="text-xs text-slate-500 max-w-xl">
              Tạo và in chứng thư xác nhận tuân thủ độc lập cho từng phiên bản ứng dụng phục vụ báo cáo hội đồng quản trị và cơ quan quản lý.
            </p>
          </div>

          <button
            onClick={onOpenCertificate}
            className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs whitespace-nowrap transition-colors"
          >
            Xem mẫu chứng thư
          </button>
        </section>
      )}
    </div>
  );
};

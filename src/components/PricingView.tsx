import React from 'react';
import { Check, Shield, HelpCircle, ArrowRight, Building2, UserCheck, ShieldCheck } from 'lucide-react';

interface PricingViewProps {
  onStartAudit: () => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onStartAudit }) => {
  return (
    <div className="space-y-12 py-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Bảng Giá & Gói Dịch Vụ Doanh Nghiệp
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Giải pháp kiểm toán tuân thủ bảo mật dữ liệu toàn diện
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Đảm bảo ứng dụng di động và website của bạn luôn sẵn sàng trước các đợt thanh tra pháp lý GDPR, Nghị định 13/2023/NĐ-CP và Luật Bảo vệ dữ liệu cá nhân 2025.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Tier 1: Starter */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dành cho cá nhân & Indie Dev</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Starter Community</h3>
              <p className="text-xs text-slate-500 mt-1">Kiểm tra nhanh trước khi xuất xưởng ứng dụng lên Google Play</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">Miễn phí</span>
              <span className="text-xs text-slate-500 font-medium">/ tháng</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Quét file APK đơn lẻ (tối đa 50MB)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Phân tích đối chiếu quyền theo 8 danh mục</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Soát xét 5 trụ cột Chính sách bảo mật</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Xuất báo cáo văn bản tóm tắt</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100">
            <button
              onClick={onStartAudit}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 font-semibold text-xs text-slate-800 hover:bg-slate-50 transition-colors"
            >
              Sử dụng bản miễn phí
            </button>
          </div>
        </div>

        {/* Tier 2: Professional (Featured) */}
        <div className="rounded-2xl border-2 border-indigo-600 bg-white p-7 flex flex-col justify-between shadow-lg relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-0.5 rounded-full">
            Được doanh nghiệp tin dùng
          </div>

          <div className="space-y-5">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Dành cho Startup & Scale-up</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Growth Compliance</h3>
              <p className="text-xs text-slate-500 mt-1">Bộ công cụ soát xét định kỳ tự động và cấp chứng thư kiểm toán</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">1.890.000₫</span>
              <span className="text-xs text-slate-500 font-medium">/ tháng</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mọi tính năng gói Starter</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Không giới hạn số lần quét APK & URL Policy</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Xuất <strong>Chứng thư Kiểm toán Độc lập</strong> (PDF / Print)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Khuyến nghị sửa lỗi mã nguồn theo tiêu chuẩn OWASP</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hỗ trợ hồ sơ khai báo Google Data Safety / Apple Nutrition</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100">
            <button
              onClick={onStartAudit}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold text-xs text-white shadow-xs transition-colors"
            >
              Trải nghiệm gói Doanh nghiệp
            </button>
          </div>
        </div>

        {/* Tier 3: Enterprise */}
        <div className="rounded-2xl border border-slate-200 bg-white p-7 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dành cho Tập đoàn & Fintech</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Enterprise DPO Suite</h3>
              <p className="text-xs text-slate-500 mt-1">Giải pháp tích hợp quy trình CI/CD và tư vấn chuyên gia bảo mật dữ liệu</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900">Liên hệ</span>
              <span className="text-xs text-slate-500 font-medium">/ hợp đồng</span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tích hợp API kiểm toán tự động trong CI/CD</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Đồng hành cùng Chuyên viên Bảo vệ Dữ liệu (DPO)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Đánh giá tác động xử lý dữ liệu cá nhân (DPIA)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cam kết SLA 99.9% và bảo mật cấp ngân hàng</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100">
            <button
              onClick={onStartAudit}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 font-semibold text-xs text-slate-800 hover:bg-slate-50 transition-colors"
            >
              Liên hệ tư vấn viên
            </button>
          </div>
        </div>
      </div>

      {/* Enterprise Security Guarantees */}
      <div className="max-w-4xl mx-auto rounded-2xl bg-slate-100/60 p-6 border border-slate-200/80 text-xs text-slate-600 space-y-3">
        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600" />
          <span>Cam Kết An Ninh & Quyền Sở Hữu Trí Tuệ</span>
        </div>
        <p className="leading-relaxed">
          Chúng tôi cam kết không lưu giữ mã nguồn, file APK hoặc tệp tin manifest của khách hàng trên bất kỳ cơ sở dữ liệu vĩnh viễn nào. Mọi hoạt động giải mã và phân tích dữ liệu được thực thi trong môi trường bộ nhớ khả biến cô lập (Ephemeral Memory Containers) và tự động tiêu hủy ngay khi phiên kiểm tra kết thúc.
        </p>
      </div>
    </div>
  );
};

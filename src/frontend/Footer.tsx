import React from 'react';
import { Shield, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 bg-white border-t border-slate-200 py-12 text-xs text-slate-500 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold">
              <Shield className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Privacy Lens</div>
              <div className="text-slate-400 text-[11px]">Nền tảng kiểm toán dữ liệu ứng dụng & tuân thủ pháp lý</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Môi trường phân tích bảo mật cô lập (Zero-Data Retention)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-500 text-xs">
          <div>
            <h5 className="font-bold text-slate-800 mb-2">Về Nền Tảng</h5>
            <p className="leading-relaxed">
              Privacy Lens là giải pháp RegTech hỗ trợ doanh nghiệp và chuyên gia an toàn thông tin rà soát quyền ứng dụng di động và thẩm định điều khoản bảo mật theo chuẩn mực quốc tế và pháp luật Việt Nam.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 mb-2">Cơ Sở Pháp Lý & Tiêu Chuẩn Thẩm Định</h5>
            <ul className="space-y-1">
              <li>• Quy định Bảo vệ Dữ liệu Chung Châu Âu (GDPR Điều 5, 6, 7, 13, 17, 32)</li>
              <li>• Nghị định số 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân Việt Nam</li>
              <li>• Luật Bảo vệ dữ liệu cá nhân 2025 (Việt Nam)</li>
              <li>• Chuẩn kiểm tra an ninh di động OWASP MASVS & MSTG</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 mb-2">Chính Sách Xử Lý Dữ Liệu Tạm Thời</h5>
            <p className="leading-relaxed">
              Toàn bộ tệp tin APK và văn bản chính sách chỉ được giải mã và phân tích trong bộ nhớ RAM tạm thời và tự động xóa ngay sau khi phiên kiểm tra kết thúc. Hệ thống không lưu trữ tệp tin nhị phân hay thông tin riêng tư của khách hàng.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-[11px]">
          <div>
            © 2026 Privacy Lens                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            . Tất cả các quyền được bảo lưu.
          </div>
          <div>
            Hệ Thống Kiểm Toán Tuân Thủ Quyền Riêng Tư Dữ Liệu
          </div>
        </div>
      </div>
    </footer>
  );
};

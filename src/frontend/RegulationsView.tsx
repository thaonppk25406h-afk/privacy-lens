import React from 'react';
import { Scale, BookOpen, ShieldAlert, CheckCircle2, Shield, AlertTriangle } from 'lucide-react';
import { ANDROID_PERMISSIONS_DB } from '../apk/permissionRef';

export const RegulationsView: React.FC = () => {
  return (
    <div className="space-y-10 py-2">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xs space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
          Regulatory Compliance Standards & Legal Matrix
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Khung Pháp Lý Bảo Vệ Dữ Liệu & Quyền Riêng Tư Ứng Dụng
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Tài liệu đối chiếu bắt buộc dành cho Chuyên viên Bảo vệ Dữ liệu (DPO), Kỹ sư bảo mật và Đội ngũ phát triển ứng dụng di động theo GDPR (EU) 2016/679, Nghị định 13/2023/NĐ-CP và Luật Bảo vệ dữ liệu cá nhân 2025.
        </p>
      </div>

      {/* 5 Golden Rules Full Detail */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>5 Quy Tắc Vàng Bảo Vệ Quyền Riêng Tư (Privacy Principles)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Các nguyên tắc pháp lý cốt lõi cấu thành nên hệ thống kiểm toán tự động
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-600">01.</span>
              <h4 className="font-bold text-slate-900 text-sm">Tính Hợp Pháp & Đồng Thuận Tự Nguyện (Consent)</h4>
            </div>
            <p className="text-xs text-slate-500">
              <strong>Căn cứ:</strong> GDPR Điều 6 & 7; Nghị định 13/2023 Điều 11; Luật 2025 Điều 9.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Thu thập dữ liệu cá nhân chỉ hợp pháp khi có sự đồng ý tự nguyện, được thông báo trước, rõ ràng và có thể rút lại bất cứ lúc nào.
              Nghiêm cấm hành vi &quot;Take-it-or-leave-it&quot; (bắt buộc đồng ý chia sẻ dữ liệu ngoài chức năng cơ bản).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-600">02.</span>
              <h4 className="font-bold text-slate-900 text-sm">Mục Đích Giới Hạn (Purpose Limitation)</h4>
            </div>
            <p className="text-xs text-slate-500">
              <strong>Căn cứ:</strong> GDPR Điều 5(1)(b); Nghị định 13/2023 Điều 3.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Dữ liệu phải được thu thập cho các mục đích cụ thể, rõ ràng và hợp pháp; không được xử lý thêm theo cách không tương thích với các mục đích ban đầu (ví dụ: thu thập số điện thoại đăng nhập nhưng dùng để bán cho bên quảng cáo).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-600">03.</span>
              <h4 className="font-bold text-slate-900 text-sm">Tối Thiểu Hóa Dữ Liệu (Data Minimization)</h4>
            </div>
            <p className="text-xs text-slate-500">
              <strong>Căn cứ:</strong> GDPR Điều 5(1)(c); Luật BV Dữ Liệu Cá Nhân 2025 Điều 6.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Chỉ được phép thu thập những dữ liệu thực sự cần thiết, thỏa đáng và giới hạn ở mức tối thiểu phục vụ cho mục đích đã nêu.
              Các ứng dụng tiện ích đơn giản không được đòi hỏi quyền đọc danh bạ, tin nhắn SMS hoặc vị trí nền.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-600">04.</span>
              <h4 className="font-bold text-slate-900 text-sm">Tính Minh Bạch & Giới Hạn Lưu Trữ (Transparency)</h4>
            </div>
            <p className="text-xs text-slate-500">
              <strong>Căn cứ:</strong> GDPR Điều 5(1)(e) & Điều 13; Nghị định 13/2023 Điều 13.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Chính sách phải dùng ngôn ngữ dễ hiểu, chỉ rõ danh tính các bên thứ ba nhận dữ liệu và thời hạn lưu trữ cụ thể.
              Không sử dụng các cụm từ mơ hồ như &quot;lưu trữ vĩnh viễn&quot; hay &quot;chia sẻ đối tác chiến lược không xác định&quot;.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-600">05.</span>
              <h4 className="font-bold text-slate-900 text-sm">Bảo Mật & Toàn Vẹn Dữ Liệu (Security & Integrity)</h4>
            </div>
            <p className="text-xs text-slate-500">
              <strong>Căn cứ:</strong> GDPR Điều 32; Nghị định 13/2023 Điều 26; Tiêu chuẩn OWASP MASVS.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để đảm bảo an toàn dữ liệu, chống lại việc xử lý trái phép, mất mát, phá hủy hoặc hư hại ngẫu nhiên (mã hóa đường truyền TLS, mã hóa dữ liệu nghỉ, kiểm soát truy cập phân quyền).
            </p>
          </div>
        </div>
      </section>

      {/* Android Permissions Danger Matrix */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-600" />
            <span>Ma Trận Phân Loại Quyền Android (Android Permission Security Matrix)</span>
          </h3>
          <p className="text-xs text-slate-500">
            Phân loại rủi ro kỹ thuật theo chuẩn Google Android Security Guidelines & OWASP MASVS
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="p-3 font-semibold">Tên Permission</th>
                <th className="p-3 font-semibold">Phân loại</th>
                <th className="p-3 font-semibold">Mức độ rủi ro</th>
                <th className="p-3 font-semibold">Mô tả kỹ thuật & Khuyến cáo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {Object.entries(ANDROID_PERMISSIONS_DB).map(([permName, meta]) => (
                <tr key={permName} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3 font-mono">
                    <div className="font-bold text-slate-900">{meta.shortName}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{permName}</div>
                  </td>
                  <td className="p-3 font-sans">
                    {meta.isDangerous ? (
                      <span className="font-semibold px-2 py-0.5 rounded text-[10px] bg-amber-50 text-amber-800">
                        Dangerous
                      </span>
                    ) : (
                      <span className="font-semibold px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-mono">
                    <span
                      className={`font-semibold px-2 py-0.5 rounded text-[10px] ${meta.generalRisk === 'HIGH'
                          ? 'bg-rose-50 text-rose-700'
                          : meta.generalRisk === 'MEDIUM'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                    >
                      {meta.generalRisk}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 leading-relaxed">
                    {meta.categoryDesc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

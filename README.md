# Privacy Lens

Công cụ hỗ trợ rà soát sơ bộ tính bảo mật và mức độ minh bạch dữ liệu của ứng dụng
di động, đối chiếu với Luật Bảo vệ dữ liệu cá nhân 2025 (số 91/2025/QH15), Nghị
định 356/2025/NĐ-CP, và GDPR (EU).

**Đây là công cụ tham khảo, không phải tư vấn pháp lý.** Kết quả do AI tạo ra,
có thể thiếu sót hoặc sai lệch, không dùng để kết luận một ứng dụng "vi phạm"
hay "tuân thủ" pháp luật.

## Hai tính năng chính

- **Kiểm toán APK**: tải file `.apk`, phân tích tĩnh quyền truy cập, cấu hình bảo
  mật, và các SDK theo dõi/quảng cáo được nhúng trong ứng dụng.
- **Soát xét chính sách bảo mật**: dán văn bản chính sách hoặc chọn từ danh sách
  mẫu có sẵn, hệ thống tóm tắt và đối chiếu với 13 tiêu chí pháp lý.

## Yêu cầu hệ thống

- [Node.js](https://nodejs.org) bản 20 trở lên (chọn bản LTS)
- [Git](https://git-scm.com/download/win)
- API key của Gemini (miễn phí, lấy tại https://aistudio.google.com/apikey)

## Cách chạy

1. Tải code về:

git clone https://github.com/<tên-tài-khoản>/<tên-repo>.git
cd <tên-repo>


2. Cài thư viện:

npm install

   (Project dùng `.npmrc` để tự áp dụng `legacy-peer-deps`, không cần thêm cờ)

3. Tạo file `.env` trong thư mục gốc (sao chép từ `.env.example`), điền key thật:

GEMINI_API_KEY="dán-key-của-bạn-vào-đây"


4. Chạy ứng dụng:

npm run dev


5. Mở trình duyệt tại http://localhost:3000

## Lỗi thường gặp

- **"npm không được nhận diện"**: chưa cài Node.js, hoặc cần đóng và mở lại
  terminal sau khi cài.
- **`injected env (0) from .env`**: chưa tạo file `.env`, hoặc tạo nhầm tên (kiểm
  tra không bị Windows tự thêm đuôi `.txt`, bật hiển thị đuôi file trong File
  Explorer: View > Show > File name extensions).
- **Lỗi 403 / PERMISSION_DENIED khi gọi Gemini**: API key hoặc project đang bị
  Google từ chối. Tạo project mới trong AI Studio và lấy key mới.
- **Lỗi xung đột phiên bản khi `npm install`**: đã có `.npmrc` xử lý sẵn; nếu
  vẫn gặp, chạy `npm install --legacy-peer-deps`.
- **Cổng 3000 đang bị chiếm**: đổi cổng bằng biến môi trường, ví dụ trong
  PowerShell: `$env:PORT=3001; npm run dev`.

## Giới hạn của công cụ

- Phân tích APK là **phân tích tĩnh**, chỉ cho biết dấu hiệu kỹ thuật (quyền, cấu
  hình, SDK), không chứng minh được các yêu cầu pháp lý như cơ chế đồng ý, quyền
  xóa dữ liệu, hay quy trình thông báo vi phạm.
- Tính năng dán link chính sách có thể không lấy được nội dung với các trang có
  cơ chế chống bot mạnh (Facebook, TikTok...). Nên dán trực tiếp văn bản trong
  trường hợp đó.
- Kết quả tóm tắt và đối chiếu do AI tạo ra, cần đối chiếu lại với văn bản gốc
  trước khi sử dụng cho mục đích chính thức.
Cách áp dụng
Mở file README.md trong thư mục gốc project (nhánh feat/frontend hoặc main, tùy bạn quy ước ai giữ file này).
Xóa toàn bộ nội dung cũ, dán bản trên vào, sửa lại link repo cho đúng.
Kiểm tra và xóa phần banner ảnh GHBanner và dòng "View your app in AI Studio: https://ai.studio/apps/..." nếu còn sót ở đầu file — đây chính là dấu vết mặc định của AI Studio.
Commit:
   git add README.md
   git commit -m "Viet lai README, bo dau vet AI Studio va thong tin loi thoi"
   git push
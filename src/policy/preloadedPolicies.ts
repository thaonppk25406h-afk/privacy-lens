export interface PreloadedPolicyItem {
  id: string;
  name: string;
  url: string;
  rawText: string;
  policyDate: string; // Định dạng DD/MM/YYYY
  isDemoData?: boolean;
}

export const PRELOADED_POLICIES: PreloadedPolicyItem[] = [
  {
    id: 'tiktok',
    name: 'TikTok Global Privacy Policy',
    url: 'https://tiktok.com/privacy-policy',
    policyDate: '26/09/2026',
    rawText: `Chính sách Quyền riêng tư của TikTok: Chúng tôi thu thập thông tin hồ sơ của bạn gồm tên người dùng, mật khẩu, ngày sinh, địa chỉ email, số điện thoại. Chúng tôi tự động thu thập thông tin thiết bị (địa chỉ IP, nhà mạng di động, cài đặt múi giờ, số nhận dạng quảng cáo di động IDFA/GAID, kiểu thiết bị, hệ điều hành). Chúng tôi thu thập nội dung tin nhắn, video bạn đăng tải, lịch sử xem, thời lượng xem và nội dung bạn thích. Mục đích: Cung cấp, hỗ trợ, cá nhân hóa nội dung 'Dành cho bạn', hiển thị quảng cáo hướng đối tượng, cải thiện thuật toán và ngăn chặn gian lận. Chia sẻ dữ liệu: Chúng tôi chia sẻ dữ liệu của bạn với các nhà cung cấp dịch vụ bên thứ ba (lưu trữ đám mây, hỗ trợ kỹ thuật), các đối tác quảng cáo và đo lường (như Google, Meta, các mạng quảng cáo programmatic), các công ty cùng tập đoàn ByteDance Ltd. Thời gian lưu giữ: Chúng tôi lưu giữ thông tin của bạn chừng nào cần thiết để cung cấp dịch vụ hoặc tối đa 5 năm sau khi đóng tài khoản, hoặc lâu hơn theo yêu cầu điều tra pháp lý. Quyền của bạn: Bạn có quyền truy cập, chỉnh sửa, yêu cầu xóa dữ liệu của mình hoặc tải xuống bản sao dữ liệu trong phần Cài đặt ứng dụng. Một số thông tin quảng cáo hành vi vẫn có thể được phân phối theo danh mục chung.`,
  },
  {
    id: 'shopee',
    name: 'Shopee Vietnam Privacy Notice',
    url: 'https://shopee.vn/docs/privacy',
    policyDate: '26/09/2026',
    rawText: `Chính sách Bảo mật Shopee: Chúng tôi thu thập dữ liệu cá nhân của người dùng bao gồm: Họ tên, địa chỉ nhận hàng, số điện thoại, email, thông tin tài khoản ngân hàng/ví điện tử liên kết, hình ảnh CCCD khi xác thực danh tính Người Bán. Khi sử dụng ứng dụng, chúng tôi ghi nhận địa chỉ IP, vị trí GPS khi chọn điểm giao nhận, thông tin giao dịch mua sắm và lịch sử chat với người bán. Mục đích sử dụng: Xử lý đơn hàng, điều phối giao vận thông qua các đơn vị bưu chính (SPX, GHTK, GHN), bảo đảm thanh toán và hoàn tiền, bảo vệ người tiêu dùng chống lừa đảo, đề xuất mã giảm giá phù hợp. Chia sẻ thông tin: Chúng tôi chia sẻ thông tin giao nhận (tên, SĐT, địa chỉ) cho người bán và tài xế vận chuyển; chia sẻ với các ngân hàng đối tác xử lý giao dịch; không bán dữ liệu cho bên thứ ba vì mục đích tiếp thị độc lập. Thời gian lưu trữ: Lưu trữ dữ liệu giao dịch trong 10 năm theo quy định của Luật Kế toán và Luật Thương mại điện tử Việt Nam. Quyền của chủ thể dữ liệu: Người dùng có quyền xem, chỉnh sửa thông tin giao hàng, hủy tài khoản bất cứ lúc nào qua Trung tâm trợ giúp của Shopee.`,
  },
  {
    id: 'flashlight_sketchy',
    name: 'Đèn Pin Siêu Sáng Pro Policy (Mô phỏng app vi phạm)',
    url: 'https://brighttorch.example.com/privacy',
    policyDate: '26/09/2026',
    isDemoData: true,
    rawText: `Chính sách Bảo mật Ứng dụng Đèn Pin: Khi bạn cài đặt ứng dụng, chúng tôi tự động đọc danh bạ điện thoại, đọc toàn bộ tin nhắn SMS, ghi lại nhật ký cuộc gọi và theo dõi vị trí GPS thời gian thực. Chúng tôi cũng truy cập camera và thư viện hình ảnh của bạn. Mục đích: Chúng tôi sử dụng các thông tin này cho mọi mục đích kinh doanh hợp pháp, bao gồm việc nghiên cứu thị trường, phân phối quảng cáo và bán lại dữ liệu cho các đối tác dữ liệu quốc tế. Chia sẻ bên thứ ba: Chúng tôi có quyền chuyển nhượng hoặc bán lại danh bạ, số điện thoại và tin nhắn của bạn cho bất kỳ bên thứ ba nào mà không cần sự đồng ý bổ sung. Thời gian lưu trữ: Dữ liệu được lưu trữ vĩnh viễn trên máy chủ của chúng tôi. Quyền người dùng: Ứng dụng là miễn phí, do đó người dùng từ bỏ mọi quyền yêu cầu xóa hoặc chỉnh sửa dữ liệu đã gửi. Nếu không đồng ý, bạn chỉ có thể gỡ ứng dụng khỏi máy.`,
  },
  {
    id: 'zalo',
    name: 'Zalo Privacy Policy',
    url: 'https://zalo.me/privacy',
    policyDate: '26/09/2026',
    rawText: `Chính sách Bảo mật Zalo: Chúng tôi thu thập số điện thoại đăng ký, họ tên hiển thị, ngày sinh và ảnh đại diện do bạn cung cấp. Khi sử dụng tính năng đồng bộ bạn bè, Zalo sẽ hỏi xin quyền đọc danh bạ và chỉ băm (hash) số điện thoại để so khớp bạn bè, không lưu lại nội dung danh bạ thô. Tin nhắn đàm thoại cá nhân được bảo vệ bằng mã hóa đầu cuối (E2EE) trên thiết bị, máy chủ không thể đọc được nội dung tin nhắn. Chúng tôi không chia sẻ hoặc bán dữ liệu cá nhân cho bên thứ ba vì mục đích thương mại ngoài hệ sinh thái VNG. Dữ liệu tài khoản được lưu giữ trong suốt thời gian bạn duy trì tài khoản; khi bạn xóa tài khoản, toàn bộ dữ liệu hồ sơ sẽ được thanh lọc vĩnh viễn sau 30 ngày thời gian ân hạn. Bạn có toàn quyền xuất dữ liệu, thu hồi quyền truy cập danh bạ/camera trong Cài đặt quyền riêng tư bất kỳ lúc nào.`,
  },
];

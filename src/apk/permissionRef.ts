import { AppCategory } from '../types';

export interface CategoryInfo {
  id: AppCategory;
  nameVi: string;
  allowedPermissions: string[];
  riskyPermissions: string[];
  description: string;
}

export const CATEGORIES_INFO: Record<AppCategory, CategoryInfo> = {
  flashlight: {
    id: 'flashlight',
    nameVi: 'Đèn pin (Flashlight)',
    description: 'Ứng dụng chỉ bật/tắt đèn flash LED của camera hoặc làm sáng màn hình',
    allowedPermissions: [
      'android.permission.CAMERA',
      'android.permission.FLASHLIGHT',
      'android.permission.WAKE_LOCK',
      'android.permission.VIBRATE',
    ],
    riskyPermissions: [
      'android.permission.READ_CONTACTS',
      'android.permission.WRITE_CONTACTS',
      'android.permission.READ_SMS',
      'android.permission.SEND_SMS',
      'android.permission.RECEIVE_SMS',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.RECORD_AUDIO',
      'android.permission.READ_PHONE_STATE',
      'android.permission.READ_CALL_LOG',
      'android.permission.READ_EXTERNAL_STORAGE',
    ],
  },
  calculator: {
    id: 'calculator',
    nameVi: 'Máy tính bỏ túi (Calculator)',
    description: 'Ứng dụng tính toán số học, giải phương trình cơ bản',
    allowedPermissions: [
      'android.permission.VIBRATE',
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
    ],
    riskyPermissions: [
      'android.permission.READ_CONTACTS',
      'android.permission.READ_SMS',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.CAMERA',
      'android.permission.RECORD_AUDIO',
      'android.permission.READ_PHONE_STATE',
      'android.permission.READ_CALL_LOG',
      'android.permission.READ_EXTERNAL_STORAGE',
    ],
  },
  social_media: {
    id: 'social_media',
    nameVi: 'Mạng xã hội & Chat (Social Media)',
    description: 'Ứng dụng nhắn tin, đăng ảnh bài viết, kết nối bạn bè',
    allowedPermissions: [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.CAMERA',
      'android.permission.RECORD_AUDIO',
      'android.permission.READ_CONTACTS',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.READ_MEDIA_IMAGES',
      'android.permission.READ_MEDIA_VIDEO',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.VIBRATE',
      'android.permission.POST_NOTIFICATIONS',
    ],
    riskyPermissions: [
      'android.permission.READ_SMS',
      'android.permission.SEND_SMS',
      'android.permission.READ_CALL_LOG',
      'android.permission.PROCESS_OUTGOING_CALLS',
      'android.permission.ACCESS_BACKGROUND_LOCATION',
      'android.permission.SYSTEM_ALERT_WINDOW',
    ],
  },
  photo_editor: {
    id: 'photo_editor',
    nameVi: 'Chỉnh sửa ảnh / Camera (Photo Editor)',
    description: 'Ứng dụng chụp ảnh và áp dụng bộ lọc hình ảnh',
    allowedPermissions: [
      'android.permission.CAMERA',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.READ_MEDIA_IMAGES',
      'android.permission.VIBRATE',
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
    ],
    riskyPermissions: [
      'android.permission.READ_CONTACTS',
      'android.permission.READ_SMS',
      'android.permission.SEND_SMS',
      'android.permission.READ_CALL_LOG',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.READ_PHONE_STATE',
      'android.permission.RECORD_AUDIO',
    ],
  },
  ecommerce: {
    id: 'ecommerce',
    nameVi: 'Mua sắm & Thương mại điện tử (E-Commerce)',
    description: 'Ứng dụng đặt hàng, giao nhận và thanh toán trực tuyến',
    allowedPermissions: [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.CAMERA',
      'android.permission.POST_NOTIFICATIONS',
      'android.permission.VIBRATE',
    ],
    riskyPermissions: [
      'android.permission.READ_SMS',
      'android.permission.READ_CONTACTS',
      'android.permission.READ_CALL_LOG',
      'android.permission.RECORD_AUDIO',
      'android.permission.ACCESS_BACKGROUND_LOCATION',
    ],
  },
  fitness: {
    id: 'fitness',
    nameVi: 'Sức khỏe & Thể thao (Fitness / Health)',
    description: 'Theo dõi bước chân, chạy bộ và đo nhịp tim',
    allowedPermissions: [
      'android.permission.ACTIVITY_RECOGNITION',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.BODY_SENSORS',
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.VIBRATE',
    ],
    riskyPermissions: [
      'android.permission.READ_CONTACTS',
      'android.permission.READ_SMS',
      'android.permission.SEND_SMS',
      'android.permission.READ_CALL_LOG',
      'android.permission.RECORD_AUDIO',
    ],
  },
  utility: {
    id: 'utility',
    nameVi: 'Tiện ích hệ thống (Utilities)',
    description: 'Ghi chú, lịch, đồng hồ báo thức, quản lý pin',
    allowedPermissions: [
      'android.permission.VIBRATE',
      'android.permission.WAKE_LOCK',
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.RECEIVE_BOOT_COMPLETED',
      'android.permission.POST_NOTIFICATIONS',
    ],
    riskyPermissions: [
      'android.permission.READ_CONTACTS',
      'android.permission.READ_SMS',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.RECORD_AUDIO',
      'android.permission.READ_CALL_LOG',
    ],
  },
  gaming: {
    id: 'gaming',
    nameVi: 'Trò chơi di động (Gaming)',
    description: 'Game giải trí 2D/3D',
    allowedPermissions: [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.VIBRATE',
      'android.permission.WAKE_LOCK',
    ],
    riskyPermissions: [
      'android.permission.READ_CONTACTS',
      'android.permission.READ_SMS',
      'android.permission.SEND_SMS',
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.READ_CALL_LOG',
      'android.permission.RECORD_AUDIO',
    ],
  },
};

export interface PermissionDefinition {
  shortName: string;
  isDangerous: boolean;
  categoryDesc: string;
  generalRisk: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const ANDROID_PERMISSIONS_DB: Record<string, PermissionDefinition> = {
  'android.permission.CAMERA': {
    shortName: 'CAMERA',
    isDangerous: true,
    categoryDesc: 'Truy cập máy ảnh thiết bị để chụp ảnh hoặc quay video',
    generalRisk: 'MEDIUM',
  },
  'android.permission.READ_CONTACTS': {
    shortName: 'READ_CONTACTS',
    isDangerous: true,
    categoryDesc: 'Đọc toàn bộ danh bạ điện thoại, tên, email và số liên lạc cá nhân',
    generalRisk: 'HIGH',
  },
  'android.permission.WRITE_CONTACTS': {
    shortName: 'WRITE_CONTACTS',
    isDangerous: true,
    categoryDesc: 'Sửa đổi, thêm mới hoặc xóa liên hệ trong danh bạ',
    generalRisk: 'HIGH',
  },
  'android.permission.READ_SMS': {
    shortName: 'READ_SMS',
    isDangerous: true,
    categoryDesc: 'Đọc tin nhắn SMS riêng tư, bao gồm mã OTP ngân hàng và tin nhạy cảm',
    generalRisk: 'HIGH',
  },
  'android.permission.SEND_SMS': {
    shortName: 'SEND_SMS',
    isDangerous: true,
    categoryDesc: 'Gửi tin nhắn SMS tự động, có thể gây phát sinh cước phí người dùng',
    generalRisk: 'HIGH',
  },
  'android.permission.RECEIVE_SMS': {
    shortName: 'RECEIVE_SMS',
    isDangerous: true,
    categoryDesc: 'Bắt và chặn tin nhắn SMS đến từ nhà mạng và các tổ chức tài chính',
    generalRisk: 'HIGH',
  },
  'android.permission.ACCESS_FINE_LOCATION': {
    shortName: 'ACCESS_FINE_LOCATION',
    isDangerous: true,
    categoryDesc: 'Định vị GPS chính xác tọa độ vị trí của người dùng trong thời gian thực',
    generalRisk: 'HIGH',
  },
  'android.permission.ACCESS_COARSE_LOCATION': {
    shortName: 'ACCESS_COARSE_LOCATION',
    isDangerous: true,
    categoryDesc: 'Định vị vị trí tương đối thông qua trạm phát sóng di động hoặc Wi-Fi',
    generalRisk: 'MEDIUM',
  },
  'android.permission.ACCESS_BACKGROUND_LOCATION': {
    shortName: 'ACCESS_BACKGROUND_LOCATION',
    isDangerous: true,
    categoryDesc: 'Theo dõi vị trí liên tục ngay cả khi app đang đóng hoặc chạy ngầm',
    generalRisk: 'HIGH',
  },
  'android.permission.RECORD_AUDIO': {
    shortName: 'RECORD_AUDIO',
    isDangerous: true,
    categoryDesc: 'Ghi âm âm thanh qua micro của thiết bị',
    generalRisk: 'HIGH',
  },
  'android.permission.READ_PHONE_STATE': {
    shortName: 'READ_PHONE_STATE',
    isDangerous: true,
    categoryDesc: 'Đọc số điện thoại, IMEI, thông tin mạng di động và trạng thái cuộc gọi',
    generalRisk: 'HIGH',
  },
  'android.permission.READ_CALL_LOG': {
    shortName: 'READ_CALL_LOG',
    isDangerous: true,
    categoryDesc: 'Đọc lịch sử cuộc gọi đến, gọi đi và cuộc gọi nhỡ kèm thời gian',
    generalRisk: 'HIGH',
  },
  'android.permission.WRITE_CALL_LOG': {
    shortName: 'WRITE_CALL_LOG',
    isDangerous: true,
    categoryDesc: 'Sửa đổi lịch sử cuộc gọi trên điện thoại',
    generalRisk: 'HIGH',
  },
  'android.permission.READ_EXTERNAL_STORAGE': {
    shortName: 'READ_EXTERNAL_STORAGE',
    isDangerous: true,
    categoryDesc: 'Đọc tài liệu, hình ảnh và tập tin cá nhân trong bộ nhớ máy',
    generalRisk: 'MEDIUM',
  },
  'android.permission.WRITE_EXTERNAL_STORAGE': {
    shortName: 'WRITE_EXTERNAL_STORAGE',
    isDangerous: true,
    categoryDesc: 'Ghi hoặc chỉnh sửa tập tin trên thẻ nhớ hoặc bộ nhớ ngoài',
    generalRisk: 'MEDIUM',
  },
  'android.permission.INTERNET': {
    shortName: 'INTERNET',
    isDangerous: false,
    categoryDesc: 'Mở kết nối mạng Internet để trao đổi dữ liệu với máy chủ',
    generalRisk: 'LOW',
  },
  'android.permission.ACCESS_NETWORK_STATE': {
    shortName: 'ACCESS_NETWORK_STATE',
    isDangerous: false,
    categoryDesc: 'Kiểm tra trạng thái kết nối Wi-Fi hoặc dữ liệu di động',
    generalRisk: 'LOW',
  },
  'android.permission.ACCESS_WIFI_STATE': {
    shortName: 'ACCESS_WIFI_STATE',
    isDangerous: false,
    categoryDesc: 'Xem thông tin về mạng Wi-Fi hiện đang kết nối',
    generalRisk: 'LOW',
  },
  'android.permission.VIBRATE': {
    shortName: 'VIBRATE',
    isDangerous: false,
    categoryDesc: 'Điều khiển bộ rung của điện thoại để phản hồi rung hoặc thông báo',
    generalRisk: 'LOW',
  },
  'android.permission.WAKE_LOCK': {
    shortName: 'WAKE_LOCK',
    isDangerous: false,
    categoryDesc: 'Ngăn điện thoại chuyển sang chế độ ngủ màn hình',
    generalRisk: 'LOW',
  },
  'android.permission.FLASHLIGHT': {
    shortName: 'FLASHLIGHT',
    isDangerous: false,
    categoryDesc: 'Điều khiển đèn pin LED trên thiết bị',
    generalRisk: 'LOW',
  },
  'android.permission.POST_NOTIFICATIONS': {
    shortName: 'POST_NOTIFICATIONS',
    isDangerous: false,
    categoryDesc: 'Gửi thông báo đẩy đến thanh trạng thái của người dùng',
    generalRisk: 'LOW',
  },
  'android.permission.ACTIVITY_RECOGNITION': {
    shortName: 'ACTIVITY_RECOGNITION',
    isDangerous: true,
    categoryDesc: 'Nhận biết vận động thể chất: đi bộ, chạy, đạp xe',
    generalRisk: 'MEDIUM',
  },
  'android.permission.BODY_SENSORS': {
    shortName: 'BODY_SENSORS',
    isDangerous: true,
    categoryDesc: 'Đọc dữ liệu từ cảm biến sinh trắc học trên cơ thể như nhịp tim',
    generalRisk: 'HIGH',
  },
  'android.permission.SYSTEM_ALERT_WINDOW': {
    shortName: 'SYSTEM_ALERT_WINDOW',
    isDangerous: true,
    categoryDesc: 'Hiển thị cửa sổ nổi đè lên trên các ứng dụng khác (Overlay)',
    generalRisk: 'HIGH',
  },
  // Fix #3 & #6: Các quyền còn thiếu trong DB gốc — khi thiếu sẽ fallback sai về LOW
  'android.permission.PROCESS_OUTGOING_CALLS': {
    shortName: 'PROCESS_OUTGOING_CALLS',
    isDangerous: true,
    categoryDesc: 'Chặn hoặc chuyển hướng cuộc gọi ra ngoài, có thể theo dõi toàn bộ hoạt động gọi điện',
    generalRisk: 'HIGH',
  },
  'android.permission.READ_MEDIA_AUDIO': {
    shortName: 'READ_MEDIA_AUDIO',
    isDangerous: true,
    categoryDesc: 'Đọc các file âm thanh (nhạc, podcast, ghi âm) trong bộ nhớ thiết bị',
    generalRisk: 'MEDIUM',
  },
  'android.permission.READ_MEDIA_VIDEO': {
    shortName: 'READ_MEDIA_VIDEO',
    isDangerous: true,
    categoryDesc: 'Đọc các file video trong bộ nhớ thiết bị',
    generalRisk: 'MEDIUM',
  },
  'android.permission.MANAGE_EXTERNAL_STORAGE': {
    shortName: 'MANAGE_EXTERNAL_STORAGE',
    isDangerous: true,
    categoryDesc: 'Toàn quyền quản lý bộ nhớ ngoài, kể cả xóa và sửa file của các ứng dụng khác',
    generalRisk: 'HIGH',
  },
  'android.permission.USE_BIOMETRIC': {
    shortName: 'USE_BIOMETRIC',
    isDangerous: true,
    categoryDesc: 'Truy cập cảm biến vân tay, nhận diện khuôn mặt hoặc các sinh trắc học khác để xác thực',
    generalRisk: 'HIGH',
  },
  'android.permission.USE_FINGERPRINT': {
    shortName: 'USE_FINGERPRINT',
    isDangerous: true,
    categoryDesc: 'Sử dụng đầu đọc vân tay để xác thực danh tính người dùng (API cũ, thay bằng USE_BIOMETRIC)',
    generalRisk: 'HIGH',
  },
  'android.permission.REQUEST_INSTALL_PACKAGES': {
    shortName: 'REQUEST_INSTALL_PACKAGES',
    isDangerous: true,
    categoryDesc: 'Cho phép ứng dụng cài đặt APK từ nguồn ngoài chợ ứng dụng, nguy cơ phát tán mã độc',
    generalRisk: 'HIGH',
  },
  'android.permission.BLUETOOTH_SCAN': {
    shortName: 'BLUETOOTH_SCAN',
    isDangerous: true,
    categoryDesc: 'Quét và phát hiện các thiết bị Bluetooth lân cận, có thể tiết lộ vị trí vật lý người dùng',
    generalRisk: 'MEDIUM',
  },
  'android.permission.BLUETOOTH_CONNECT': {
    shortName: 'BLUETOOTH_CONNECT',
    isDangerous: true,
    categoryDesc: 'Kết nối tới các thiết bị Bluetooth đã ghép đôi',
    generalRisk: 'MEDIUM',
  },
  'android.permission.BIND_ACCESSIBILITY_SERVICE': {
    shortName: 'BIND_ACCESSIBILITY_SERVICE',
    isDangerous: true,
    categoryDesc: 'Đăng ký dịch vụ trợ năng có thể theo dõi toàn bộ thao tác, nội dung màn hình và phím bấm',
    generalRisk: 'HIGH',
  },
  'android.permission.RECEIVE_BOOT_COMPLETED': {
    shortName: 'RECEIVE_BOOT_COMPLETED',
    isDangerous: false,
    categoryDesc: 'Cho phép ứng dụng khởi động tự động ngay khi thiết bị được bật nguồn',
    generalRisk: 'LOW',
  },
  'android.permission.CHANGE_NETWORK_STATE': {
    shortName: 'CHANGE_NETWORK_STATE',
    isDangerous: false,
    categoryDesc: 'Thay đổi trạng thái kết nối mạng như bật/tắt Wi-Fi hoặc dữ liệu di động',
    generalRisk: 'LOW',
  },
  'android.permission.FOREGROUND_SERVICE': {
    shortName: 'FOREGROUND_SERVICE',
    isDangerous: false,
    categoryDesc: 'Chạy dịch vụ nền liên tục được hiển thị qua thông báo cố định trên thanh trạng thái',
    generalRisk: 'LOW',
  },
  'android.permission.READ_PHONE_NUMBERS': {
    shortName: 'READ_PHONE_NUMBERS',
    isDangerous: true,
    categoryDesc: 'Đọc số điện thoại của SIM đang cắm vào thiết bị',
    generalRisk: 'HIGH',
  },
  'android.permission.ANSWER_PHONE_CALLS': {
    shortName: 'ANSWER_PHONE_CALLS',
    isDangerous: true,
    categoryDesc: 'Tự động nghe cuộc gọi đến mà không cần người dùng chấp nhận — nguy hiểm cao',
    generalRisk: 'HIGH',
  },
  // Android 13+ scoped media permissions — READ_MEDIA_IMAGES còn thiếu, khi thiếu fallback sai về isDangerous=false
  'android.permission.READ_MEDIA_IMAGES': {
    shortName: 'READ_MEDIA_IMAGES',
    isDangerous: true,
    categoryDesc: 'Đọc ảnh từ thư viện bộ nhớ ngoài (thay thế READ_EXTERNAL_STORAGE trên Android 13+)',
    generalRisk: 'MEDIUM',
  },
};
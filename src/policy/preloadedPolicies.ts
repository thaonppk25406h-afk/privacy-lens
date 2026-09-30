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
    url: 'https://www.tiktok.com/legal/page/row/privacy-policy/vi',
    policyDate: '29/09/2026',
    rawText: `Chính Sách Quyền Riêng Tư
Hiệu lực kể từ ngày 2/6/2025

Chào mừng bạn đến với TikTok. Chính Sách Quyền Riêng Tư này áp dụng cho các dịch vụ TikTok, bao gồm các ứng dụng, trang web, phần mềm và các dịch vụ liên quan của TikTok (“Nền Tảng”). Nền Tảng được cung cấp và kiểm soát bởi TikTok Pte. Ltd., có trụ sở tại 1 Raffles Quay, #26-10, South Tower, Singapore 048583 (“TikTok” hoặc “chúng tôi”).

Chúng tôi cam kết bảo vệ và tôn trọng quyền riêng tư của bạn. Chính Sách Quyền Riêng Tư này giải thích cách chúng tôi thu thập, sử dụng, chia sẻ và xử lý thông tin cá nhân của người dùng và các cá nhân khác. Nếu bạn không đồng ý với chính sách này, bạn không được sử dụng Nền Tảng.


Chúng tôi thu thập thông tin gì
Chúng tôi có thể thu thập những thông tin sau về bạn:

Thông Tin Bạn Cung Cấp
Thông tin tài khoản của bạn. Bạn cung cấp cho chúng tôi thông tin khi bạn đăng ký trên Nền Tảng, bao gồm tên người dùng, mật khẩu, ngày sinh (khi áp dụng), địa chỉ email và/hoặc số điện thoại của bạn, thông tin bạn tiết lộ trong tài khoản người dùng của bạn, và ảnh hoặc video đại diện của bạn.
Nội dung người dùng. Chúng tôi xử lý nội dung bạn tạo trên Nền Tảng, bao gồm hình ảnh, âm thanh và video bạn tải lên hoặc tạo, bình luận, hashtag, phản hồi, đánh giá và phát trực tiếp mà bạn thực hiện và siêu dữ liệu liên quan, chẳng hạn như thời điểm, địa điểm và người tạo nội dung (“Nội Dung Người Dùng”). Ngay cả khi bạn không phải là người dùng, thông tin về bạn có thể xuất hiện trong Nội Dung Người Dùng do người dùng trên Nền Tảng tạo hoặc xuất bản. Chúng tôi thu thập Nội Dung Người Dùng bằng cách tải trước tại thời điểm tạo, nhập hoặc tải lên, bất kể bạn chọn lưu hay tải lên Nội Dung Người Dùng đó, để đề xuất các tùy chọn âm thanh và cung cấp các đề xuất cá nhân hóa khác. Nếu bạn áp dụng hiệu ứng cho Nội Dung Người Dùng của bạn, chúng tôi có thể thu thập phiên bản Nội Dung Người Dùng không bao gồm hiệu ứng.
Tin nhắn. Chúng tôi thu thập thông tin bạn cung cấp khi bạn soạn, gửi hoặc nhận tin nhắn thông qua các chức năng nhắn tin của Nền Tảng và các siêu dữ liệu có liên quan, theo luật hiện hành. Chúng bao gồm các tin nhắn bạn gửi hoặc nhận thông qua chức năng trò chuyện của chúng tôi khi liên lạc với người bán đã bán hàng cho bạn và khi bạn sử dụng trợ lý ảo để mua hàng thông qua Nền Tảng. Thông tin đó bao gồm nội dung tin nhắn và thông tin về tin nhắn, chẳng hạn như thời điểm tin nhắn được gửi, nhận hoặc đọc và người tham gia tin nhắn. Xin lưu ý rằng các tin nhắn mà bạn chọn gửi cho những người dùng khác của Nền Tảng có thể được những người dùng đó truy cập và chúng tôi không chịu trách nhiệm về cách những người dùng đó sử dụng hoặc chia sẻ tin nhắn.
Chúng tôi có thể truy cập nội dung, bao gồm văn bản, hình ảnh và video, được tìm thấy trong bộ nhớ đệm của thiết bị của bạn, với sự cho phép của bạn. Ví dụ: nếu bạn chọn bắt đầu chia sẻ nội dung với nền tảng của bên thứ ba hoặc chọn dán nội dung từ bộ nhớ đệm vào Nền Tảng, chúng tôi truy cập thông tin được lưu trữ trong bộ nhớ đệm để đáp ứng yêu cầu của bạn.
Thông tin mua hàng. Khi bạn mua hàng hoặc thanh toán trên hoặc thông qua Nền Tảng, bao gồm cả khi bạn mua Điểm TikTok hoặc mua hàng hóa thông qua các tính năng mua sắm của chúng tôi, chúng tôi thu thập thông tin về giao dịch mua hoặc thanh toán, chẳng hạn như thông tin thẻ thanh toán, hóa đơn, giao hàng và thông tin liên hệ và các mặt hàng bạn đã mua.
Danh bạ điện thoại và danh bạ mạng xã hội của bạn. Nếu bạn chọn đồng bộ hóa danh bạ điện thoại của mình, chúng tôi sẽ truy cập và thu thập thông tin như tên, số điện thoại và địa chỉ email, đồng thời khớp thông tin đó với những người dùng hiện tại của Nền Tảng. Nếu bạn chọn chia sẻ danh bạ mạng xã hội của mình, chúng tôi sẽ thu thập thông tin hồ sơ công khai của bạn cũng như tên và hồ sơ của những người trong danh bạ mạng xã hội của bạn.
Bằng chứng về danh tính hoặc tuổi của bạn. Đôi khi, chúng tôi yêu cầu bạn cung cấp bằng chứng về danh tính hoặc tuổi để sử dụng một số tính năng nhất định, chẳng hạn như phát trực tiếp hoặc tài khoản đã xác minh, hoặc khi bạn đăng ký Tài Khoản Pro, đảm bảo rằng bạn đủ tuổi để sử dụng Nền Tảng hoặc trong các trường hợp yêu cầu bạn phải xác minh.
Thông tin trong thư từ bạn gửi cho chúng tôi, bao gồm cả khi bạn liên hệ với chúng tôi để được hỗ trợ hoặc phản hồi.
Thông tin thông qua các cuộc khảo sát, nghiên cứu, quảng bá, cuộc thi, chiến dịch tiếp thị, thử thách, thi đấu hoặc sự kiện do chúng tôi tiến hành hoặc tài trợ mà bạn tham gia.
Thông Tin Được Thu Thập Tự Động
Thông Tin Về Việc Sử Dụng. Chúng tôi thu thập thông tin liên quan đến việc bạn sử dụng Nền Tảng, ví dụ, cách bạn tham gia vào Nền Tảng, bao gồm cách bạn tương tác với nội dung mà chúng tôi cung cấp cho bạn, quảng cáo bạn xem, video bạn xem và các vấn đề bạn gặp phải, lịch sử duyệt web và tìm kiếm, nội dung bạn thích, nội dung bạn lưu lại trong “Mục Yêu Thích Của Tôi”, người dùng mà bạn theo dõi và cách bạn tương tác với người theo dõi chung.
Thông Tin Phỏng Đoán. Chúng tôi cũng phỏng đoán các thuộc tính của bạn, bao gồm sở thích, giới tính và độ tuổi của bạn nhằm mục đích cá nhân hóa nội dung.
Thông Tin Kỹ Thuật chúng tôi thu thập về bạn. Chúng tôi thu thập một số thông tin nhất định về thiết bị mà bạn sử dụng để truy cập Nền Tảng, chẳng hạn như địa chỉ IP, chuỗi nhận dạng trình duyệt, nhà mạng, cài đặt múi giờ, mã nhận dạng cho các mục đích quảng cáo, kiểu thiết bị của bạn, hệ thống thiết bị, loại mạng, độ phân giải màn hình và hệ điều hành, tên và loại ứng dụng và tệp, kiểu hoặc nhịp gõ phím, trạng thái pin, cài đặt âm thanh và các thiết bị âm thanh được kết nối. Chúng tôi tự động chỉ định số ID người dùng và số ID thiết bị. Khi bạn đăng nhập từ nhiều thiết bị, chúng tôi sử dụng thông tin của bạn như số ID thiết bị và số ID hồ sơ để xác định hoạt động của bạn trên các thiết bị này. Chúng tôi cũng có thể liên kết bạn với thông tin được thu thập từ các thiết bị ngoài những thiết bị bạn sử dụng để đăng nhập vào Nền Tảng.
Thông Tin Vị Trí. Chúng tôi thu thập thông tin về vị trí gần đúng của bạn, bao gồm thông tin vị trí dựa trên thẻ SIM và/hoặc địa chỉ IP của bạn. Chúng tôi cũng có thể thu thập dữ liệu vị trí chính xác (chẳng hạn như GPS) nếu bạn cho phép. Ngoài ra, chúng tôi thu thập thông tin vị trí (chẳng hạn như các điểm tham quan du lịch, cửa hàng hoặc các địa điểm khác mà bạn quan tâm) nếu bạn chọn thêm thông tin vị trí vào Nội Dung Người Dùng của mình. Nhấp vào <ĐÂY> để tìm hiểu thêm.
Thông Tin Hình Ảnh và Âm Thanh. Chúng tôi có thể thu thập thông tin về video, hình ảnh và âm thanh là một phần Nội Dung Người Dùng của bạn, chẳng hạn như xác định các vật thể và khung cảnh xuất hiện, sự tồn tại và vị trí của khuôn mặt và các đặc điểm và thuộc tính cơ thể trong ảnh, tính chất âm thanh và văn bản ngôn từ được nói trong Nội Dung Người Dùng của bạn. Chúng tôi có thể thu thập thông tin này để kích hoạt các hiệu ứng video đặc biệt, kiểm duyệt nội dung, phân loại nhân khẩu học, đề xuất nội dung và quảng cáo cũng như các hoạt động không nhằm mục đích nhận dạng cá nhân khác. Nhấp vào <ĐÂY> để tìm hiểu thêm.
Cookie. Chúng tôi và các nhà cung cấp dịch vụ và đối tác kinh doanh của chúng tôi sử dụng cookie và các công nghệ tương tự (ví dụ, tập tin chỉ báo (web beacon), flash cookie, v.v.) (“Cookie”) để tự động thu thập thông tin, đo lường và phân tích cách bạn sử dụng Nền Tảng, bao gồm những trang bạn thường xem nhất và cách bạn tương tác với nội dung, nâng cao trải nghiệm của bạn trong việc sử dụng Nền Tảng, cải thiện Nền Tảng, cung cấp cho bạn quảng cáo trong và ngoài nền tảng, và đo lường hiệu quả của quảng cáo và nội dung khác. Chúng tôi và các đối tác của chúng tôi cũng sử dụng Cookie để quảng bá Nền Tảng trên các nền tảng và trang web khác. Cookie cho phép Nền Tảng cung cấp một số tính năng và chức năng nhất định. Tập tin chỉ báo là các hình ảnh rất nhỏ hoặc các mẫu dữ liệu nhỏ được nhúng vào hình ảnh, còn được gọi là “thẻ pixel” hoặc “clear GIF”, mà có thể nhận dạng Cookie, thời gian và ngày tháng khi một trang được xem, mô tả của trang khi thẻ pixel được đặt, và các thông tin tương tự từ máy tính hoặc thiết bị của bạn. Để tìm hiểu cách tắt một số Cookie nhất định, hãy xem phần “Quyền và lựa chọn của bạn” dưới đây.
Thông Tin Từ Các Nguồn Khác
Chúng tôi có thể nhận thông tin được mô tả trong Chính Sách Quyền Riêng Tư này từ các nguồn khác, chẳng hạn như:

Nếu bạn chọn đăng ký hoặc sử dụng Nền Tảng bằng cách sử dụng thông tin tài khoản trên mạng xã hội của bên thứ ba (ví dụ, Apple, Facebook hoặc Google) hoặc dịch vụ đăng nhập, bạn sẽ cung cấp cho chúng tôi hoặc cho phép cung cấp cho chúng tôi tên người dùng, hồ sơ công khai và các thông tin khác có thể liên quan đến tài khoản đó. Chúng tôi theo đó cũng sẽ chia sẻ một số thông tin nhất định với mạng xã hội của bạn chẳng hạn như ID ứng dụng, mã thông báo truy cập và đường dẫn (URL) liên kết. Nếu bạn liên kết tài khoản TikTok của mình với một dịch vụ khác, chúng tôi có thể nhận được thông tin về việc sử dụng dịch vụ đó của bạn.
Các nhà quảng cáo, nhà phát hành và đối tác đo lường và các đối tác khác chia sẻ với chúng tôi thông tin về bạn và các hành động bạn đã thực hiện bên ngoài Nền Tảng, chẳng hạn như hoạt động của bạn trên các trang web và ứng dụng khác hoặc trong cửa hàng, bao gồm các sản phẩm hoặc dịch vụ bạn đã mua, trực tuyến hoặc trực tiếp. Các đối tác này cũng chia sẻ thông tin với chúng tôi, chẳng hạn như mã nhận dạng thiết bị di động cho mục đích quảng cáo, thông tin thiết bị, địa chỉ email và số điện thoại được mã hóa, mã nhận dạng cookie, thông tin về các lượt tương tác của bạn với quảng cáo và sự kiện chuyển đổicũng như biện pháp can thiệp liên quan đến tùy chỉnh và đặc điểm. Chúng tôi sử dụng các thông tin này để khớp bạn và các hành động của bạn bên ngoài Nền Tảng với tài khoản TikTok của bạn và để cá nhân hóa những quảng cáo mà bạn sẽ nhìn thấy trong và ngoài nền tảng. Một số nhà quảng cáo và đối tác khác của chúng tôi cho phép chúng tôi thu thập thông tin tương tự trực tiếp từ trang web hoặc ứng dụng của họ bằng cách tích hợp Công Cụ Quảng Cáo TikTok của chúng tôi.
Chúng tôi có thể thu thập thông tin về bạn từ một số đơn vị liên kết trong tập đoàn của chúng tôi, bao gồm các hoạt động của bạn trên nền tảng của họ.
Chúng tôi có thể nhận thông tin về bạn từ những bên khác, bao gồm trường hợp bạn được đưa vào hoặc đề cập trong Nội Dung Người Dùng, tin nhắn trực tiếp, trong khiếu nại, kháng nghị, yêu cầu hoặc phản hồi được gửi cho chúng tôi hoặc nếu thông tin liên hệ của bạn được cung cấp cho chúng tôi. Chúng tôi có thể thu thập thông tin về bạn từ những nguồn công khai khác.
Chúng tôi có thể nhận thông tin về bạn từ các người bán và các nhà cung cấp dịch vụ thanh toán và hoàn tất giao dịch, chẳng hạn như chi tiết xác nhận thanh toán và thông tin về việc giao sản phẩm bạn đã mua thông qua các tính năng mua sắm của chúng tôi.
Cách chúng tôi sử dụng thông tin của bạn
Như được giải thích dưới đây, chúng tôi sử dụng thông tin của bạn để cải thiện, hỗ trợ và quản lý Nền Tảng, cho phép bạn sử dụng các chức năng của Nền Tảng, đồng thời thực hiện và thực thi Điều Khoản Dịch Vụ của chúng tôi. Chúng tôi cũng có thể sử dụng thông tin của bạn để cá nhân hóa nội dung bạn thấy trên Nền Tảng, quảng bá Nền Tảng và cá nhân hóa trải nghiệm quảng cáo trong và ngoài nền tảng của bạn, cùng với các mục đích khác. Chúng tôi thường sử dụng thông tin chúng tôi thu thập được theo những cách sau:

Để đáp ứng các yêu cầu về sản phẩm, dịch vụ, chức năng Nền Tảng, hỗ trợ và thông tin cho các hoạt động nội bộ, bao gồm các mục đích về khắc phục sự cố, phân tích dữ liệu, thử nghiệm, nghiên cứu, thống kê và khảo sát và lấy ý kiến phản hồi của bạn.
Để cung cấp các tính năng mua sắm của chúng tôi và tạo thuận lợi cho việc mua và giao sản phẩm, hàng hóa và dịch vụ, bao gồm chia sẻ thông tin của bạn với các người bán, nhà cung cấp dịch vụ thanh toán và hoàn tất giao dịch và các nhà cung cấp dịch vụ khác để xử lý đơn hàng của bạn.
Để cá nhân hóa nội dung bạn thấy khi sử dụng Nền Tảng. Ví dụ: chúng tôi có thể cung cấp cho bạn các dịch vụ dựa trên cài đặt quốc gia mà bạn đã chọn hoặc hiển thị cho bạn nội dung tương tự như nội dung mà bạn đã thích hoặc tương tác. Nhấp vào <ĐÂY> để tìm hiểu thêm về hệ thống đề xuất.
Gửi tài liệu quảng bá từ chúng tôi hoặc thay mặt cho đơn vị liên kết của chúng tôi và các bên thứ ba đáng tin cậy, bao gồm thông qua tin nhắn tức thời hoặc email.
Để cải thiện và phát triển Nền Tảng của chúng tôi và tiến hành phát triển sản phẩm.
Để đo lường và biết được hiệu quả của các quảng cáo và nội dung khác mà chúng tôi gửi cho bạn và những người khác, và cung cấp quảng cáo cho bạn trên và ngoài Nền Tảng, bao gồm quảng cáo cá nhân hóa.
Để tiến hành phân tích nhằm hỗ trợ các nhà sáng tạo nội dung, nhà quảng cáo, đối tác và người bán có thể nắm được mức độ hiệu quả của nội dung, quảng cáo hoặc sản phẩm của mình và hiểu rõ hơn tâm lý người xem và người mua.
Để hỗ trợ các chức năng xã hội của Nền Tảng, bao gồm cho phép bạn và những người khác kết nối với nhau (ví dụ: thông qua chức năng Tìm Bạn Bè của chúng tôi) và chia sẻ xem bạn có đang hoạt động trên Nền Tảng hay không (và thông tin khác mà bạn chọn chia sẻ) với bạn bè của bạn, cung cấp dịch vụ nhắn tin của chúng tôi nếu bạn chọn sử dụng chức năng này, đề xuất tài khoản cho bạn và đề xuất tài khoản của bạn cho những người khác, và để bạn và những người khác chia sẻ, tải xuống và tương tác với Nội Dung Người Dùng được đăng thông qua Nền Tảng.
Để cho phép bạn tham gia vào chương trình vật phẩm ảo.
Để cho phép bạn tham gia vào các tính năng tương tác của Nền Tảng, chẳng hạn như cho phép nội dung của bạn được sử dụng trong video của người dùng khác.
Để sử dụng Nội Dung Người Dùng trong các chiến dịch quảng cáo và tiếp thị của chúng tôi để quảng bá Nền Tảng, mời bạn tham gia sự kiện và quảng bá các chủ đề, hashtag và chiến dịch phổ biến trên Nền Tảng.
Để hiểu được cách bạn sử dụng Nền Tảng, bao gồm cả trên các thiết bị của bạn.
Để xác định thông tin bổ sung về bạn, chẳng hạn như độ tuổi, giới tính và sở thích của bạn.
Để giúp chúng tôi phát hiện và chống lại hành vi lạm dụng, hoạt động gây hại, lừa đảo, gửi thư rác, và hoạt động bất hợp pháp trên Nền Tảng.
Để đảm bảo nội dung được trình bày theo cách hiệu quả nhất cho bạn và thiết bị của bạn.
Để tăng cường tính an toàn, bảo mật của Nền Tảng, bao gồm bằng cách sàng lọc, phân tích và xem xét Nội Dung Người Dùng, tin nhắn và siêu dữ liệu liên quan nhằm phát hiện những vi phạm đối với Điều Khoản Dịch Vụ, Nguyên Tắc Cộng Đồng hoặc các điều kiện và chính sách khác của chúng tôi. Nhấp vào <ĐÂY> để tìm hiểu thêm về cách chúng tôi giữ an toàn cho cộng đồng.
Để tạo điều kiện thuận lợi cho việc nghiên cứu được tiến hành bởi các nghiên cứu viên độc lập đáp ứng các tiêu chí nhất định.
Để xác minh danh tính hoặc tuổi của bạn.
Để liên lạc với bạn, bao gồm thông báo cho bạn về những thay đổi trong các dịch vụ của chúng tôi.
Để thông báo bạn là người chiến thắng trong các cuộc thi hoặc chương trình khuyến mãi của chúng tôi nếu được phép theo quy tắc khuyến mãi và gửi cho bạn giải thưởng liên quan.
Để thực thi Điều Khoản Dịch Vụ, Nguyên Tắc Cộng Đồng và các điều kiện và chính sách khác của chúng tôi.
Để cung cấp cho bạn các dịch vụ dựa trên vị trí, chẳng hạn như quảng cáo và nội dung được cá nhân hóa khác, phù hợp với sự cho phép của bạn.
Để đào tạo và cải thiện công nghệ của chúng tôi, chẳng hạn như các mô hình và thuật toán máy học của chúng tôi.
Để tạo điều kiện và hoàn tất giao dịch bán hàng, quảng bá và mua hàng hóa và dịch vụ và cung cấp hỗ trợ người dùng.
Để bảo vệ Nền Tảng và bảo vệ quyền pháp lý và lợi ích thương mại của chúng tôi, cũng như của các bên liên quan, người dùng và công chúng.
Cách chúng tôi chia sẻ thông tin của bạn
Chúng tôi chia sẻ thông tin của bạn với các bên sau đây:

Đối Tác Kinh Doanh
Nếu bạn chọn đăng ký sử dụng Nền Tảng bằng cách sử dụng chi tiết tài khoản mạng xã hội của bạn (ví dụ, Apple, Facebook hoặc Google), bạn sẽ cung cấp cho chúng tôi hoặc cho phép mạng xã hội của bạn cung cấp cho chúng tôi số điện thoại, địa chỉ email, tên người dùng và hồ sơ công khai của bạn. Chúng tôi theo đó cũng sẽ chia sẻ một số thông tin nhất định với mạng xã hội tương ứng chẳng hạn như ID ứng dụng, mã thông báo truy cập và đường dẫn (URL) liên kết của bạn. Nếu bạn chọn cho phép dịch vụ của bên thứ ba truy cập vào tài khoản của mình, chúng tôi sẽ chia sẻ một số thông tin nhất định về bạn với bên thứ ba, ví dụ như cho phép người bán xem và quản lý đơn đặt hàng của bạn thông qua tính năng mua sắm của chúng tôi và cho phép các nền tảng và đối tác bên thứ ba xác minh người dùng hiệu quả hơn. Tùy thuộc vào quyền bạn cấp, bên thứ ba có thể lấy thông tin tài khoản của bạn và các thông tin khác mà bạn chọn cung cấp.

Khi bạn chọn chia sẻ nội dung trên các nền tảng truyền thông xã hội, thì video, tên người dùng và văn bản kèm theo sẽ được chia sẻ trên nền tảng đó hoặc liên kết đến nội dung sẽ được chia sẻ trong trường hợp chia sẻ qua các nền tảng nhắn tin nhanh. Chúng tôi chia sẻ số liệu thống kê tổng hợp và thông tin chuyên sâu với người dùng từ dịch vụ phân tích của chúng tôi để hỗ trợ họ hiểu rõ hơn cách mọi người đang liên kết với Nền Tảng hoặc với quảng cáo mà chúng tôi cho họ xem. Ví dụ, các nhà quảng cáo, nhà sáng tạo nội dung, đối tác và người bán có thể nhận được thông tin về số lượt xem, số lượt like, số lượt bình luận và số lượt chia sẻ của nội dung của họ cũng như các thông tin để hiểu rõ hơn người theo dõi, người mua và người xem các nội dung của họ.

Nhà Cung Cấp Dịch Vụ
Chúng tôi cung cấp thông tin và nội dung cho nhà cung cấp dịch vụ mà hỗ trợ hoạt động kinh doanh của chúng tôi, chẳng hạn như nhà cung cấp dịch vụ đám mây và nhà cung cấp dịch vụ kiểm duyệt nội dung để đảm bảo Nền Tảng là nơi an toàn và thú vị và nhà cung cấp dịch vụ mà hỗ trợ chúng tôi tiếp thị Nền Tảng.

Bên xử lý thanh toán và nhà cung cấp dịch vụ hoàn tất giao dịch: Nếu bạn chọn mua Điểm hoặc thực hiện giao dịch liên quan đến thanh toán khác, chúng tôi sẽ chia sẻ dữ liệu với nhà cung cấp dịch vụ thanh toán tương ứng để tạo điều kiện thực hiện giao dịch này. Đối với giao dịch Điểm, chúng tôi chia sẻ ID giao dịch để cho phép chúng tôi nhận diện bạn và ghi có vào tài khoản của bạn với giá trị chính xác bằng Điểm khi bạn đã thực hiện thanh toán.
Nhà cung cấp dịch vụ phân tích: Chúng tôi sử dụng nhà cung cấp dịch vụ phân tích để giúp chúng tôi tối ưu hóa và cải thiện Nền Tảng. Nhà cung cấp dịch vụ phân tích bên thứ ba của chúng tôi cũng giúp chúng tôi phân phối các quảng cáo cá nhân hóa.
Nhà Quảng Cáo, Mạng Lưới Quảng Cáo, Nhà Phát Hành và Đối Tác Đo Lường
Chúng tôi chia sẻ thông tin với các nhà quảng cáo, đối tác quản cáo, nhà phát hành và công ty đo lường bên thứ ba để cho họ biết có bao nhiêu người dùng và kiểu người dùng nào của Nền Tảng đã xem hoặc nhấp vào quảng cáo; để giúp các nhà quảng cáo hiểu rõ phản hồi từ người xem và khách hàng về sản phẩm và dịch vụ của họ; và để giúp các nhà phát hành hiểu về loại quảng cáo được sử dụng để họ có thể đo lường hiệu quả vá giá trị của dịch vụ mạng lưới quảng cáo; và để hỗ trợ một số nhà quảng cáo và đối tác quảng cáo nhất định trong việc nắm bắt các cơ hội quảng cáo được pháp luật hiện hành cho phép. Nhấp vào <ĐÂY> để tìm hiểu thêm.



Nghiên Cứu Viên Độc Lập
Chúng tôi chia sẻ thông tin của bạn với các nghiên cứu viên độc lập để tạo điều kiện thực hiện nghiên cứu đáp ứng một số tiêu chí nhất định.

Tập Đoàn của Chúng Tôi
Chúng tôi cũng có thể chia sẻ thông tin của bạn với các thành viên khác, công ty con, hoặc công ty liên kết trong tập đoàn của chúng tôi, bao gồm để cung cấp Nền Tảng, cải thiện và tối ưu hóa Nền Tảng, ngăn chặn việc sử dụng trái pháp luật và hỗ trợ người dùng.

Vì Lý Do Pháp Lý
Chúng tôi sẽ chia sẻ thông tin của bạn với các cơ quan thực thi pháp luật, cơ quan công quyền hoặc các tổ chức khác nếu được pháp luật yêu cầu phải làm như vậy, hoặc nếu việc đó là cần thiết một cách hợp lý để:

tuân thủ nghĩa vụ, quy trình hoặc yêu cầu pháp lý;
thực thi Điều Khoản Dịch Vụ và các thỏa thuận, chính sách, và tiêu chuẩn khác của chúng tôi, bao gồm cả việc điều tra bất kỳ vi phạm nào có thể xảy ra đối với Điều Khoản Dịch Vụ của chúng tôi và các thỏa thuận, chính sách và tiêu chuẩn đó;
phát hiện, ngăn chặn hoặc giải quyết các vấn đề về bảo mật, gian lận hoặc kỹ thuật; hoặc
bảo vệ các quyền, tài sản hoặc sự an toàn của chúng tôi, người dùng của chúng tôi, bên thứ ba hoặc công chúng khi được pháp luật yêu cầu hoặc cho phép (bao gồm cả việc trao đổi thông tin với các công ty và tổ chức khác nhằm mục đích chống lừa đảo và giảm rủi ro tín dụng).
Hồ Sơ Công Khai
Vui lòng lưu ý rằng nếu hồ sơ của bạn ở chế độ công khai, nội dung của bạn có thể được hiển thị cho bất kỳ người nào trên Nền Tảng và có thể được truy cập hoặc chia sẻ bởi bạn bè và người theo dõi của bạn cũng như các bên thứ ba chẳng hạn như công cụ tìm kiếm, bộ tổng hợp nội dung và trang web tin tức. Bạn có thể thay đổi người có thể xem video mỗi khi bạn đăng tải video. Ngoài ra, bạn có thể thay đổi hồ sơ của mình về chế độ riêng tư mặc định bằng cách thay đổi cài đặt của bạn thành ‘Tài Khoản Riêng Tư’ trong phần cài đặt “Quản lý tài khoản của tôi”.

Bán, Sáp Nhập hoặc Giao Dịch Kinh Doanh Khác
Chúng tôi cũng có thể tiết lộ thông tin của bạn cho các bên thứ ba:

nếu chúng tôi bán hoặc mua bất kỳ cơ sở kinh doanh hoặc tài sản nào (cho dù đó là kết quả của việc thanh lý, phá sản hoặc theo cách khác), thì trong trường hợp đó, chúng tôi sẽ tiết lộ dữ liệu của bạn cho bên bán hoặc bên mua tiềm năng của cơ sở kinh doanh hoặc tài sản đó; hoặc
nếu chúng tôi bán, mua, sáp nhập, được mua lại bởi hoặc liên danh với các công ty hoặc doanh nghiệp khác, hoặc bán một số hoặc tất cả tài sản của chúng tôi. Trong các giao dịch đó, thông tin người dùng có thể nằm trong số các tài sản được chuyển nhượng.
Người Bán, Nhà Cung Cấp Dịch Vụ Thanh Toán và Hoàn Tất Giao Dịch và Nhà Cung Cấp Dịch Vụ Khác
Khi bạn mua hàng thông qua các tính năng mua sắm của chúng tôi, chúng tôi chia sẻ thông tin liên quan đến giao dịch với người bán, nhà cung cấp dịch vụ thanh toán và hoàn tất giao dịch và các nhà cung cấp dịch vụ khác. Ví dụ: chúng tôi sẽ chia sẻ các mặt hàng trên đơn hàng, chi tiết liên hệ và thông tin giao hàng để có thể xử lý đơn hàng của bạn. Chúng tôi có thể chia sẻ địa chỉ email của bạn với những người bán này để họ có thể liên hệ với bạn nhằm mục đích tiếp thị. Các đơn vị này có thể sử dụng thông tin được chia sẻ theo chính sách quyền riêng tư của họ.

Chúng tôi lưu trữ thông tin của bạn ở đâu
Thông tin của bạn có thể được lưu trữ trên các máy chủ ở bên ngoài quốc gia nơi bạn sống, chẳng hạn như ở Singapore, Malaysia, Ireland và Hoa Kỳ. Chúng tôi duy trì các máy chủ lớn trên toàn thế giới để mang đến cho bạn các dịch vụ của chúng tôi một cách liên tục trên phạm vi toàn cầu.

Quyền và lựa chọn của bạn
Bạn có các quyền và lựa chọn liên quan đến thông tin của mình. Bạn có thể được cung cấp một số quyền nhất định theo luật hiện hành, các quyền này có thể bao gồm quyền truy cập, xóa, cập nhật hoặc chỉnh sửa dữ liệu của bạn, sẽ được thông báo về việc xử lý dữ liệu của bạn, nộp đơn khiếu nại lên các cơ quan chức năng, và các quyền khác. Bạn có thể gửi yêu cầu thực hiện các quyền của mình theo luật hiện hành tại https://www.tiktok.com/legal/report/privacy. Bạn có thể kháng nghị bất kỳ quyết định nào chúng tôi đã đưa ra về yêu cầu của bạn bằng cách làm theo hướng dẫn trong thông tin liên lạc bạn nhận được từ chúng tôi thông báo cho bạn về quyết định của chúng tôi. Vui lòng xem thêm các Điều Khoản Bổ Sung để biết liệu quốc gia của bạn có người đại diện tại địa phương hoặc người liên hệ tại địa phương hay không.

Bạn có thể truy cập và chỉnh sửa hầu hết thông tin tài khoản của mình bằng cách đăng nhập vào TikTok. Bạn có thể xóa Nội Dung Người Dùng bạn đã đăng tải. Chúng tôi cũng cung cấp một số công cụ trong Cài Đặt để cho phép bạn kiểm soát người có thể xem video của bạn, gửi tin nhắn cho bạn, hoặc đăng tải bình luận lên video của bạn, trong số những tính năng khác. Bạn có thể xóa toàn bộ tài khoản của mình trong Cài Đặt nếu bạn lựa chọn như vậy.

Bạn có thể từ chối hoặc vô hiệu hóa Cookie bằng cách điều chỉnh cài đặt trong trình duyệt trên thiết bị của mình. Vì mỗi trình duyệt sẽ khác nhau, hãy tham khảo hướng dẫn do trình duyệt của bạn cung cấp. Xin lưu ý rằng bạn có thể cần thực hiện các bước bổ sung để từ chối hoặc vô hiệu hóa một số loại Cookie. Chẳng hạn, do sự khác biệt về cách hoạt động của trình duyệt và ứng dụng di động, bạn có thể cần thực hiện các bước khác nhau để chọn từ chối các Cookie dùng cho quảng cáo nhắm mục tiêu trong trình duyệt và từ chối quảng cáo nhắm mục tiêu cho ứng dụng di động, điều mà bạn có thể kiểm soát thông qua cài đặt thiết bị của mình hoặc quyền ứng dụng dành cho thiết bị di động. Ngoài ra, lựa chọn từ chối của bạn chỉ áp dụng riêng cho trình duyệt hoặc thiết bị cụ thể mà bạn đang sử dụng khi chọn từ chối, vì vậy bạn có thể phải chọn từ chối cho từng trình duyệt hoặc thiết bị. Nếu bạn chọn từ chối, vô hiệu hóa hoặc xóa Cookie, một số chức năng của Nền Tảng có thể không còn khả dụng với bạn.

Bảo mật thông tin của bạn
Chúng tôi thực hiện các biện pháp để đảm bảo thông tin của bạn được xử lý một cách an toàn và phù hợp với chính sách này. Thật không may, việc truyền tải thông tin qua internet không tuyệt đối an toàn. Mặc dù chúng tôi sẽ áp dụng biện pháp hợp lý để bảo vệ dữ liệu cá nhân của bạn, ví dụ như, bằng mã hóa, nhưng chúng tôi không thể đảm bảo an toàn cho thông tin của bạn được truyền thông qua Nền Tảng; bạn phải chịu rủi ro đối với bất kỳ việc truyền thông tin nào.

Chúng tôi có các biện pháp thích hợp về kỹ thuật và tổ chức để đảm bảo mức độ bảo mật phù hợp với rủi ro có khả năng xảy ra khác nhau và mức độ nghiêm trọng đối với các quyền và quyền tự do của bạn và những người dùng khác. Chúng tôi duy trì các biện pháp tổ chức và kỹ thuật này và sẽ sửa đổi các biện pháp này tùy từng thời điểm để cải thiện tính bảo mật tổng thể của hệ thống của chúng tôi.

Chúng tôi sẽ, tùy từng thời điểm, đưa vào các liên kết đến và từ trang web của các mạng lưới đối tác, nhà quảng cáo và bên liên kết của chúng tôi. Nếu bạn theo một liên kết đến bất kỳ trang web nào trong số những trang web này, xin lưu ý rằng các trang web này có chính sách quyền riêng tư của riêng họ và rằng chúng tôi không chịu bất kỳ trách nhiệm hoặc nghĩa vụ pháp lý nào đối với các chính sách này. Vui lòng kiểm tra các chính sách này trước khi bạn cung cấp bất kỳ thông tin nào lên các trang web này.

Chúng tôi lưu giữ thông tin của bạn trong bao lâu
Chúng tôi lưu giữ thông tin trong khoảng thời gian cần thiết để cung cấp Nền Tảng và cho các mục đích khác được nêu trong Chính Sách Quyền Riêng Tư này. Chúng tôi cũng lưu giữ thông tin khi cần thiết để tuân thủ các nghĩa vụ theo hợp đồng và nghĩa vụ pháp lý, khi chúng tôi có lợi ích kinh doanh hợp pháp đối với việc lưu giữ đó (chẳng hạn như cải thiện và phát triển Nền Tảng, và tăng cường sự an toàn, bảo mật và ổn định của Nền Tảng), và để thực thi hoặc biện hộ các khiếu nại pháp lý.

Thời gian lưu giữ khác nhau tùy thuộc vào các tiêu chí khác nhau, chẳng hạn như loại thông tin và mục đích mà chúng tôi sử dụng thông tin. Ví dụ: khi chúng tôi xử lý thông tin của bạn, chẳng hạn như thông tin tài khoản của bạn để cung cấp Nền Tảng cho bạn, chúng tôi sẽ lưu giữ thông tin này chừng nào bạn còn có tài khoản. Nếu bạn vi phạm Điều Khoản Dịch Vụ, Nguyên Tắc Cộng Đồng của chúng tôi hoặc các điều kiện hoặc chính sách khác, chúng tôi có thể ngay lập tức xóa tài khoản của bạn khỏi Nền Tảng hoặc xóa Nội Dung Người Dùng của bạn khỏi chế độ xem công khai, nhưng có thể lưu giữ thông tin khác về bạn để xử lý vi phạm.

Thông tin liên quan đến trẻ em và thiếu niên
TikTok không dành cho trẻ em dưới 13 tuổi. Trong một số trường hợp nhất định thì độ tuổi này có thể cao hơn do các yêu cầu theo quy định địa phương, vui lòng xem các điều khoản bổ sung ở địa phương của bạn để biết thêm thông tin. Nếu bạn tin rằng có người dùng ở dưới độ tuổi tối thiểu này, vui lòng liên hệ với chúng tôi tại https://www.tiktok.com/legal/report/privacy.

Nếu bạn là cha mẹ hoặc người giám hộ, vui lòng tham khảo Hướng Dẫn Cho Người Giám Hộ của chúng tôi để biết các thông tin và tài nguyên giúp bạn hiểu về Nền Tảng cũng như các công cụ và biện pháp kiểm soát mà bạn có thể sử dụng.

Cập Nhật Chính Sách Quyền Riêng Tư
Chúng tôi có thể cập nhật Chính Sách Quyền Riêng Tư này tùy từng thời điểm. Khi chúng tôi cập nhật Chính Sách Quyền Riêng Tư, chúng tôi sẽ thông báo cho bạn bằng cách cập nhật ngày “Cập Nhật Lần Cuối” ở phần đầu của chính sách này và đăng tải Chính Sách Quyền Riêng Tư mới hoặc cung cấp bất kỳ thông báo nào khác theo yêu cầu của luật hiện hành. Việc bạn tiếp tục truy cập hoặc sử dụng Nền Tảng sau ngày chính sách được cập nhật được xem là sự chấp nhận của bạn đối với chính sách được cập nhật. Nếu bạn không đồng ý với chính sách được cập nhật, bạn phải dừng việc truy cập hoặc sử dụng Nền Tảng.

Liên hệ
Mọi câu hỏi, bình luận, khiếu nại và yêu cầu liên quan đến Chính Sách Quyền Riêng Tư này xin gửi về địa chỉ: https://www.tiktok.com/legal/report/privacy

Vui lòng xem thêm các điều khoản bổ sung dưới đây để biết liệu quốc gia của bạn có người đại diện tại địa phương hoặc người liên hệ tại địa phương hay không.

Chúng tôi sẽ nỗ lực giải quyết yêu cầu của bạn trong thời gian sớm nhất. Điều này không ảnh hưởng đến quyền khiếu nại của bạn với cơ quan bảo vệ dữ liệu thích hợp, nếu áp dụng.

Điều Khoản Bổ Sung – Khu Vực Pháp Lý Cụ Thể
Trong trường hợp có mâu thuẫn giữa các quy định của Điều Khoản Bổ Sung – Khu Vực Pháp Lý Cụ Thể có liên quan đến khu vực pháp lý của bạn là nơi bạn truy cập hoặc sử dụng dịch vụ, và phần quy định còn lại của chính sách, thì Điều Khoản Bổ Sung – Khu Vực Pháp Lý Cụ Thể của khu vực pháp lý liên quan sẽ thay thế và có hiệu lực.

Việt Nam
Nếu bạn đang sử dụng dịch vụ của chúng tôi ở Việt Nam, thì các điều khoản bổ sung sau đây sẽ được áp dụng. Trong trường hợp có bất kỳ mâu thuẫn nào giữa các điều khoản bổ sung sau đây và các quy định trong phần chính của chính sách này, thì các điều khoản sau đây sẽ được ưu tiên áp dụng.

Cách thức xử lý dữ liệu cá nhân. Chúng tôi có thể xử lý dữ liệu cá nhân của bạn bằng các cách thức thủ công hoặc tự động.

Quyền và nghĩa vụ của chủ thể dữ liệu. Ngoại trừ một số ngoại lệ nhất định, bạn có quyền lợi và nghĩa vụ theo pháp luật hiện hành. Cụ thể, bạn có các quyền theo luật như sau:

Quyền được biết;
Quyền đồng ý và rút lại sự đồng ý;
Quyền truy cập;
Quyền xóa dữ liệu;
Quyền hạn chế xử lý dữ liệu;
Quyền được cung cấp dữ liệu;
Quyền phản đối xử lý dữ liệu;
Quyền khiếu nại, tố cáo hoặc khởi kiện;
Quyền yêu cầu bồi thường thiệt hại; và
Quyền tự bảo vệ.
Bạn có thể thực hiện những quyền này bằng cách liên hệ với chúng tôi theo chi tiết tại mục “Liên hệ” và chúng tôi sẽ phản hồi yêu cầu của bạn bất kể địa điểm lưu trữ dữ liệu của bạn.

Bạn có những nghĩa vụ theo luật định như sau:

Tự bảo vệ dữ liệu cá nhân của bạn;
Yêu cầu các tổ chức và cá nhân khác có liên quan bảo vệ dữ liệu cá nhân của bạn;
Tôn trọng và bảo vệ dữ liệu cá nhân của người khác;
Cung cấp đầy đủ, chính xác dữ liệu cá nhân khi bạn đồng ý cho phép xử lý dữ liệu cá nhân của bạn; và
Các nghĩa vụ khác theo pháp luật hiện hành.
Độ Tuổi, Sự Cho Phép của Cha Mẹ và Người Giám Hộ. Nếu bạn dưới 16 tuổi hoặc đang chịu sự giám hộ:

bạn phải có được sự chấp thuận từ cha mẹ hoặc (những) người giám hộ hợp pháp của bạn; và
cha mẹ hoặc (những) người giám hộ hợp pháp của bạn chịu trách nhiệm đối với: (i) tất cả hành động của bạn có liên quan đến việc bạn truy cập và sử dụng Nền Tảng; (ii) việc bạn tuân thủ chính sách này; và (iii) đảm bảo rằng việc bạn tham gia vào Nền Tảng, trong bất kỳ trường hợp nào, sẽ không dẫn đến bất kỳ vi phạm nào đối với pháp luật và quy định áp dụng liên quan đến bảo vệ trẻ em.
Nếu bạn không có sự đồng ý của cha mẹ hoặc người giám hộ hợp pháp của bạn, hoặc cha mẹ hoặc người giám hộ hợp pháp của bạn không cho phép mở tài khoản bằng tên của họ, bạn phải ngừng truy cập Nền Tảng nếu bạn chưa đủ ít nhất 16 tuổi trở lên.

Không điều khoản nào trong Chính sách Quyền riêng tư này được hiểu là sự từ bỏ hoặc hạn chế đối với các quyền của người tiêu dùng theo luật định mà theo pháp luật áp dụng không thể bị hạn chế bằng hợp đồng.`,
  },
  {
    id: 'shopee',
    name: 'Shopee Vietnam Privacy Policy',
    url: 'https://help.shopee.vn/portal/4/article/77244-CH%C3%8DNH-S%C3%81CH-B%E1%BA%A2O-M%E1%BA%ACT',
    policyDate: '29/09/2026',
    rawText: `CHÍNH SÁCH BẢO MẬT
1. GIỚI THIỆU

1.1. Chào mừng bạn đến với nền tảng Shopee.vn (bao gồm website và ứng dụng di động Shopee) được vận hành bởi Công ty TNHH Shopee và các công ty liên kết (gọi riêng và gọi chung là, "Shopee", "chúng tôi", hay "của chúng tôi"). Shopee nghiêm túc thực hiện trách nhiệm của mình liên quan đến bảo mật thông tin theo các quy định về bảo vệ bí mật thông tin cá nhân của pháp luật Việt Nam (“Luật riêng tư”) và cam kết tôn trọng quyền riêng tư và sự quan tâm của tất cả người dùng đối với website và ứng dụng di động của chúng tôi (“Nền tảng”) (chúng tôi gọi chung Các Nền tảng và các dịch vụ chúng tôi cung cấp như được mô tả trong Nền tảng của chúng tôi là "các Dịch Vụ"). Người dùng có nghĩa là người đăng ký tài khoản với chúng tôi để sử dụng các Dịch Vụ, bao gồm cả người mua và người bán (gọi chung và gọi riêng là “Các Người Dùng”, “bạn” hoặc “của bạn”). Chúng tôi nhận biết tầm quan trọng của dữ liệu cá nhân mà bạn đã tin tưởng giao cho chúng tôi và tin rằng chúng tôi có trách nhiệm quản lý, bảo vệ và xử lý dữ liệu cá nhân của bạn một cách thích hợp. Chính sách bảo mật này ("Chính sách bảo mật" hay "Chính sách") được thiết kế để giúp bạn hiểu được cách thức chúng tôi thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân mà bạn đã cung cấp cho chúng tôi và/hoặc lưu giữ về bạn, cho dù là hiện nay hoặc trong tương lai, cũng như để giúp bạn đưa ra quyết định sáng suốt trước khi cung cấp cho chúng tôi bất kỳ dữ liệu cá nhân nào của bạn.

 

1.2. "Dữ Liệu Cá Nhân" hay "dữ liệu cá nhân" có nghĩa là dữ liệu, dù đúng hay không, về một cá nhân mà thông qua đó có thể được xác định được danh tính, hoặc từ dữ liệu đó và thông tin khác mà một tổ chức có hoặc có khả năng tiếp cận. Các ví dụ thường gặp về dữ liệu cá nhân có thể gồm có tên, số chứng minh nhân dân và thông tin liên hệ.

 

1.3. Bằng việc sử dụng Các Dịch Vụ, đăng ký một tài khoản với chúng tôi hoặc truy cập Nền tảng, bạn xác nhận và đồng ý rằng bạn chấp nhận các phương pháp, yêu cầu, và/hoặc chính sách được mô tả trong Chính sách bảo mật này, và theo đây bạn xác nhận bạn đã biết rõ và đồng ý toàn bộ cho phép chúng tôi thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn như mô tả trong đây. NẾU BẠN KHÔNG ĐỒNG Ý CHO PHÉP XỬ LÝ DỮ LIỆU CÁ NHÂN CỦA BẠN NHƯ MÔ TẢ TRONG CHÍNH SÁCH NÀY, VUI LÒNG KHÔNG SỬ DỤNG CÁC DỊCH VỤ CỦA CHÚNG TÔI HAY TRUY CẬP NỀN TẢNG HOẶC TRANG WEB CỦA CHÚNG TÔI. Nếu chúng tôi thay đổi Chính sách bảo mật của mình, chúng tôi sẽ thông báo cho bạn bao gồm cả thông qua việc đăng tải những thay đổi đó hoặc Chính sách bảo mật sửa đổi trên Nền tảng của chúng tôi. Trong phạm vi pháp luật cho phép, việc tiếp tục sử dụng các Dịch Vụ hoặc Nền Tảng, bao gồm giao dịch của bạn, được xem là bạn đã công nhận và đồng ý với các thay đổi trong Chính Sách Bảo Mật này.

 

1.4. Chính sách này áp dụng cùng với các thông báo, điều khoản hợp đồng, điều khoản chấp thuận khác áp dụng liên quan đến việc chúng tôi thu thập, lưu trữ, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn và không nhằm ghi đè những thông báo hoặc các điều khoản đó trừ khi chúng tôi có tuyên bố ràng khác.

 

1.5. Chính sách này được áp dụng cho cả Người bán và Người mua đang sử dụng Dịch vụ trừ khi có tuyên bố rõ ràng ngược lại.

 

2. KHI NÀO SHOPEE SẼ THU THẬP DỮ LIỆU CÁ NHÂN?

2.1. Chúng tôi sẽ/có thể thu thập dữ liệu cá nhân về bạn:

khi bạn đăng ký và/hoặc sử dụng Các Dịch Vụ hoặc Nền tảng của chúng tôi, hoặc mở một tài khoản với chúng tôi;
khi bạn gửi bất kỳ biểu mẫu nào, bao gồm đơn đăng ký hoặc các mẫu đơn khác liên quan đến bất kỳ sản phẩm và dịch vụ nào của chúng tôi, bằng hình thức trực tuyến hay dưới hình thức khác;
khi bạn ký kết bất kỳ thỏa thuận nào hoặc cung cấp các tài liệu hoặc thông tin khác liên quan đến tương tác giữa bạn với chúng tôi, hoặc khi bạn sử dụng các sản phẩm và dịch vụ của chúng tôi;
khi bạn tương tác với chúng tôi, chẳng hạn như thông qua các cuộc gọi điện thoại (có thể được ghi âm lại), thư từ, fax, gặp gỡ trực tiếp, các nền ứng dụng truyền thông xã hội và email;
khi bạn sử dụng các dịch vụ điện tử của chúng tôi, hoặc tương tác với chúng tôi qua Nền tảng hoặc Trang Web hoặc Các Dịch Vụ của chúng tôi. Trường hợp này bao gồm thông qua tập tin cookie mà chúng tôi có thể triển khai khi bạn tương tác với các Nền tảng hoặc Trang Web của chúng tôi;
khi bạn cấp quyền trên thiết bị của bạn để chia sẻ thông tin với ứng dụng hoặc Nền tảng của chúng tôi
khi bạn liên kết tài khoản Shopee với tài khoản mạng xã hội của bạn hoặc các tài khoản bên ngoài khác hoặc sử dụng các tính năng mạng xã hội khác, phù hợp với các chính sách của nhà cung cấp;
khi bạn thực hiện các giao dịch thông qua Dịch vụ của chúng tôi chẳng hạn như mỗi khi bạn đặt mua hàng hoặc chấp nhận đơn đặt hàng của Người mua;
khi bạn cung cấp ý kiến phản hồi hoặc gửi khiếu nại cho chúng tôi;
khi bạn đăng ký tham gia một cuộc thi;
khi bạn gửi dữ liệu cá nhân của bạn cho chúng tôi vì bất kỳ lý do gì; và/hoặc
khi bạn thực hiện các hoạt động khác trên Nền tảng của chúng tôi.
 

Các trường hợp trên không nhằm mục đích liệt kê đầy đủ các trường hợp và chỉ đưa ra một số trường hợp phổ biến về thời điểm dữ liệu cá nhân của bạn có thể bị thu thập.

 

2.2. Chúng tôi có thể thu thập thông tin của bạn từ bạn, các công ty liên kết, các bên thứ ba và từ các nguồn khác, bao gồm nhưng không giới hạn ở đối tác kinh doanh (ví dụ như đơn vị cung ứng dịch vụ vận chuyển, thanh toán), cơ quan đánh giá tín dụng, các đơn vị, đối tác cung cấp dịch vụ marketing, giới thiệu, các chương trình khách hàng thân thiết, những người dùng khác sử dụng Các Dịch Vụ của chúng tôi hoặc các nguồn dữ liệu công khai có sẵn hay các nguồn dữ liệu của nhà nước.

 

2.3. Trong một số trường hợp, bạn có thể cung cấp dữ liệu cá nhân của các cá nhân khác cho chúng tôi (ví dụ như thành viên gia đình, bạn bè hoặc những người trong danh sách liên hệ của bạn). Nếu bạn cung cấp cho chúng tôi dữ liệu cá nhân của họ, bạn tuyên bố và đảm bảo rằng bạn đã nhận được sự đồng ý của họ để xử lý dữ liệu cá nhân của họ theo Chính sách này.

 

3. SHOPEE SẼ THU THẬP NHỮNG DỮ LIỆU GÌ?

3.1. Trừ trường hợp được quy định khác đi trong Chính sách này, dữ liệu cá nhân mà Shopee có thể thu thập bao gồm dữ liệu cá nhân cơ bản và  dữ liệu cá nhân nhạy cảm (theo quy định của Luật riêng tư) như được liệt kê dưới đây:

họ tên;
địa chỉ email;
ngày sinh;
địa chỉ thanh toán và/hoặc giao nhận hàng hóa;
tài khoản ngân hàng và thông tin thanh toán
số điện thoại;
giới tính;
thông tin được gửi bởi hoặc liên quan đến (các) thiết bị được sử dụng để truy cập vào Các Dịch vụ hoặc Nền tảng của chúng tôi;
thông tin về mạng của bạn, bao gồm danh sách liên hệ của bạn khi đồng ý chia sẻ trên thiết bị của bạn, và những người và tài khoản mà bạn có tương tác;
hình ảnh hoặc âm thanh hoặc video;
thông tin về nhân thân được cấp bởi chính phủ hoặc các thông tin khác phục vụ cho các mục đích đánh giá pháp lý, nhận biết khách hàng, xác minh thông tin và/hoặc phòng chống gian lận của chúng tôi;
dữ liệu truyền thông hoặc liên lạc, ví dụ như các tùy chọn nhận thông tin quảng cáo từ chúng tôi hoặc các bên thứ ba của bạn, tùy chọn phương tiện liên lạc và lịch sử thông tin liên lạc với chúng tôi, các nhà cung cấp dịch vụ của chúng tôi, và các bên thứ ba khác;
thông tin sử dụng và giao dịch, bao gồm chi tiết về lịch sử tìm kiếm, giao dịch, quảng cáo và nội dung hiển thị mà tương tác với Nền Tảng, cũng như các sản phẩm và dịch vụ có liên quan của bạn;
dữ liệu về địa điểm;
bất kỳ thông tin nào khác về người dùng khi người dùng đăng nhập để sử dụng Các Dịch Vụ hoặc Nền tảng của chúng tôi, và khi người dùng sử dụng Các Dịch Vụ hoặc Nền tảng, cũng như thông tin về việc người dùng sử dụng Các Dịch Vụ hoặc Nền tảng của chúng tôi như thế nào; và
dữ liệu tổng hợp về nội dung người dùng sử dụng.
 

3.2. Bạn đồng ý không cung cấp cho chúng tôi bất cứ thông tin nào không chính xác hoặc gây hiểu nhầm và bạn đồng ý sẽ thông báo cho chúng tôi về bất cứ thông tin nào không chính xác hoặc khi có sự thay đổi thông tin. Chúng tôi bảo lưu quyền theo quyết định riêng của chúng tôi được yêu cầu các tài liệu cần thiết khác để xác minh bất cứ thông tin nào được bạn cung cấp.

 

3.3. Nếu bạn đăng nhập để trở thành Người sử dụng các Nền tảng của chúng tôi sử dụng tài khoản mạng xã hội của Bạn (“Tài khoản Mạng Xã hội”), liên kết tài khoản của bạn với Tài khoản Mạng Xã hội của bạn hoặc sử dụng bất cứ tính năng mạng xã hội Shopee nào, chúng tôi có quyền truy cập thông tin về bạn mà bạn đã cung cấp một cách tự nguyên cho nhà cung cấp dịch vụ Tài khoản Mạng Xã hội của Bạn tuân theo các chính sách của các nhà cung cấp dịch vụ này, và chúng tôi sẽ quản lý, xử lý và sử dụng các dữ liệu cá nhân này của bạn theo các quy định của Chính sách này tại mọi thời điểm.

3.4. Nếu bạn không muốn chúng tôi thu thập thông tin/dữ liệu cá nhân nói trên, bạn có thể chọn không tham gia vào bất kỳ lúc nào bằng cách thông báo bằng văn bản đến Chuyên viên Bảo Vệ Dữ Liệu Cá Nhân của chúng tôi. Có thể tìm thấy thêm thông tin về nội dung trong mục "Bạn có thể rút lại sự đồng ý, yêu cầu xóa, hạn chế xử lý, phản đối xử lý, yêu cầu cung cấp dữ liệu cá nhân, truy cập hoặc điều chỉnh thông tin bạn đã cung cấp cho chúng tôi bằng cách nào?" dưới đây. Tuy nhiên, lưu ý rằng việc từ chối hoặc hủy bỏ cho phép chúng tôi thu thập, sử dụng hoặc xử lý dữ liệu cá nhân của bạn có thể ảnh hưởng đến việc bạn sử dụng Các Dịch Vụ và Nền tảng. Ví dụ như dịch vụ xác định vị trí sẽ không hoạt động nếu bạn không cho phép ứng dụng truy cập vị trí của bạn.

 

4. THU THẬP CÁC DỮ LIỆU KHÁC

4.1 Như với hầu hết các trang web và các ứng dụng di động khác, thiết bị của bạn gửi thông tin có thể gồm có dữ liệu về bạn, được một máy chủ web ghi lại khi bạn sử dụng Nền tảng của chúng tôi. Thông tin này thông thường bao gồm nhưng không giới hạn địa chỉ IP, hệ điều hành của máy tính/thiết bị di động, loại trình duyệt, loại thiết bị di động, các đặc điểm của thiết bị di động, mã định danh thiết bị thống nhất (UDID) hoặc mã định danh thiết bị di động (MEID) của thiết bị di động của bạn, địa chỉ tham chiếu của Trang Web (nếu có), các trang mà bạn đã truy cập đến trên trang web hoặc ứng dụng di động của chúng tôi và thời gian truy cập và đôi khi là "cookie" (có thể vô hiệu hóa bằng cách sử dụng tùy chọn trình duyệt của bạn) để giúp trang web ghi nhớ lần truy cập cuối cùng của bạn. Nếu bạn đăng nhập, thông tin này được liên kết với tài khoản cá nhân của bạn. Thông tin này cũng được đưa vào các số liệu thống kê ẩn danh để giúp chúng tôi hiểu được khách truy cập sử dụng Trang Web của chúng tôi như thế nào.

 

4.2 Các ứng dụng di động của chúng tôi có thể thu thập thông tin chính xác về địa chỉ của thiết bị di động của bạn sử dụng các công nghệ như GPS, Wi-Fi,…. Chúng tôi thu thập, sử dụng, công bố và/hoặc xử lý các thông tin này cho một hoặc nhiều mục đích bao gồm nhưng không giới hạn các dịch vụ được cung cấp dựa trên vị trí mà bạn yêu cầu hoặc chuyển các nội dung có liên quan đến bạn dựa trên vị trí của bạn hoặc cho phép bạn chia sẻ vị trí của bạn cho các Người sử dụng khác như là một phần của các Dịch vụ được cung cấp bởi các ứng dụng di động của chúng tôi. Đối với phần lớn các thiết bị di động, bạn có thể rút lại sự cho phép để chúng tôi được thu thập các thông tin này dựa trên vị trí của bạn thông qua các cài đặt trên thiết bị. Nếu bạn có câu hỏi nào về cách thức vô hiệu hóa các dịch vụ vị trí trên thiết bị di động của bạn, vui lòng liên hệ với các nhà cung cấp dịch vụ thiết bị di động hoặc nhà sản xuất thiết bị của bạn.

 

4.3. Như khi bạn xem các trang trên trang web hoặc ứng dụng di động của chúng tôi, khi bạn xem các nội dung và quảng cáo và truy cập vào phần mềm khác trên Nền tảng của chúng tôi hoặc thông qua Dịch vụ, các thông tin có thể được gửi đến cho chúng tôi (bao gồm nhưng không giới hạn, địa chỉ IP, hệ điều hành, v.v..); nhưng, thay vì các số lượt xem trang, thiết bị của bạn gửi đến chúng tôi các thông tin về nội dung, quảng cáo được xem và/hoặc phần mềm được cài đặt bởi các Dịch vụ và Nền tảng và thời điểm.

 

5. COOKIES

5.1. Đôi khi chúng tôi hoặc các nhà cung cấp dịch vụ được cho phép và các đối tác quảng cáo của chúng tôi có thể sử dụng "cookie" hoặc các tính năng khác để cho phép chúng tôi hoặc các bên thứ ba thu thập hoặc chia sẻ thông tin liên quan đến việc sử dụng của bạn đối với Dịch vụ hoặc Nền tảng của chúng tôi. Các tính năng này sẽ giúp chúng tôi cải thiện Nền tảng và Các Dịch Vụ chúng tôi cung cấp, giúp chúng tôi đề xuất các dịch vụ và tính năng mới, và/hoặc cho phép chúng tôi và các đối tác quảng cáo của chúng tôi cung cấp các nội dung có liên quan hơn đến bạn. "Cookie" là các mã danh định được lưu trữ trên máy tính hoặc thiết bị di động của bạn lưu trữ các dữ liệu về máy tính hoặc thiết bị, bằng cách nào và khi nào Các Dịch Vụ hoặc Nền tảng được sử dụng hay truy cập, bởi bao nhiêu người và để theo dõi những hoạt động trong Các Nền tảng của chúng tôi. Chúng tôi có thể liên kết thông tin cookie với dữ liệu cá nhân. Cookie cũng liên kết với thông tin về những nội dung bạn đã chọn để mua sắm và các trang web mà bạn đã xem. Thông tin này được sử dụng để theo dõi giỏ hàng, để chuyển tải nội dung phù hợp với sở thích của bạn, để cho phép các đối tác cung cấp dịch vụ quảng cáo cung cấp dịch vụ quảng cáo trên các trang thông qua mạng Internet và để thực hiện phân tích dữ liệu và hoặc theo dõi việc sử dụng Dịch vụ

 

5.2. Bạn có thể từ chối sử dụng cookie bằng cách chọn các thiết lập thích hợp trên trình duyệt hoặc thiết bị của bạn. Tuy nhiên, vui lòng lưu ý rằng nếu bạn thực hiện thao tác này bạn có thể không sử dụng được các chức năng đầy đủ của Nền tảng hoặc Các Dịch Vụ của chúng tôi.

 

6. CHÚNG TÔI SỬ DỤNG THÔNG TIN BẠN CUNG CẤP CHO CHÚNG TÔI NHƯ THẾ NÀO?

6.1. Chúng tôi có thể thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân của bạn cho các mục đích sau đây:

để xem xét và/hoặc xử lý đơn đăng ký/giao dịch của bạn với chúng tôi hoặc giao dịch hay thư từ của bạn với các bên thứ ba qua Các Dịch Vụ;
để quản lý, điều hành, cung cấp và/hoặc quản lý việc bạn sử dụng và/hoặc truy cập Các Dịch Vụ và các Nền tảng của chúng tôi (bao gồm các sở thích của bạn), cũng như quan hệ và tài khoản người dùng của bạn với chúng tôi;
để đáp ứng, xử lý, giải quyết hoặc hoàn tất một giao dịch và/hoặc đáp ứng các yêu cầu của bạn đối với các sản phẩm và dịch vụ nhất định và thông báo cho bạn về các vấn đề dịch vụ và các hoạt động tài khoản bất thường;
để thực thi các Điều Khoản Dịch Vụ của chúng tôi hoặc bất kỳ thỏa thuận giấy phép người dùng cuối nào áp dụng;
để bảo vệ sự an toàn cá nhân và các quyền, tài sản hoặc sự an toàn của người khác;
để phục vụ mục đích nhận dạng, xác minh, đánh giá pháp lý hoặc để nhận biết khách hàng;
để đánh giá và đưa ra các quyết định liên quan đến hồ sơ tín dụng và rủi ro của bạn và tính đủ điều kiện để cho vay, trả sau hoặc cho các sản phẩm tín dụng, nếu có;
để duy trì và quản lý bất kỳ bản cập nhật phần mềm nào và/hoặc các bản cập nhật khác và sự hỗ trợ có thể được yêu cầu tùy lúc nhằm đảm bảo Các Dịch Vụ của chúng tôi hoạt động suôn sẻ;
để giải quyết hoặc tạo điều kiện thuận lợi cho dịch vụ khách hàng, thực hiện các chỉ thị của bạn, giải quyết hoặc trả lời bất kỳ thắc mắc nào được gửi bởi (hoặc nhằm được gửi bởi) bạn hoặc thay mặt bạn;
để liên hệ với bạn hoặc liên lạc với bạn qua điện thoại, tin nhắn văn bản và/hoặc tin nhắn fax, email và/hoặc thư hoặc cách khác nhằm mục đích quản trị và/hoặc quản lý quan hệ của bạn với chúng tôi hoặc việc bạn sử dụng Các Dịch Vụ của chúng tôi, chẳng hạn như ở việc truyền đạt thông tin hành chính cho bạn liên quan đến Các Dịch Vụ của chúng tôi. Bạn xác nhận và đồng ý rằng sự liên lạc như thế của chúng tôi có thể là theo cách gửi thư qua đường bưu điện, tài liệu hoặc thông báo cho bạn, có thể gồm có tiết lộ dữ liệu cá nhân nhất định về bạn để cung cấp các tài liệu đó cũng như trên bao bì/phong bì;
để cho phép các người dùng khác tương tác hoặc liên lạc với bạn hoặc thấy một số hoạt động của bạn trên Nền tảng, bao gồm để thông báo cho bạn khi một người dùng khác đã gửi cho bạn một tin nhắn riêng tư hoặc đăng nhận xét về bạn trên Nền tảng hoặc để liên kết với việc bạn sử dụng các tính năng xã hội trên Nền tảng;
để tiến hành các hoạt động nghiên cứu, phân tích và phát triển (bao gồm nhưng không giới hạn phân tích dữ liệu, khảo sát, phát triển và/hoặc lập đặc tính sản phẩm và dịch vụ), để phân tích cách thức bạn sử dụng Các Dịch Vụ của chúng tôi, để giới thiệu sản phẩm và/hoặc dịch vụ theo sự quan tâm của bạn, để cải thiện Các Dịch Vụ hoặc sản phẩm của chúng tôi và/hoặc để cải thiện trải nghiệm khách hàng của bạn;
để cho phép kiểm tra và khảo sát khác để, ngoài những hoạt động khác, xác thực quy mô và thành phần của đối tượng mục tiêu của chúng tôi, và hiểu được trải nghiệm của họ với Các Dịch Vụ của Shopee;
vì mục đích tiếp thị và quảng cáo, trong trường hợp này, để gửi cho bạn qua các phương tiện và phương thức liên lạc khác nhau, thông tin và tài liệu tiếp thị và quảng bá liên quan đến các sản phẩm và/hoặc dịch vụ (bao gồm, nhưng không giới hạn các sản phẩm và/hoặc dịch vụ của các bên thứ ba mà Shopee có thể hợp tác hoặc liên kết) mà Shopee (và/hoặc các bên liên kết hoặc công ty có liên quan của nó) có thể bán, tiếp thị hoặc quảng bá, cho dù các sản phẩm hoặc dịch vụ đó tồn tại vào lúc này hoặc được tạo ra trong tương lai. Bạn có thể hủy đăng ký nhận các thông tin tiếp thị tại bất cứ thời điểm nào bằng cách sử dụng chức năng hủy đăng ký trong các tài liệu tiếp thị điện tử. Chúng tôi có thể sử dụng các thông tin liên hệ của bạn để gửi các bản tin và/hoặc tài liệu truyền thông từ chúng tôi hoặc từ các công ty có liên quan của chúng tôi;
để cung cấp các chương trình và ưu đãi khách hàng thường xuyên, đối tác và tiền thưởng, cũng như các chiến dịch marketing đồng thương hiệu khác, ví dụ như: chương trình khách hàng thân thiết của người bán, ưu đãi của người bán hoặc thẻ tín dụng đồng thương hiệu với sự hợp tác của các bên thứ ba;
để đáp ứng các thủ tục pháp lý hoặc để tuân thủ hoặc theo quy định của pháp luật hiện hành, và các yêu cầu của cơ quan nhà nước có thẩm quyền hoặc yêu cầu của bất cứ cơ quan tài phán nào hoặc khi chúng tôi thực sự tin tưởng rằng việc tiết lộ thông tin là cần thiết, bao gồm nhưng không giới hạn, đáp ứng các yêu cầu đáp ứng các yêu cầu công bố thông tin theo yêu cầu của bất kỳ luật ràng buộc nào đối với Shopee hoặc các công ty hoặc chi nhánh liên quan của Shopee (bao gồm, nếu có, việc hiển thị tên, chi tiết liên hệ và chi tiết công ty của bạn);
để lập số liệu thống kê và nghiên cứu đáp ứng yêu cầu báo cáo và/hoặc duy trì sổ sách nội bộ hoặc theo quy định;
để thực hiện quy trình tìm hiểu và xác minh hoặc các hoạt động sàng lọc khác (bao gồm nhưng không giới hạn kiểm tra lý lịch) tuân thủ các nghĩa vụ theo quy định pháp luật hoặc cơ quan nhà nước có thẩm quyền hoặc các thủ tục kiểm soát rủi ro của chúng tôi, có thể được pháp luật yêu cầu hoặc có thể đã được chúng tôi áp dụng;
để kiểm tra Các Dịch Vụ của chúng tôi hoặc hoạt động của Shopee
để ngăn chặn hoặc điều tra bất kỳ hoạt động gian lận thực tế hoặc bị nghi ngờ nào đối với Điều khoản dịch vụ của chúng tôi, gian lận, các hành vi phi pháp, thiếu sót hay hành vi sai trái nào, cho dù có liên quan đến việc bạn sử dụng Các Dịch Vụ của chúng tôi hay không hay bất kỳ vấn đề nào phát sinh từ quan hệ của bạn với chúng tôi;
Để đáp ứng bất cứ các mối đe dọa hoặc yêu cầu thực tế nào được khẳng định chống lại Shopee hoặc các yêu cầu khác liên quan đến các Nội dung vi phạm quy định của các bên thứ ba;
để lưu trữ, lập máy chủ, sao lưu (cho dù là vì mục đích khôi phục sau thảm họa hoặc mục đích khác) đối với dữ liệu cá nhân của bạn;
để xử lý và/hoặc tạo thuận tiện cho một giao dịch tài sản kinh doanh hoặc một giao dịch tài sản kinh doanh tiềm năng, trường hợp giao dịch đó liên quan đến Shopee như một bên tham gia hoặc chỉ liên quan đến một công ty hay công ty liên kết của Shopee như một bên tham gia hoặc liên quan đến Shopee và/hoặc bất kỳ một hay nhiều công ty hoặc công ty liên kết của Shopee như (các) bên tham gia, và có thể có các tổ chức bên thứ ba khác tham gia giao dịch như thế. "Giao dịch tài sản kinh doanh" là các giao dịch mua, bán, cho thuê, sáp nhập, hợp nhất hoặc bất kỳ hoạt động mua lại, thanh lý hay tài trợ nào của một tổ chức hoặc một phần của một tổ chức hoặc của bất kỳ hoạt động kinh doanh hay tài sản nào của một tổ chức; và/hoặc
bất kỳ mục đích nào mà chúng tôi thông báo cho bạn tại thời điểm xin sự cho phép của bạn.
(gọi chung là “Các Mục Đích”)

 

6.2. Bạn xác nhận, cho phép và đồng ý rằng chúng tôi có thể truy cập, lưu trữ, xử lý và tiết lộ thông tin Tài khoản và Nội dung của bạn nếu luật pháp yêu cầu làm như vậy hoặc theo lệnh của tòa án hoặc của bất kỳ cơ quan chính phủ hoặc cơ quan quản lý nào có thẩm quyền đối với Shopee hoặc các chi nhánh của Shopee hoặc với lý do chính đáng Shopee tin rằng việc truy cập, lưu giữ hoặc tiết lộ đó là cần thiết và chính đáng để: (a) tuân thủ quy trình pháp lý; (b) tuân thủ yêu cầu từ bất kỳ cơ quan chính phủ hoặc cơ quan quản lý nào có thẩm quyền đối với Shopee hoặc các chi nhánh có liên quan của Shopee; (c) thực thi Điều khoản Dịch vụ của chúng tôi hoặc Chính sách Bảo mật này; (d) phản hồi bất kỳ khiếu nại nào du cho là nguy cơ hoặc đang xảy ra trên thực tế để chống lại Shopee hoặc các chi nhánh có liên quan hoặc khiếu nại khác rằng bất kỳ Nội dung nào vi phạm quyền của bên thứ ba; (e) đáp ứng các yêu cầu của bạn về dịch vụ khách hàng; hoặc (f) bảo vệ quyền, tài sản hoặc sự an toàn cá nhân của Shopee hoặc các chi nhánh có liên quan, người dùng và / hoặc công chúng.

 

6.3. Vì Các Mục Đích mà chúng tôi sẽ/có thể thu thập, sử dụng, tiết lộ hoặc xử lý dữ liệu cá nhân của bạn phụ thuộc vào hoàn cảnh hiện có, mục đích đó có thể không xuất hiện bên trên. Tuy nhiên, chúng tôi sẽ thông báo cho bạn biết mục đích khác đó tại thời điểm xin sự cho phép của bạn, trừ phi việc xử lý dữ liệu áp dụng mà không có sự đồng ý của bạn là được phép theo các quy định của pháp luật về bảo vệ bí mật thông tin cá nhân hoặc theo quy định pháp luật.

 

7. SHOPEE BẢO VỆ VÀ LƯU TRỮ THÔNG TIN KHÁCH HÀNG BẰNG CÁCH NÀO

7.1. Chúng tôi thực hiện các biện pháp bảo mật khác nhau và luôn nỗ lực để đảm bảo sự an toàn của dữ liệu cá nhân của bạn trên các hệ thống của chúng tôi. Dữ liệu cá nhân của người dùng được lưu trữ đằng sau các mạng bảo mật và chỉ có thể được truy cập bởi một số nhân viên có quyền truy cập đặc biệt đến các hệ thống của chúng tôi. Tuy nhiên, chắc chắn không thể có sự đảm bảo an ninh tuyệt đối.

 

7.2. Chúng tôi sẽ duy trì dữ liệu cá nhân tuân theo các quy định của pháp luật về bảo vệ bí mật thông tin cá nhân và/hoặc các điều luật hiện hành khác. Có nghĩa là, chúng tôi sẽ hủy hoặc xóa thông tin nhận dạng ra khỏi dữ liệu cá nhân của bạn khi chúng tôi nhận được yêu cầu của bạn phù hợp với các quy định của Luật riêng tư hiện hành hoặc khi chúng tôi có lý do hợp lý để xác định rằng (i) việc lưu trữ dữ liệu cá nhân đó không còn phục vụ mục đích thu thập dữ liệu cá nhân đó nữa; (ii) việc lưu giữ không còn cần thiết cho bất kỳ mục đích hợp pháp hay mục đích kinh doanh nào và (iii) không còn các lợi ích hợp pháp nào khác để tiếp tục lưu giữ các dữ liệu cá nhân này. Nếu bạn ngưng sử dụng Nền tảng của chúng tôi, hoặc quyền của bạn được sử dụng Nền tảng và/hoặc Các Dịch Vụ bị chấm dứt hoặc hủy bỏ, chúng tôi có thể tiếp tục lưu, sử dụng và/hoặc tiết lộ dữ liệu cá nhân của bạn tuân theo Chính sách bảo mật này và các nghĩa vụ của chúng tôi theo các quy định của pháp luật về bảo vệ bí mật thông tin cá nhân. Tùy thuộc vào quy định của pháp luật, chúng tôi có thể tiêu hủy dữ liệu cá nhân của bạn một cách an toàn mà không cần thông báo trước cho bạn.

 

7.3. Chúng tôi bảo lưu quyền từ chối xóa, tiêu hủy dữ liệu trong trường hợp yêu cầu của bạn không phù hợp với quy định của Luật riêng tư hiện hành, hoặc mặc dù phù hợp nhưng thuộc trường hợp Chúng tôi không được xóa, tiêu hủy theo quy định của Luật riêng tư hiện hành.

 

8. SHOPEE CÓ TIẾT LỘ THÔNG TIN THU THẬP TỪ NGƯỜI TRUY CẬP HAY KHÔNG?

8.1 Trong quá trình thực hiện hoạt động kinh doanh, chúng tôi sẽ/có thể cần phải sử dụng, xử lý, tiết lộ và/hoặc chuyển giao dữ liệu cá nhân của bạn cho các nhà cung cấp dịch vụ bên thứ ba, đại lý và/hoặc các công ty liên kết hoặc công ty liên quan của chúng tôi, và/hoặc các bên thứ ba khác có thể ở Việt Nam hoặc bên ngoài Việt Nam, vì một hay nhiều Mục Đích nói trên, và việc tiết lộ này sẽ được thực hiện theo đúng trình tự và quy định của pháp luật hiện hành. Chúng tôi cũng có thể sử dụng, xử lý, tiết lộ và/hoặc chuyển giao dữ liệu cá nhân của bạn cho các nhà cung cấp dịch vụ, đại lý và bên thứ ba khác khi bạn yêu cầu hoặc chỉ thị chúng tôi thực hiện, bao gồm việc liên kết hoặc tích hợp tài khoản Shopee của bạn với các tài khoản khác mà bạn đang sở hữu với các nhà cung cấp bên thứ ba. Các nhà cung cấp dịch vụ bên thứ ba, đại lý và/hoặc các công ty liên kết hoặc công ty liên quan và/hoặc các bên thứ ba khác như thế sẽ xử lý dữ liệu cá nhân của bạn hoặc thay mặt chúng tôi hoặc ngược lại, vì một hoặc nhiều Mục Đích nói trên. Chúng tôi cố gắng đảm bảo rằng các bên thứ ba và các công ty liên kết của chúng tôi giữ an toàn cho dữ liệu cá nhân của bạn khỏi bị truy cập, thu thập, sử dụng, tiết lộ, xử lý trái phép hoặc các rủi ro tương tự và chỉ lưu giữ dữ liệu cá nhân của bạn miễn là dữ liệu cá nhân của bạn vẫn còn cần thiết cho những việc nêu trên Mục đích Các bên thứ ba như thế bao gồm:

công ty mẹ, công ty con, công ty liên kết và công ty liên quan của chúng tôi;
người bán hoặc người mua mà bạn đã thực hiện giao dịch hoặc tương tác trên Nền tảng hoặc liên quan đến việc bạn sử dụng Dịch vụ cho các Mục đích đã nêu ở trên;
những người sử dụng khác của Nền tảng của chúng tôi cho một hoặc nhiều các Mục đích đã nêu ở trên;
nhà thầu, đại lý, nhà cung cấp dịch vụ và các bên thứ ba khác mà chúng tôi thuê để hỗ trợ hoặc bổ sung cho hoạt động kinh doanh của chúng tôi, hoặc bên mà bạn đã chọn liên kết tài khoản Shopee của mình hoặc cho phép tích hợp một cách rõ ràng. Những bên này bao gồm, nhưng không giới hạn ở những bên cung cấp các dịch vụ quản trị hoặc các dịch vụ khác cho chúng tôi chẳng hạn như công ty bưu chính, công ty viễn thông, đối tác quảng cáo và truyền thông, công ty công nghệ thông tin, lưu trữ đám mây, dịch vụ AI tạo sinh và sáng tạo nội dung, các tổ chức hoạt động thương mại điện tử, và trung tâm dữ liệu. Dữ liệu đầu vào và thông tin của bạn cũng có thể được chuyển đến các mô hình AI hoặc nhà cung cấp xử lý dữ liệu theo chính sách bảo mật tương ứng của họ;
các cơ quan chính phủ hoặc cơ quan quản lý có thẩm quyền đối với Shopee hoặc nếu được cho phép theo Mục 6.2;
người mua hoặc người thừa nhiệm khác trong trường hợp sáp nhập, thoái vốn, tái cơ cấu, tái tổ chức, giải thể hoặc bán hay chuyển nhượng một phần hoặc tất cả tài sản của Shopee, cho dù là vấn đề đang diễn ra hay đang trong thủ tục phá sản, thanh lý hoặc thủ tục tương tự, trong đó dữ liệu cá nhân Shopee lưu giữ về người dùng của chúng tôi nằm trong các tài sản được chuyển nhượng; hoặc cho một bên đối tác trong một giao dịch tài sản kinh doanh mà Shopee hoặc bất kỳ công ty liên kết hay công ty liên quan nào của nó có tham gia giao dịch; và
bên thứ ba mà chúng tôi tiết lộ thông tin vì một trong các Mục Đích và các bên thứ ba đó ngược lại họ sẽ thu thập và xử lý dữ liệu cá nhân của bạn vì một hoặc nhiều Mục Đích.
 

8.2. Chúng tôi có thể chia sẻ thông tin bao gồm thông tin thống kê và nhân khẩu học về Người Dùng cũng như thông tin về việc sử dụng Các Dịch Vụ của người dùng với đối tác cung cấp dịch vụ quảng cáo và lập trình. Chúng tôi cũng sẽ chia sẻ thông tin thống kê và thông tin nhân khẩu học về người dùng của chúng tôi và việc họ sử dụng Các Dịch Vụ với các đối tác quảng cáo và bên thứ ba cung cấp dịch vụ quảng cáo, tái quảng cáo, và/hoặc lập trình.

 

8.3. Để tránh nghi ngờ, trong trường hợp các quy định của pháp luật về bảo vệ bí mật thông tin cá nhân hoặc các điều luật hiện hành khác cho phép một tổ chức chẳng hạn như chúng tôi thu thập, sử dụng hoặc tiết lộ dữ liệu cá nhân của bạn mà không cần sự đồng ý của bạn, sự cho phép như thế của pháp luật sẽ tiếp tục áp dụng. Phù hợp với các quy định nêu trên và theo các quy định của pháp luật hiện hành, chúng tôi có thể sử dụng dữ liệu cá nhân của bạn cho các cơ sở pháp lý đã được công nhận, bao gồm tuân thủ các nghĩa vụ pháp lý của chúng tôi, để thực hiện hợp đồng của chúng tôi với bạn, để đạt được lợi ích hợp pháp và lý do của chúng tôi để sử dụng dữ liệu đó cao hơn bất kỳ phương hại nào đến quyền bảo vệ dữ liệu của bạn hoặc khi cần thiết liên quan với một yêu cầu pháp lý.

 

8.4. Các bên thứ ba có thể chặn hoặc truy cập trái phép dữ liệu cá nhân được gửi đến hoặc có trên trang web, các công nghệ có thể hoạt động không chính xác hoặc không hoạt động như dự kiến, hoặc có người có thể truy cập, lạm dụng hoặc sử dụng sai trái thông tin mà không phải lỗi của chúng tôi. Tuy nhiên chúng tôi sẽ triển khai các biện pháp bảo mật hợp lý để bảo vệ dữ liệu cá nhân của bạn theo quy định của các quy định của pháp luật về bảo vệ bí mật thông tin cá nhân; tuy nhiên không thể đảm bảo sự bảo mật tuyệt đối chẳng hạn như trường hợp tiết lộ trái phép phát sinh từ hoạt động tin tặc vì ý đồ xấu hoặc hành vi tấn cung tinh vi bưởi kẻ xấu mà không phải lỗi của chúng tôi.

 

8.5. Shopee cho phép bạn chia sẻ video từ YouTube trong tính năng Shopee Livestream (“Nội Dung YouTube”). Về mặt kỹ thuật, Shopee sử dụng Tính Năng YouTube API của chính YouTube. Thông qua việc chia sẻ Nội Dung YouTube, bạn theo đây đồng ý chịu sự điều chỉnh của Chính Sách Bảo Mật của YouTube (http://www.google.com/policies/privacy).

 

8.6. Như được quy định trong Điều khoản dịch vụ của Shopee, Người dùng (bao gồm bất cứ người lao động, đại lý, người đại diện hoặc bất cứ bên nào khác hành động cho Người dùng đó hoặc thay mặt người dùng đó) sở hữu dữ liệu cá nhân của Người dùng khác thông qua việc sử dụng Dịch vụ (“Bên nhận dữ liệu”) tại đây đồng ý rằng, họ sẽ (i) tuân thủ với các quy định của pháp luật về bảo vệ dữ liệu cá nhân liên quan đến các dữ liệu này, bao gồm bất cứ hoạt động thu thập, xử lý, lưu giữ và chuyển giao các dữ liệu này; (ii) cho phép Shopee hoặc Người dùng mà dữ liệu cá nhân của Bên nhận được thu thập (“Bên tiết lộ”) được xóa dữ liệu của anh hoặc cô ấy đã bị thu thập khỏi cơ sở dữ liệu của Bên nhận dữ liệu; và (iii) cho phép Shopee hoặc Bên tiết lộ dữ liệu được rà soát những nội dung đã bị thu thập liên quan đến họ bởi Bên nhận dữ liệu, trong mỗi trường hợp (ii) và (iii) nêu trên, tuân thủ với và khi được yêu cầu bởi các quy định của pháp luật có liên quan.  

 

8.7. Bất kể quy định nào được quy định tại đây, Người bán (bao gồm bất cứ người lao động, đại lý, người đại diện hoặc bất cứ bên nào khác hành động cho Người dùng đó hoặc thay mặt người dùng đó) phải tuân thủ các quy định của pháp luật có liên quan và, liên quan đến bất cứ dữ liệu cá nhân nào của Người mua nhận được từ Shopee, (i) không được cho phép sử dụng các dữ liệu cá nhân của Người mua này trừ khi có lý do chính đáng cần thiết để phản hồi các yêu cầu của Người mua và để thực hiện việc trả lời, xử lý, giải quyết hoặc hoàn thành các giao dịch mà không có sự cho phép trước bằng văn bản của Người mua và Shopee; (ii) phải ngưng việc liên lạc với Người mua sử dụng các thông tin này bên ngoài nền tảng Shopee; (iii) không được cho phép tiết lộ các dữ liệu cá nhân của Người mua này đến bất cứ bên thứ ba không được phép nào mà không có sự cho phép trước bằng văn bản của Người mua và Shopee; (iv) phải thực hiện các biện pháp an ninh thích hợp để bảo vệ từng dữ liệu cá nhân người dùng của Shopee mà họ đang sở hữu, chỉ lưu giữ dữ liệu này chừng nào vẫn còn cần thiết cho các mục đích ở trên và phù hợp với quy định của pháp luật bảo vệ dữ liệu cá nhân, và xóa hoặc hoàn trả các dữ liệu này cho Shopee theo yêu cầu từ Shopee hoặc trong thời gian sớm nhất có thể khi hoàn thành giao dịch; và (v) thông báo cho Bộ phận bảo vệ Dữ liệu Cá nhân của Shopee tại dpo.vn@shopee.com trong trường hợp có khả năng vi phạm dữ liệu hoặc mất dữ liệu khác của người dùng này.

 

9. THÔNG TIN VỀ TRẺ EM

Các Dịch Vụ này không dành cho trẻ em dưới 13 tuổi. Chúng tôi không cố tình thu thập hay lưu giữ bất kỳ dữ liệu cá nhân hay thông tin không nhận dạng cá nhân nào của bất kỳ ai dưới 13 tuổi, bất kỳ phần nào của Nền tảng của chúng tôi hoặc Các Dịch Vụ khác cũng không dành cho trẻ em dưới 13 tuổi. Bố/mẹ hoặc người giám hộ của trẻ em dưới 13 tuổi vui lòng giám sát và đảm bảo thông tin cá nhân của trẻ dưới 13 tuổi mà mình đang giám hộ không đăng tải thông tin cá nhân cho Shopee. Trong trường hợp thông tin cá nhân của của trẻ em dưới 13 tuổi do quý phụ huynh giám hộ được cung cấp cho Shopee, Bố/mẹ hoặc người giám hộ theo đồng ý với việc xử lý thông tin của trẻ em dưới 13 tuổi có liên quan, và đồng ý chịu sự điều chỉnh của Chính Sách này thay mặt cho người được giám hộ. Chúng tôi sẽ khóa bất kỳ tài khoản nào chỉ được sử dụng bởi đối tượng trẻ em như vậy và sẽ gỡ và/hoặc xóa bất kỳ dữ liệu cá nhân nào mà chúng tôi cho là đã được gửi bởi bất kỳ trẻ em nào dưới 13 tuổi.

 

10. THÔNG TIN THU THẬP BỞI CÁC BÊN THỨ BA

10.1. Nền tảng của chúng tôi sử dụng Google Analytics, một dịch vụ phân tích web được cung cấp bởi Google, Inc. ("Google"). Google Analytics sử dụng cookie, là các tập tin văn bản trên thiết bị của bạn, để giúp Nền tảng phân tích cách thức người dùng sử dụng Nền tảng của chúng tôi. Thông tin được tạo bởi cookie về việc bạn sử dụng Nền tảng (bao gồm địa chỉ IP của bạn) sẽ được gửi đến và lưu bởi Google trên các máy chủ tại Hoa Kỳ. Google sẽ sử dụng thông tin này để đánh giá việc bạn sử dụng Nền tảng của chúng tôi, soạn báo cáo về hoạt động trang web dành cho các nhà điều hành trang web và cung cấp các dịch vụ khác liên quan đến hoạt động trang web và việc sử dụng Internet. Google cũng có thể gửi thông tin này cho các bên thứ ba trong trường hợp luật pháp có quy định như thế, hoặc trường hợp các bên thứ ba đó xử lý thông tin thay mặt Google. Google sẽ không liên kết địa chỉ IP của bạn với bất kỳ dữ liệu nào khác mà Google nắm giữ

 

10.2. Chúng tôi, và các bên thứ ba, có thể trong từng thời điểm cung cấp các bản tải về ứng dụng phần mềm cho bạn sử dụng bởi Nền tảng hoặc thông qua Các Dịch Vụ. Những ứng dụng này có thể truy cập riêng, và cho phép một bên thứ ba xem, thông tin nhận dạng của bạn, chẳng hạn như tên, ID người dùng của bạn, Địa chỉ IP của thiết bị của bạn hoặc thông tin khác chẳng hạn như game bạn đang chơi trong bất kỳ phiên truy cập cụ thể nào, và bất kỳ cookie nào trước đây bạn có thể đã cài đặt hoặc đã được cài đặt cho bạn bởi một ứng dụng phần mềm hoặc trang web của bên thứ ba. Ngoài ra, các ứng dụng này có thể yêu cầu bạn cung cấp thêm thông tin trực tiếp cho các bên thứ ba. Các sản phẩm hoặc dịch vụ của bên thứ ba được cung cấp thông qua các ứng dụng này không thuộc sở hữu hay quyền kiểm soát của Shopee. Bạn nên đọc các điều khoản và các chính sách khác được công bố bởi các bên thứ ba đó trên trang web của họ hoặc nơi khác.

 

11. LOẠI TRỪ TRÁCH NHIỆM VỀ NGHĨA VỤ BẢO MẬT VÀ CÁC TRANG WEB BÊN THỨ BA

11.1. CHÚNG TÔI KHÔNG ĐẢM BẢO TÍNH BẢO MẬT ĐỐI VỚI DỮ LIỆU CÁ NHÂN VÀ/HOẶC THÔNG TIN KHÁC MÀ BẠN CUNG CẤP TRÊN CÁC TRANG WEB CỦA BÊN THỨ BA. Chúng tôi thực hiện các biện pháp bảo mật khác nhau để duy trì sự an toàn của dữ liệu cá nhân của bạn mà chúng tôi lưu giữ hoặc kiểm soát. Dữ liệu cá nhân của bạn được lưu đằng sau các mạng bảo mật và chỉ có thể được truy cập bởi một số cá nhân giới hạn có quyền truy cập đặc biệt đến các hệ thống của chúng tôi, và đã được yêu cầu bảo mật dữ liệu cá nhân đó. Khi bạn đặt hàng hoặc truy cập dữ liệu cá nhân của bạn, chúng tôi đề nghị sử dụng một máy chủ bảo mật. Tất cả dữ liệu cá nhân hoặc thông tin cá nhân bạn cung cấp sẽ được mã hóa vào các cơ sở dữ liệu của chúng tôi để chỉ được truy cập như mô tả bên trên.

 

11.2. Nhằm cung cấp cho bạn giá trị gia tăng, chúng tôi có thể chọn các trang web hoặc ứng dụng hoặc dịch vụ của bên thứ ba khác nhau để liên kết, và đóng khung bên trong Nền tảng. Chúng tôi cũng có thể tham gia các quan hệ cùng tiếp thị và các quan hệ khác để cung cấp dịch vụ thương mại điện tử và các dịch vụ và tính năng khác cho khách truy cập. Những trang được liên kết này có các chính sách về quyền riêng tư cũng như các biện pháp bảo mật riêng và độc lập. Ngay cả khi bên thứ ba đó có liên kết với chúng tôi, chúng tôi cũng không kiểm soát các trang web/ứng dụng/dịch vụ được liên kết này, mỗi trang đó có các phương pháp bảo vệ quyền riêng tư và thu thập dữ liệu riêng biệt, độc lập với chúng tôi. Dữ liệu thu thập bởi các đối tác cùng tiếp thị của chúng tôi hoặc các trang web/ứng dụng/dịch vụ của bên thứ ba (ngay cả khi được cung cấp trên hoặc thông qua Nền tảng của chúng tôi) có thể không được chúng tôi tiếp cận và/hoặc lưu giữ.

 

11.3. Do đó chúng tôi không chịu trách nhiệm hay trách nhiệm pháp lý đối với nội dung, các biện pháp bảo mật (hoặc sự thiếu biện pháp bảo mật) và các hoạt động của các trang web/ứng dụng/dịch vụ được liên kết này. Những trang web/ứng dụng/dịch vụ được liên kết này chỉ vì sự thuận tiện cho bạn và do đó bạn tự chịu trách nhiệm khi truy cập chúng. Tuy nhiên, chúng tôi tìm cách bảo vệ tính toàn vẹn của Nền tảng của chúng tôi và các liên kết được đặt trên từng trang web đó và do đó chúng tôi hoan nghênh ý kiến phản hồi về các trang web được liên kết này (bao gồm nếu một trang web cụ thể không hoạt động).

 

12. SHOPEE SẼ CHUYỂN THÔNG TIN CỦA BẠN RA NƯỚC NGOÀI?

Thông tin và/hoặc dữ liệu cá nhân của bạn có thể được chuyển ra nước ngoài, lưu trữ hoặc xử lý bên ngoài quốc gia của bạn cho một hoặc nhiều Mục đích. Shopee sẽ chỉ chuyển dữ liệu cá nhân của bạn ra nước ngoài khi phù hợp với các quy định của pháp luật về bảo vệ dữ liệu cá nhân.

 

13. BẠN CÓ THỂ RÚT LẠI SỰ ĐỒNG Ý, YÊU CẦU HẠN CHẾ XỬ LÝ, PHẢN ĐỐI XỬ LÝ, YÊU CẦU CUNG CẤP DỮ LIỆU CÁ NHÂN, TRUY CẬP HOẶC ĐIỀU CHỈNH THÔNG TIN BẠN ĐÃ CUNG CẤP CHO CHÚNG TÔI BẰNG CÁCH NÀO?

13.1. Rút Lại Sự Đồng Ý, Yêu cầu hạn chế, phản đối xử lý dữ liệu

13.1.1 Bạn có thể rút lại sự đồng ý cho phép, yêu cầu hạn chế, phản đối trong việc thu thập, xử lý, sử dụng và/hoặc tiết lộ dữ liệu cá nhân của bạn mà chúng tôi đang lưu giữ hoặc kiểm soát bằng cách gửi email cho Chuyên viên Bảo Vệ Dữ Liệu Cá Nhân của chúng tôi tại địa chỉ email dpo.vn@shopee.com hoặc qua ĐÂY, và chúng tôi sẽ xử lý các yêu cầu này theo Chính Sách Bảo Mật cũng như quy định pháp luật có liên quan. Tuy nhiên, việc bạn rút lại sự cho phép, yêu cầu hạn chế, phản đối xử lý dữ liệu cá nhân của bạn có thể đồng nghĩa với việc chúng tôi sẽ không thể tiếp tục cung cấp các Dịch vụ đến bạn và chúng tôi có thể cần phải chấm dứt mối quan hệ hiện tại giữa bạn và/hoặc hợp đồng mà bạn có với Chúng tôi.

 

13.1.2 Khi bạn chia sẻ nội dung trên YouTube, bên cạnh việc rút lại sự cho phép của bạn bằng việc gửi email cho chúng tôi phù hợp với quy định tại Điều 13.1.1, bạn cũng có thể rút lại quyền truy cập của Shopee vào dữ liệu cá nhân của bạn thông qua trang cài đặt an ninh của Google tại địa chỉ  https://security.google.com/settings/security/permissions.  

 

13.2. Yêu cầu cung cấp Dữ Liệu Cá Nhân

13.2.1. Bạn có quyền yêu cầu chúng tôi cung cấp Dữ Liệu Cá Nhân của chính bản thân bạn cho bạn bằng cách gửi yêu cầu cho Chuyên viên Bảo Vệ Dữ Liệu Cá Nhân của chúng tôi tại địa chỉ email dpo.vn@shopee.com hoặc qua ĐÂY. Bạn cũng có quyền yêu cầu chúng tôi cung cấp Dữ Liệu Cá Nhân của bạn cho các tổ chức, cá nhân khác hoặc của các tổ chức, cá nhân khác cho bạn với điều kiện bạn phải cung cấp được ủy quyền hợp lệ hoặc tài liệu khác chứng minh chấp thuận của chủ thể dữ liệu theo quy định của pháp luật.

13.2.2. Yêu cầu của bạn chỉ được coi là hợp lệ và được chấp nhận xử lý khi có đầy đủ các thông tin cần thiết và sử dụng đúng biểu mẫu theo quy định của Luật riêng tư hiện hành.

 

13.2.3. Chúng tôi có thể tính một khoản phí hợp lý cho bạn để giải quyết và xử lý yêu cầu cung cấp dữ liệu cá nhân của bạn. Nếu chúng tôi có tính phí, chúng tôi sẽ cung cấp cho bạn ước tính lệ phí bằng văn bản tùy thuộc vào từng trường hợp cụ thể.

 

13.2.4. Trong trường hợp yêu cầu của bạn là hợp lệ theo quy định của pháp luật và thuộc trường hợp chúng tôi được phép cung cấp dữ liệu, chúng tôi sẽ thông báo đến bạn thông qua các phương thức liên lạc phù hợp về thời gian, địa điểm, hình thức cung cấp dữ liệu cá nhân, chi phí (nếu có), phương thức, thời hạn thanh toán (nếu có) và chúng tôi sẽ cung cấp dữ liệu cá nhân theo đúng thông báo này và các thủ tục khác theo quy định của pháp luật.

 

13.2.5. Vui lòng lưu ý rằng chúng tôi không buộc phải đáp ứng hay giải quyết yêu cầu cung cấp Dữ Liệu Cá Nhân của bạn trừ phi bạn đã đồng ý đóng phí theo thông báo được quy định tại Điều 13.2.4 nêu trên.

 

13.2.6. Chúng tôi bảo lưu quyền từ chối cung cấp dữ liệu cá nhân của bạn theo các quy định của pháp luật về bảo vệ bí mật thông tin cá nhân, trường hợp các điều luật đó yêu cầu và/hoặc cho phép một tổ chức từ chối cung cấp dữ liệu cá nhân trong các trường hợp như thế.

 

13.3. Yêu Cầu Truy Cập đến hoặc Sửa Dữ Liệu Cá Nhân

13.3.1. Nếu bạn đã đăng ký một tài khoản với chúng tôi, cá nhân bạn có thể truy cập và/hoặc sửa dữ liệu cá nhân của bạn mà chúng tôi đang lưu giữ hoặc kiểm soát thông qua trang Thiết Lập Tài Khoản trên Nền tàng. Nếu bạn chưa đăng ký tài khoản với chúng tôi, cá nhân bạn có thể yêu cầu truy cập và/hoặc sửa dữ liệu cá nhân của bạn mà chúng tôi đang lưu giữ hoặc kiểm soát bằng cách gửi yêu cầu bằng văn bản cho chúng tôi. Chúng tôi sẽ cần có đủ thông tin từ bạn để xác định danh tính của bạn cũng như bản chất yêu cầu của bạn để có thể giải quyết yêu cầu của bạn. Do đó, vui lòng gửi yêu cầu bằng văn bản của bạn bằng cách gửi email cho Chuyên viên Bảo Vệ Dữ Liệu Cá Nhân của chúng tôi tại địa chỉ email dpo.vn@shopee.com hoặc tại ĐÂY.

 

13.3.2 Chúng tôi có thể tính một khoản phí hợp lý cho bạn để giải quyết và xử lý yêu cầu truy cập dữ liệu cá nhân của bạn. Nếu chúng tôi có tính phí, chúng tôi sẽ cung cấp cho bạn ước tính lệ phí bằng văn bản. Vui lòng lưu ý rằng chúng tôi không buộc phải đáp ứng hay giải quyết yêu cầu truy cập của bạn trừ phi bạn đã đồng ý đóng phí.

 

13.3.3 Chúng tôi bảo lưu quyền từ chối sửa dữ liệu cá nhân của bạn theo các quy định của pháp luật về bảo vệ bí mật thông tin cá nhân, trường hợp các điều luật đó yêu cầu và/hoặc cho phép một tổ chức từ chối sửa dữ liệu cá nhân trong các trường hợp như thế.

 

14. THẮC MẮC, QUAN NGẠI HOẶC KHIẾU NẠI? LIÊN HỆ VỚI CHÚNG TÔI

Nếu bạn có bất kỳ thắc mắc, yêu cầu bảo vệ hoặc khiếu nại nào về các phương pháp bảo vệ quyền riêng tư của chúng tôi vui lòng liên hệ với chúng tôi theo thông tin sau:

 

CÔNG TY TNHH SHOPEE

Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Hà, Thành phố Hà Nội, Việt Nam

Email: dpo.vn@shopee.com hoặc tại ĐÂY.

 

Chính sách này được cập nhật vào ngày 04/6/2026 và có hiệu lực sau 07 (bảy) ngày kể từ ngày đăng tải. Để tham khảo phiên bản trước của Chính sách Bảo mật, vui lòng bấm vào ĐÂY.`,
  },
  {
    id: 'zalo',
    name: 'Zalo Privacy Policy',
    url: 'https://help.zalo.me/huong-dan/chuyen-muc/bao-mat-va-rieng-tu/quyen-rieng-tu-cua-nguoi-dung-tren-zalo/',
    policyDate: '29/09/2026',
    rawText: `Quyền riêng tư của người dùng trên Zalo
Zalo tôn trọng quyền riêng tư của người dùng. Bài viết này sẽ giúp bạn tìm hiểu về Chính sách quyền riêng tư và các cài đặt bảo vệ quyền riêng tư trên Zalo.

Chính sách quyền riêng tư của Zalo
Cài đặt quyền riêng tư
Chính sách quyền riêng tư của Zalo
Zalo minh bạch về các thông tin thu thập từ người dùng. Theo đó, mọi dữ liệu mà bạn cung cấp sẽ luôn được bảo mật dựa trên điều khoản sử dụng Zalo.

Cài đặt quyền riêng tư
Để thay đổi các cài đặt quyền riêng tư:
Cá nhân > Quyền riêng tư

Cá nhân
Hiện ngày sinh: Lựa chọn hiện ngày sinh của bạn hay không, và hình thức hiện như thế nào. Nếu bạn chọn không hiện, bạn bè sẽ không nhận được thông báo vào ngày sinh nhật của bạn.
Hiện trạng thái truy cập: Nếu tắt, bạn sẽ không thấy khi bạn bè truy cập Zalo, và bạn bè cũng không thấy được trạng thái truy cập của bạn.
Tin nhắn và cuộc gọi
Hiện trạng thái “Đã xem”: Nếu tắt, bạn sẽ không thấy khi bạn bè đã đọc tin nhắn, và bạn bè cũng không thấy được trạng thái đọc tin nhắn của bạn.
Cho phép nhắn tin: Lựa chọn ai được phép nhắn tin cho bạn trên Zalo.
Cho phép gọi điện: Lựa chọn ai được phép gọi điện cho bạn trên Zalo.
Nhật ký và khoảnh khắc
Cho phép xem và bình luận: Cho phép bạn bè xem được toàn bộ bài đăng, bài đăng trong 7 ngày/1 tháng/6 tháng gần nhất, hoặc tùy chỉnh.
Chặn và ẩn
Lựa chọn người mà bạn muốn:

Bỏ chặn tin nhắn. Xem cách chặn tin nhắn của một người nhất định
Chặn xem nhật ký.
Chặn xem khoảnh khắc.
Ẩn bài đăng và khoảnh khắc của họ khỏi nhật ký của bạn.
Nguồn tìm kiếm và kết bạn
Tự động thêm bạn: Nếu bật, Zalo sẽ tự động thêm bạn bè vào danh bạ Zalo khi cả hai đều lưu số nhau trên máy.
Quản lý nguồn tìm kiếm và kết bạn: Lựa chọn những nguồn mà người lạ có thể tìm thấy và kết bạn Zalo với bạn.
Quyền của tiện ích
Tiện ích: Cho phép Zalo tự động nhận diện mã QR trong ảnh để giúp bạn quét mã nhanh hơn, và lựa chọn cách bạn muốn mở link trên Zalo. `,
  },
  {
    id: 'flashlight_sketchy',
    name: 'Đèn Pin Siêu Sáng Pro Policy (Mô phỏng app vi phạm)',
    url: 'https://brighttorch.example.com/privacy',
    policyDate: '26/09/2026',
    isDemoData: true, // Giữ cờ này để hiển thị nhãn cảnh báo app độc hại minh họa
    rawText: `Chính sách Bảo mật Ứng dụng Đèn Pin: Khi bạn cài đặt ứng dụng, chúng tôi tự động đọc danh bạ...`,
  },
];
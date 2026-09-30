import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize Google GenAI SDK (server-side only)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Endpoint: Crawl webpage content from a URL
app.post('/api/crawl', async (req: Request, res: Response) => {
  const startTime = Date.now();
  try {
    const { url } = req.body;
    console.log(`[CRAWL] Nhận yêu cầu crawl URL: "${url}"`);

    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      console.warn(`[CRAWL] URL không hợp lệ: "${url}"`);
      return res.status(400).json({
        error: 'URL không hợp lệ. Đường dẫn phải bắt đầu bằng http:// hoặc https://',
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn(`[CRAWL] Quá thời gian timeout 15s cho URL: "${url}"`);
      controller.abort();
    }, 15000);

    let response: any;
    try {
      response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept':
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        },
      });
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      if (fetchErr.name === 'AbortError') {
        console.error(`[CRAWL] Hết thời gian chờ (Timeout 15s) khi kết nối URL: "${url}"`);
        return res.status(504).json({
          error:
            'Quá thời gian phản hồi (Timeout 15 giây): Trang web phản hồi quá chậm hoặc không thể kết nối. Vui lòng chuyển sang tab "Dán văn bản điều khoản"!',
        });
      }
      console.error(`[CRAWL] Lỗi fetch network khi tải "${url}":`, fetchErr.message);
      return res.status(502).json({
        error: `Không thể kết nối đến máy chủ trang web (${fetchErr.message}). Vui lòng kiểm tra lại URL hoặc dán trực tiếp văn bản!`,
      });
    }

    clearTimeout(timeoutId);

    console.log(
      `[CRAWL] Fetch thành công URL "${url}" - HTTP Status: ${response.status} (${response.statusText})`
    );

    if (!response.ok) {
      if (response.status === 403) {
        return res.status(403).json({
          error:
            'Không thể tải trang web: Trang web chặn bot/truy cập tự động (HTTP 403 Forbidden). Vui lòng chuyển sang tab "Dán văn bản điều khoản" để dán nội dung!',
        });
      }
      if (response.status === 401) {
        return res.status(401).json({
          error:
            'Trang web yêu cầu xác thực tài khoản (HTTP 401 Unauthorized). Vui lòng sao chép và dán trực tiếp văn bản vào ô nhập liệu.',
        });
      }
      if (response.status === 404) {
        return res.status(404).json({
          error:
            'Không tìm thấy trang web (HTTP 404 Not Found). Vui lòng kiểm tra lại đường dẫn URL.',
        });
      }
      return res.status(response.status >= 400 && response.status < 600 ? response.status : 502).json({
        error: `Không thể tải trang web (HTTP ${response.status}: ${response.statusText || 'Lỗi HTTP'}). Vui lòng thử dán trực tiếp văn bản!`,
      });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove unnecessary elements
    $('script, style, noscript, nav, header, footer, iframe, svg, [role="navigation"]').remove();

    // Extract title
    const title =
      $('title').text().trim() ||
      $('h1').first().text().trim() ||
      'Chính sách bảo mật';

    // Extract main text
    let mainText = '';
    const mainContent = $(
      'main, article, .privacy-policy, .content, #content, .legal, .policy, .privacy'
    );
    if (mainContent.length > 0) {
      mainText = mainContent.text();
    } else {
      mainText = $('body').text();
    }

    // Clean whitespace
    const cleanedText = mainText
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();

    console.log(
      `[CRAWL] Cheerio parse xong. Độ dài text trích xuất: ${cleanedText.length} ký tự (Thời gian: ${Date.now() - startTime
      }ms)`
    );

    // If text extracted is too short (< 200 chars), likely a JS SPA or blocking shell
    if (!cleanedText || cleanedText.length < 200) {
      console.warn(
        `[CRAWL] Nội dung quá ngắn (${cleanedText.length} ký tự), trang cần JS render (SPA) hoặc bị chặn.`
      );
      return res.status(422).json({
        error:
          'Trang này cần JavaScript để hiển thị nội dung, vui lòng dán trực tiếp văn bản chính sách vào ô "Dán văn bản điều khoản" thay vì dùng URL.',
      });
    }

    // Trim to reasonable length for analysis (max ~15,000 chars)
    const truncated = cleanedText.slice(0, 15000);

    return res.json({
      success: true,
      url,
      title,
      charCount: truncated.length,
      text: truncated,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[CRAWL] Ngoại lệ không mong muốn khi crawl:', errorMsg);
    return res.status(500).json({
      error: `Lỗi khi xử lý URL: ${errorMsg}. Vui lòng sao chép và dán trực tiếp văn bản vào tab "Dán văn bản điều khoản"!`,
    });
  }
});

const STANDARD_13_CRITERIA = [
  {
    id: 1,
    ten: 'Đồng thuận tự nguyện & Tùy chọn rút lại',
    moTa: 'Có sự đồng ý tự nguyện và cơ chế rút lại chấp thuận?',
    canCuPhapLy: 'GDPR Điều 6, 7; NĐ 13 Điều 11',
  },
  {
    id: 2,
    ten: 'Giới hạn mục đích xử lý dữ liệu',
    moTa: 'Mục đích thu thập rõ ràng, không sử dụng ngoài phạm vi?',
    canCuPhapLy: 'GDPR Điều 5(1)(b); NĐ 13 Điều 3',
  },
  {
    id: 3,
    ten: 'Tối thiểu hóa dữ liệu thu thập',
    moTa: 'Chỉ thu thập thông tin tương ứng với tính năng cần thiết?',
    canCuPhapLy: 'GDPR Điều 5(1)(c); Luật BV DLCN 2025',
  },
  {
    id: 4,
    ten: 'Tính chính xác & Cập nhật dữ liệu',
    moTa: 'Có biện pháp bảo đảm tính chuẩn xác của thông tin?',
    canCuPhapLy: 'GDPR Điều 5(1)(d)',
  },
  {
    id: 5,
    ten: 'Giới hạn thời gian lưu trữ',
    moTa: 'Quy định rõ thời hạn lưu giữ và cơ chế tiêu hủy?',
    canCuPhapLy: 'GDPR Điều 5(1)(e)',
  },
  {
    id: 6,
    ten: 'Minh bạch bên thứ ba nhận dữ liệu',
    moTa: 'Danh tính và phạm vi chuyển giao cho đối tác thứ ba?',
    canCuPhapLy: 'GDPR Điều 13, 14; NĐ 13 Điều 13',
  },
  {
    id: 7,
    ten: 'Quyền truy cập & Xuất dữ liệu',
    moTa: 'Người dùng có quyền xem lại và trích xuất hồ sơ?',
    canCuPhapLy: 'GDPR Điều 15, 20; NĐ 13 Điều 9',
  },
  {
    id: 8,
    ten: 'Quyền chỉnh sửa & Đính chính',
    moTa: 'Thủ tục yêu cầu sửa chữa dữ liệu sai lệch?',
    canCuPhapLy: 'GDPR Điều 16; NĐ 13 Điều 9',
  },
  {
    id: 9,
    ten: 'Quyền yêu cầu xóa & Tiêu hủy',
    moTa: 'Quy trình xóa dữ liệu và đóng tài khoản?',
    canCuPhapLy: 'GDPR Điều 17; NĐ 13 Điều 9',
  },
  {
    id: 10,
    ten: 'Kênh khiếu nại & Đầu mối DPO',
    moTa: 'Có thông tin liên hệ giải quyết phản ánh riêng tư?',
    canCuPhapLy: 'GDPR Điều 37, 38; NĐ 13 Điều 9',
  },
  {
    id: 11,
    ten: 'Biện pháp kỹ thuật & An toàn thông tin',
    moTa: 'Cam kết mã hóa và phòng ngừa truy cập trái phép?',
    canCuPhapLy: 'GDPR Điều 32; NĐ 13 Điều 26',
  },
  {
    id: 12,
    ten: 'Quy trình thông báo sự cố dữ liệu',
    moTa: 'Có cam kết thông báo cơ quan chức năng và người dùng khi rò rỉ?',
    canCuPhapLy: 'GDPR Điều 33, 34; NĐ 13 Điều 26',
  },
  {
    id: 13,
    ten: 'Bảo vệ dữ liệu trẻ em',
    moTa: 'Chính sách riêng biệt hoặc giới hạn độ tuổi người dùng?',
    canCuPhapLy: 'GDPR Điều 8; NĐ 13 Điều 20',
  },
];

// Endpoint: Summarize and audit Privacy Policy with Gemini AI
app.post('/api/summarize-policy', async (req: Request, res: Response) => {
  try {
    const { text, url, appName } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length < 40) {
      return res.status(400).json({ error: 'Nội dung chính sách bảo mật quá ngắn hoặc không hợp lệ!' });
    }

    const snippet = text.slice(0, 12000);

    const systemInstruction = `
Bạn là Chuyên gia Đánh giá Tuân thủ Bảo mật Dữ liệu (Privacy & Compliance Officer) cao cấp, am hiểu sâu sắc về:
- Quy định Bảo vệ Dữ liệu Chung Châu Âu (GDPR).
- Nghị định 13/2023/NĐ-CP và Luật Bảo vệ Dữ liệu Cá Nhân 2025 của Việt Nam.

NGUYÊN TẮC BẮT BUỘC:
1. CHỈ DỰA TRÊN VĂN BẢN ĐƯỢC CUNG CẤP: Phân tích khách quan, chính xác theo câu chữ có trong đoạn văn bản. Tuyệt đối KHÔNG suy đoán hoặc thêm thắt thông tin ngoài nội dung văn bản.
2. TUYỆT ĐỐI KHÔNG TÍNH ĐIỂM HOẶC PHẦN TRĂM: Không trả về riskScore, không riskRating, không ratingLabel, không tính phần trăm tuân thủ. Việc thống kê tổng hợp số lượng tiêu chí sẽ do hệ thống code phía sau tự động tính toán.
3. ĐÁNH GIÁ TỪNG TIÊU CHÍ (tieuChiDanhGia): Bạn phải đánh giá đúng 13 tiêu chí pháp lý chuẩn dưới đây. Trường "muc" BẮT BUỘC chỉ nhận 1 trong 3 giá trị chuỗi sau:
   - "ro_rang": Văn bản nêu rõ ràng, có điều khoản trực tiếp, minh bạch, đầy đủ.
   - "chua_day_du": Có nhắc đến nhưng còn chung chung, mơ hồ, chưa đầy đủ hoặc có điều kiện hạn chế.
   - "khong_de_cap": Văn bản hoàn toàn không được nhắc đến nội dung này.
4. BẰNG CHỨNG TRÍCH DẪN: Mỗi tiêu chí phải có trường "trichDan" chứa đoạn trích dẫn nguyên văn ngắn (DƯỚI 25 TỪ) lấy trực tiếp từ văn bản làm bằng chứng. Nếu mục đó không được nhắc đến trong văn bản thì bắt buộc ghi đúng là "Không đề cập", tuyệt đối không suy diễn.
5. KHÔNG TỰ BỊA SỐ ĐIỀU LUẬT NGOÀI DANH SÁCH: Chỉ sử dụng các căn cứ điều luật có thực:
   - GDPR: Điều 5, Điều 6, Điều 7, Điều 8, Điều 12, Điều 13, Điều 14, Điều 15, Điều 16, Điều 17, Điều 20, Điều 32, Điều 33, Điều 37.
   - Nghị định 13/2023/NĐ-CP: Điều 3, Điều 9, Điều 11, Điều 13, Điều 17, Điều 20, Điều 21, Điều 26.
   - Hoặc: Luật Bảo vệ Dữ liệu Cá Nhân 2025.
6. ĐIỂM ĐÁNG LƯU Ý (diemDangLuuY): Liệt kê các điểm cần thận trọng hoặc cần làm rõ thêm, KHÔNG dùng từ ngữ khẳng định tổ chức đã vi phạm pháp luật.

13 TIÊU CHÍ PHÁP LÝ BẮT BUỘC:
1. Đồng thuận tự nguyện & Quyền rút lại chấp thuận (GDPR Điều 6, 7; NĐ 13 Điều 11)
2. Giới hạn mục đích xử lý dữ liệu (GDPR Điều 5(1)(b); NĐ 13 Điều 3)
3. Tối thiểu hóa dữ liệu cá nhân thu thập (GDPR Điều 5(1)(c); Luật BV DLCN 2025)
4. Tính chính xác và cập nhật thông tin cá nhân (GDPR Điều 5(1)(d))
5. Giới hạn thời gian lưu trữ & Tiêu hủy dữ liệu (GDPR Điều 5(1)(e))
6. Minh bạch danh tính bên thứ ba nhận/chia sẻ dữ liệu (GDPR Điều 13, 14; NĐ 13 Điều 13)
7. Quyền truy cập và yêu cầu trích xuất dữ liệu của người dùng (GDPR Điều 15, 20; NĐ 13 Điều 9)
8. Quyền chỉnh sửa và đính chính dữ liệu (GDPR Điều 16; NĐ 13 Điều 9)
9. Quyền yêu cầu xóa dữ liệu & Rút lại đồng thuận (GDPR Điều 17; NĐ 13 Điều 9)
10. Kênh tiếp nhận và giải quyết khiếu nại, đầu mối DPO/liên hệ (GDPR Điều 37, 38; NĐ 13 Điều 9)
11. Biện pháp kỹ thuật và an toàn thông tin (GDPR Điều 32; NĐ 13 Điều 26)
12. Quy trình thông báo và ứng phó khi có sự cố rò rỉ dữ liệu (GDPR Điều 33, 34; NĐ 13 Điều 26)
13. Bảo vệ dữ liệu trẻ em và nhóm đối tượng yếu thế (GDPR Điều 8; NĐ 13 Điều 20)

Trả về kết quả ở định dạng JSON thuần túy theo cấu trúc:
{
  "appName": "Tên ứng dụng",
  "fivePoints": {
    "collectedData": "...",
    "purpose": "...",
    "thirdPartySharing": "...",
    "retentionPeriod": "...",
    "userRights": "..."
  },
  "tieuChiDanhGia": [
    {
      "id": 1,
      "ten": "Đồng thuận tự nguyện & Tùy chọn rút lại chấp thuận",
      "moTa": "Có sự đồng ý tự nguyện và cơ chế rút lại chấp thuận không?",
      "muc": "ro_rang" | "chua_day_du" | "khong_de_cap",
      "trichDan": "Trích dẫn nguyên văn dưới 25 từ từ văn bản gốc, hoặc 'Không đề cập'",
      "canCuPhapLy": "GDPR Điều 6-7, NĐ 13/2023 Điều 11"
    }
  ],
  "diemDangLuuY": [
    {
      "title": "Tiêu đề điểm đáng lưu ý",
      "tieuChiLienQuan": "Tiêu chí liên quan",
      "legalBasis": "Căn cứ pháp luật",
      "severity": "HIGH | MEDIUM | LOW",
      "detail": "Mô tả chi tiết điểm cần lưu ý"
    }
  ],
  "recommendations": ["Khuyến nghị 1", "Khuyến nghị 2"]
}
`;

    let generatedJsonStr = '';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Hãy phân tích Chính sách Bảo mật sau đây (App: ${appName || 'Không xác định'}, URL: ${url || 'Không có'}). Chỉ dựa trên văn bản dưới đây, không suy đoán ngoài văn bản, không tính điểm hay phần trăm, mục nào không có thì ghi "khong_de_cap":\n\n${snippet}`,
              },
            ],
          },
        ],
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      generatedJsonStr = response.text || '';
    } catch (apiErr) {
      console.warn('Gemini API call failed, falling back to heuristic engine:', apiErr);
    }

    let parsedResult: any;
    if (generatedJsonStr) {
      try {
        const cleaned = generatedJsonStr
          .replace(/^```json\s*/i, '')
          .replace(/```\s*$/i, '')
          .trim();
        parsedResult = JSON.parse(cleaned);
      } catch (parseErr) {
        console.warn('Failed to parse AI JSON output:', parseErr);
      }
    }

    const lower = snippet.toLowerCase();
    const hasConsent = lower.includes('đồng thuận') || lower.includes('chấp thuận') || lower.includes('consent');
    const hasThirdParty = lower.includes('bên thứ ba') || lower.includes('đối tác') || lower.includes('third party') || lower.includes('chia sẻ');
    const hasRetention = lower.includes('thời gian lưu') || lower.includes('lưu trữ') || lower.includes('năm') || lower.includes('tháng');
    const hasRights = lower.includes('quyền') || lower.includes('xóa') || lower.includes('chỉnh sửa') || lower.includes('khiếu nại');
    const hasSecurity = lower.includes('mã hóa') || lower.includes('bảo mật') || lower.includes('an toàn') || lower.includes('ssl');
    const hasChildren = lower.includes('trẻ em') || lower.includes('16 tuổi') || lower.includes('children');
    const hasBreach = lower.includes('sự cố') || lower.includes('rò rỉ') || lower.includes('thông báo vi phạm');

    if (parsedResult) {
      // Normalize tieuChiDanhGia to strictly 13 items
      const rawCriteria = parsedResult.tieuChiDanhGia || parsedResult.goldenRules || [];
      const criteriaMap = new Map<number, any>();
      if (Array.isArray(rawCriteria)) {
        rawCriteria.forEach((tc: any, idx: number) => {
          const id = Number(tc.id || tc.ruleNumber) || (idx + 1);
          criteriaMap.set(id, tc);
        });
      }

      parsedResult.tieuChiDanhGia = STANDARD_13_CRITERIA.map((std) => {
        const found = criteriaMap.get(std.id);
        if (found) {
          let m: 'ro_rang' | 'chua_day_du' | 'khong_de_cap' = 'ro_rang';
          const rawMuc = String(found.muc || found.status || '').toLowerCase();
          if (rawMuc === 'ro_rang' || rawMuc === 'clear' || found.passed === true) {
            m = 'ro_rang';
          } else if (rawMuc === 'khong_de_cap' || rawMuc === 'not_mentioned') {
            m = 'khong_de_cap';
          } else if (rawMuc === 'chua_day_du' || rawMuc === 'incomplete' || found.passed === false) {
            m = 'chua_day_du';
          } else {
            m = 'chua_day_du';
          }
          return {
            id: std.id,
            ten: std.ten,
            moTa: std.moTa,
            muc: m,
            trichDan: found.trichDan || found.detail || (m === 'khong_de_cap' ? 'Không đề cập' : 'Nêu trong văn bản'),
            canCuPhapLy: std.canCuPhapLy,
          };
        }

        // If Gemini omitted this criterion, compute standard default from text:
        let autoMuc: 'ro_rang' | 'chua_day_du' | 'khong_de_cap' = 'chua_day_du';
        let autoTrichDan = 'Không đề cập trực tiếp trong văn bản';
        if (std.id === 1) {
          autoMuc = hasConsent ? 'ro_rang' : 'chua_day_du';
          autoTrichDan = hasConsent ? 'Có nhắc đến sự đồng thuận/chấp thuận.' : 'Chưa thể hiện rõ cơ chế tự nguyện.';
        } else if (std.id === 2 || std.id === 3) {
          autoMuc = 'ro_rang';
          autoTrichDan = 'Nêu trong mục đích và phạm vi thu thập.';
        } else if (std.id === 4) {
          autoMuc = hasRights ? 'ro_rang' : 'chua_day_du';
          autoTrichDan = hasRights ? 'Có cơ chế xác nhận và kiểm tra thông tin.' : 'Không đề cập';
        } else if (std.id === 5) {
          autoMuc = hasRetention ? 'ro_rang' : 'khong_de_cap';
          autoTrichDan = hasRetention ? 'Có quy định về thời gian lưu trữ.' : 'Không đề cập';
        } else if (std.id === 6) {
          autoMuc = hasThirdParty ? 'chua_day_du' : 'khong_de_cap';
          autoTrichDan = hasThirdParty ? 'Có nhắc đến chia sẻ bên thứ ba.' : 'Không đề cập';
        } else if (std.id >= 7 && std.id <= 9) {
          autoMuc = hasRights ? 'ro_rang' : 'khong_de_cap';
          autoTrichDan = hasRights ? 'Có đề cập quyền của người dùng.' : 'Không đề cập';
        } else if (std.id === 10) {
          autoMuc = (lower.includes('liên hệ') || lower.includes('email')) ? 'ro_rang' : 'chua_day_du';
          autoTrichDan = 'Có thông tin kênh liên hệ giải đáp.';
        } else if (std.id === 11) {
          autoMuc = hasSecurity ? 'ro_rang' : 'khong_de_cap';
          autoTrichDan = hasSecurity ? 'Có cam kết áp dụng giải pháp an toàn thông tin.' : 'Không đề cập';
        } else if (std.id === 12) {
          autoMuc = hasBreach ? 'ro_rang' : 'khong_de_cap';
          autoTrichDan = hasBreach ? 'Có quy trình thông báo khi có sự cố.' : 'Không đề cập';
        } else if (std.id === 13) {
          autoMuc = hasChildren ? 'ro_rang' : 'khong_de_cap';
          autoTrichDan = hasChildren ? 'Có điều khoản về người dùng dưới tuổi thành niên.' : 'Không đề cập';
        }

        return {
          id: std.id,
          ten: std.ten,
          moTa: std.moTa,
          muc: autoMuc,
          trichDan: autoTrichDan,
          canCuPhapLy: std.canCuPhapLy,
        };
      });
      parsedResult.goldenRules = parsedResult.tieuChiDanhGia;

      // Ensure diemDangLuuY uses tieuChiLienQuan
      const rawNotes = parsedResult.diemDangLuuY || parsedResult.violations || [];
      parsedResult.diemDangLuuY = rawNotes.map((n: any) => ({
        title: n.title || 'Điểm cần lưu ý',
        tieuChiLienQuan: n.tieuChiLienQuan || n.ruleViolated || 'Quy tắc bảo vệ dữ liệu',
        legalBasis: n.legalBasis || 'NĐ 13/2023/NĐ-CP & GDPR',
        severity: n.severity || 'MEDIUM',
        detail: n.detail || '',
        ruleViolated: n.tieuChiLienQuan || n.ruleViolated || 'Quy tắc bảo vệ dữ liệu',
      }));
      parsedResult.violations = parsedResult.diemDangLuuY;

      // Clean up legacy risk score fields if AI accidentally provided them
      delete parsedResult.riskScore;
      delete parsedResult.riskRating;
      delete parsedResult.ratingLabel;
    }

    // Fallback heuristic if Gemini returned malformed JSON or unavailable
    if (!parsedResult) {
      const lower = snippet.toLowerCase();
      const hasConsent = lower.includes('đồng thuận') || lower.includes('chấp thuận') || lower.includes('consent');
      const hasThirdParty = lower.includes('bên thứ ba') || lower.includes('đối tác') || lower.includes('third party') || lower.includes('chia sẻ');
      const hasRetention = lower.includes('thời gian lưu') || lower.includes('lưu trữ') || lower.includes('năm') || lower.includes('tháng');
      const hasRights = lower.includes('quyền') || lower.includes('xóa') || lower.includes('chỉnh sửa') || lower.includes('khiếu nại');
      const hasSecurity = lower.includes('mã hóa') || lower.includes('bảo mật') || lower.includes('an toàn') || lower.includes('ssl');
      const hasChildren = lower.includes('trẻ em') || lower.includes('16 tuổi') || lower.includes('children');
      const hasBreach = lower.includes('sự cố') || lower.includes('rò rỉ') || lower.includes('thông báo vi phạm');

      const notes = [];
      if (!hasRights) {
        notes.push({
          title: 'Điều khoản quyền của người dùng chưa được đề cập rõ',
          tieuChiLienQuan: 'Quyền của chủ thể dữ liệu (Quyền xóa, chỉnh sửa)',
          legalBasis: 'GDPR Điều 12-23 & Nghị định 13/2023/NĐ-CP Điều 9',
          severity: 'HIGH' as const,
          detail: 'Văn bản cung cấp chưa nêu rõ kênh hoặc thủ tục thực thi quyền xóa, chỉnh sửa thông tin của người dùng.',
          ruleViolated: 'Quyền của chủ thể dữ liệu',
        });
      }
      if (!hasRetention) {
        notes.push({
          title: 'Thời hạn lưu trữ dữ liệu chưa xác định cụ thể',
          tieuChiLienQuan: 'Giới hạn thời gian lưu trữ & Tiêu hủy dữ liệu',
          legalBasis: 'GDPR Điều 5(1)(e)',
          severity: 'MEDIUM' as const,
          detail: 'Văn bản chưa làm rõ mốc thời gian lưu giữ hoặc tiêu hủy dữ liệu khi người dùng kết thúc dịch vụ.',
          ruleViolated: 'Giới hạn thời gian lưu trữ',
        });
      }

      const standardCriteria = STANDARD_13_CRITERIA.map((std) => {
        let autoMuc: 'ro_rang' | 'chua_day_du' | 'khong_de_cap' = 'chua_day_du';
        let autoTrichDan = 'Không đề cập';
        if (std.id === 1) {
          autoMuc = hasConsent ? 'ro_rang' : 'chua_day_du';
          autoTrichDan = hasConsent ? 'Có nhắc đến sự chấp thuận của người dùng.' : 'Chưa thể hiện rõ cơ chế đồng ý tự nguyện.';
        } else if (std.id === 2 || std.id === 3) {
          autoMuc = 'ro_rang';
          autoTrichDan = 'Mục đích và dữ liệu cơ bản được mô tả trong văn bản.';
        } else if (std.id === 4) {
          autoMuc = hasRights ? 'ro_rang' : 'chua_day_du';
          autoTrichDan = hasRights ? 'Cho phép người dùng kiểm tra thông tin.' : 'Không đề cập';
        } else if (std.id === 5) {
          autoMuc = hasRetention ? 'ro_rang' : 'khong_de_cap';
          autoTrichDan = hasRetention ? 'Có đề cập thời hạn lưu trữ.' : 'Không đề cập';
        } else if (std.id === 6) {
          autoMuc = hasThirdParty ? 'chua_day_du' : 'khong_de_cap';
          autoTrichDan = hasThirdParty ? 'Có nhắc đến đối tác thứ ba.' : 'Không đề cập';
        } else if (std.id >= 7 && std.id <= 9) {
          autoMuc = hasRights ? 'ro_rang' : 'khong_de_cap';
          autoTrichDan = hasRights ? 'Có đề cập quyền của người dùng đối với dữ liệu.' : 'Không đề cập';
        } else if (std.id === 10) {
          autoMuc = (lower.includes('liên hệ') || lower.includes('email')) ? 'ro_rang' : 'chua_day_du';
          autoTrichDan = 'Có địa chỉ liên hệ tiếp nhận thông tin.';
        } else if (std.id === 11) {
          autoMuc = hasSecurity ? 'ro_rang' : 'khong_de_cap';
          autoTrichDan = hasSecurity ? 'Có cam kết áp dụng giải pháp an ninh mạng.' : 'Không đề cập';
        } else if (std.id === 12) {
          autoMuc = hasBreach ? 'ro_rang' : 'khong_de_cap';
          autoTrichDan = hasBreach ? 'Có quy trình thông báo khi có sự cố.' : 'Không đề cập';
        } else if (std.id === 13) {
          autoMuc = hasChildren ? 'ro_rang' : 'khong_de_cap';
          autoTrichDan = hasChildren ? 'Có điều khoản về độ tuổi người dùng.' : 'Không đề cập';
        }

        return {
          id: std.id,
          ten: std.ten,
          moTa: std.moTa,
          muc: autoMuc,
          trichDan: autoTrichDan,
          canCuPhapLy: std.canCuPhapLy,
        };
      });

      parsedResult = {
        appName: appName || 'Ứng dụng phân tích',
        fivePoints: {
          collectedData: snippet.slice(0, 160) + '...',
          purpose: 'Vận hành dịch vụ, quản lý tài khoản, nâng cao trải nghiệm người dùng.',
          thirdPartySharing: hasThirdParty
            ? 'Có đề cập chuyển giao thông tin cho đối tác hoặc nhà cung cấp dịch vụ.'
            : 'Không đề cập trong đoạn trích văn bản.',
          retentionPeriod: hasRetention
            ? 'Có đề cập lưu trữ theo thời hạn cung cấp dịch vụ hoặc quy định pháp luật.'
            : 'Không đề cập thời hạn cụ thể trong đoạn trích văn bản.',
          userRights: hasRights
            ? 'Có đề cập quyền yêu cầu truy cập, điều chỉnh hoặc xóa thông tin cá nhân.'
            : 'Không đề cập quy trình cụ thể cho quyền của chủ thể dữ liệu trong văn bản.',
        },
        tieuChiDanhGia: standardCriteria,
        goldenRules: standardCriteria,
        diemDangLuuY: notes,
        violations: notes,
        recommendations: [
          'Bổ sung danh mục chi tiết các bên thứ ba nhận dữ liệu.',
          'Quy định rõ ràng mốc thời gian lưu trữ và kênh tiếp nhận yêu cầu xóa thông tin của người dùng.',
        ],
      };
    }

    const now = new Date();
    const analyzedAt = `${now.toLocaleDateString('vi-VN')} - ${now.toLocaleTimeString('vi-VN')}`;

    return res.json({
      success: true,
      data: {
        ...parsedResult,
        sourceUrl: url,
        analyzedAt,
        charCount: text.length,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Summarize error:', errorMsg);
    return res.status(500).json({ error: `Lỗi xử lý tóm tắt: ${errorMsg}` });
  }
});

// Dev server or Production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Privacy Compass] Fullstack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

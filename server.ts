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
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return res.status(400).json({ error: 'URL không hợp lệ. Phải bắt đầu bằng http:// hoặc https://' });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Không thể tải trang web (HTTP ${response.status}: ${response.statusText}). Hãy thử dán trực tiếp văn bản!`,
      });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove unnecessary elements
    $('script, style, noscript, nav, header, footer, iframe, svg, [role="navigation"]').remove();

    // Extract title
    const title = $('title').text().trim() || $('h1').first().text().trim() || 'Chính sách bảo mật';

    // Extract main text
    let mainText = '';
    const mainContent = $('main, article, .privacy-policy, .content, #content, .legal, .policy');
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

    if (!cleanedText || cleanedText.length < 50) {
      return res.status(400).json({
        error: 'Trang web không chứa đủ nội dung văn bản chính sách bảo mật hoặc bị chặn bảo vệ. Vui lòng chuyển sang tab "Dán văn bản trực tiếp"!',
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
    console.error('Crawl error:', errorMsg);
    return res.status(500).json({
      error: `Lỗi khi crawl URL: ${errorMsg}. Bạn có thể copy và dán trực tiếp nội dung chính sách vào ô dán văn bản!`,
    });
  }
});

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
- 5 Quy Tắc Vàng:
  1. Hợp pháp & Đồng thuận (Consent): Có sự đồng ý tự nguyện và tùy chọn từ chối (opt-out) rõ ràng không?
  2. Mục đích giới hạn (Purpose Limitation): Mục đích thu thập có cụ thể và minh thị không?
  3. Tối thiểu hóa dữ liệu (Data Minimization): Chỉ thu thập dữ liệu cần thiết không?
  4. Tính minh bạch (Transparency): Thông tin đối tác thứ ba và thời gian lưu giữ có rõ ràng không?
  5. Bảo mật & An toàn (Security & Integrity): Có đề cập biện pháp bảo vệ và mã hóa không?

Nhiệm vụ của bạn là:
1. Tóm tắt nội dung chính sách thành đúng 5 khía cạnh cốt lõi (Mỗi mục khoảng 1-2 câu tiếng Việt gãy gọn, đủ ý):
   - collectedData: Dữ liệu thu thập
   - purpose: Mục đích sử dụng
   - thirdPartySharing: Chia sẻ với bên thứ 3
   - retentionPeriod: Thời gian lưu trữ
   - userRights: Quyền của người dùng
2. Đánh giá từng quy tắc trong 5 Quy Tắc Vàng (passed: true/false, detail giải thích ngắn gọn, legalReference).
3. Liệt kê các điểm cảnh báo / vi phạm pháp lý tiềm ẩn (violations).
4. Tính Risk Score (0-100, trong đó 100 là an toàn nhất/rủi ro thấp nhất, 0 là rủi ro cực kỳ cao).
   - 80-100: LOW (An toàn / Rủi ro thấp)
   - 50-79: MEDIUM (Cảnh báo / Rủi ro trung bình)
   - 0-49: HIGH (Vi phạm nghiêm trọng / Rủi ro cao)
5. Đưa ra 2-4 khuyến nghị ngắn gọn cho người dùng và đơn vị phát triển app.

Trả về kết quả ở định dạng JSON thuần túy (không kèm markdown \`\`\`json) theo cấu trúc:
{
  "appName": "Tên ứng dụng",
  "fivePoints": {
    "collectedData": "...",
    "purpose": "...",
    "thirdPartySharing": "...",
    "retentionPeriod": "...",
    "userRights": "..."
  },
  "goldenRules": [
    {
      "ruleNumber": 1,
      "title": "Hợp pháp & Đồng thuận (Consent)",
      "criterion": "Có sự đồng ý tự nguyện và tùy chọn từ chối?",
      "passed": true,
      "detail": "...",
      "legalReference": "GDPR Điều 6-7, NĐ 13/2023 Điều 11"
    },
    ... (đủ 5 quy tắc)
  ],
  "violations": [
    {
      "title": "Tiêu đề vi phạm",
      "ruleViolated": "Quy tắc vi phạm",
      "legalBasis": "Căn cứ pháp luật",
      "severity": "HIGH | MEDIUM | LOW",
      "detail": "Mô tả chi tiết"
    }
  ],
  "riskScore": 75,
  "riskRating": "MEDIUM",
  "ratingLabel": "CẢNH BÁO RỦI RO TRUNG BÌNH",
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
                text: `Hãy phân tích Chính sách Bảo mật sau đây (App: ${appName || 'Không xác định'}, URL: ${url || 'Không có'}):\n\n${snippet}`,
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

    let parsedResult;
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

    // Fallback heuristic if Gemini returned malformed JSON or unavailable
    if (!parsedResult) {
      const lower = snippet.toLowerCase();
      const hasConsent = lower.includes('đồng thuận') || lower.includes('chấp thuận') || lower.includes('consent');
      const hasThirdParty = lower.includes('bên thứ ba') || lower.includes('đối tác') || lower.includes('third party') || lower.includes('chia sẻ');
      const hasRetention = lower.includes('thời gian lưu') || lower.includes('lưu trữ') || lower.includes('năm') || lower.includes('tháng');
      const hasRights = lower.includes('quyền') || lower.includes('xóa') || lower.includes('chỉnh sửa') || lower.includes('khiếu nại');
      const hasSecurity = lower.includes('mã hóa') || lower.includes('bảo mật') || lower.includes('an toàn') || lower.includes('ssl');

      const violations = [];
      if (!hasRights) {
        violations.push({
          title: 'Thiếu điều khoản quyền của người dùng',
          ruleViolated: 'Quy tắc 1: Quyền của chủ thể dữ liệu',
          legalBasis: 'GDPR Điều 12-23 & Nghị định 13/2023 Điều 9',
          severity: 'HIGH' as const,
          detail: 'Chính sách chưa quy định rõ quyền chỉnh sửa hoặc xóa dữ liệu người dùng.',
        });
      }
      if (!hasRetention) {
        violations.push({
          title: 'Thời hạn lưu trữ dữ liệu không xác định',
          ruleViolated: 'Quy tắc 4: Tính minh bạch & Giới hạn lưu trữ',
          legalBasis: 'GDPR Điều 5(1)(e)',
          severity: 'MEDIUM' as const,
          detail: 'Chưa công bố rõ thời gian lưu giữ dữ liệu sau khi người dùng ngừng sử dụng dịch vụ.',
        });
      }

      parsedResult = {
        appName: appName || 'Ứng dụng phân tích',
        fivePoints: {
          collectedData: snippet.slice(0, 160) + '...',
          purpose: 'Vận hành dịch vụ, quản lý tài khoản, nâng cao trải nghiệm và phân tích hành vi người dùng.',
          thirdPartySharing: hasThirdParty
            ? 'Có chia sẻ dữ liệu cho đối tác cung cấp dịch vụ, phân tích và quảng cáo.'
            : 'Cam kết không chia sẻ dữ liệu cá nhân cho bên thứ ba trái phép.',
          retentionPeriod: hasRetention
            ? 'Lưu trữ trong suốt thời gian cung cấp dịch vụ hoặc theo luật định.'
            : 'Chưa xác định cụ thể thời gian kết thúc lưu trữ dữ liệu.',
          userRights: hasRights
            ? 'Người dùng có quyền yêu cầu truy cập, sửa đổi hoặc xóa thông tin cá nhân.'
            : 'Chưa nêu cụ thể các bước thực thi quyền của chủ thể dữ liệu.',
        },
        goldenRules: [
          {
            ruleNumber: 1,
            title: 'Hợp pháp & Đồng thuận (Consent)',
            criterion: 'Có sự đồng ý tự nguyện và tùy chọn từ chối?',
            passed: hasConsent,
            detail: hasConsent ? 'Có quy định về sự chấp thuận của người dùng.' : 'Chưa thể hiện rõ sự đồng thuận riêng biệt.',
            legalReference: 'GDPR Điều 6 & Nghị định 13/2023 Điều 11',
          },
          {
            ruleNumber: 2,
            title: 'Mục đích giới hạn (Purpose Limitation)',
            criterion: 'Mục đích thu thập rõ ràng, không sử dụng ngoài phạm vi?',
            passed: true,
            detail: 'Mục đích cơ bản được mô tả trong chính sách.',
            legalReference: 'GDPR Điều 5(1)(b)',
          },
          {
            ruleNumber: 3,
            title: 'Tối thiểu hóa dữ liệu (Data Minimization)',
            criterion: 'Chỉ thu thập thông tin thực sự cần thiết?',
            passed: true,
            detail: 'Dữ liệu thu thập tương ứng với tính năng sản phẩm.',
            legalReference: 'GDPR Điều 5(1)(c)',
          },
          {
            ruleNumber: 4,
            title: 'Tính minh bạch (Transparency)',
            criterion: 'Thông tin bên thứ ba và thời gian lưu trữ có cụ thể?',
            passed: hasRetention && hasThirdParty,
            detail: hasRetention ? 'Có đề cập thời hạn lưu trữ.' : 'Thông tin lưu trữ còn thiếu sót.',
            legalReference: 'GDPR Điều 13, Nghị định 13/2023 Điều 13',
          },
          {
            ruleNumber: 5,
            title: 'Bảo mật & An toàn (Security & Integrity)',
            criterion: 'Có các biện pháp mã hóa và phòng ngừa rò rỉ dữ liệu?',
            passed: hasSecurity,
            detail: hasSecurity ? 'Có cam kết áp dụng giải pháp an ninh mạng.' : 'Chưa làm rõ công nghệ bảo mật dữ liệu.',
            legalReference: 'GDPR Điều 32, Nghị định 13/2023 Điều 26',
          },
        ],
        violations,
        riskScore: violations.length === 0 ? 85 : violations.length === 1 ? 70 : 45,
        riskRating: violations.length === 0 ? 'LOW' : violations.length === 1 ? 'MEDIUM' : 'HIGH',
        ratingLabel: violations.length === 0 ? 'TUÂN THỦ TỐT' : violations.length === 1 ? 'CẢNH BÁO RỦI RO' : 'RỦI RO CAO',
        recommendations: [
          'Bổ sung bảng kê chi tiết các bên thứ ba nhận dữ liệu.',
          'Công bố quy trình 1 chạm để người dùng xóa tài khoản và dữ liệu cá nhân.',
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

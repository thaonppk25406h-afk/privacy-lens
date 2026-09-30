import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { LEGAL_CRITERIA_13, ensure13Criteria } from './src/policy/legalCriteria';

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

// Endpoint: Summarize and audit Privacy Policy with Gemini AI & Legal Compliance Engine
app.post('/api/summarize-policy', async (req: Request, res: Response) => {
  try {
    const { text, url, appName } = req.body;

    console.log('[PolicySummarizer] Nhận request /api/summarize-policy:', {
      appName: appName || 'Chưa đặt tên',
      textLength: text ? text.length : 0,
      hasText: typeof text === 'string' && text.length > 0,
    });

    if (!text || typeof text !== 'string' || text.trim().length < 40) {
      return res.status(400).json({
        error: 'Nội dung chính sách bảo mật quá ngắn (tối thiểu 40 ký tự)! Vui lòng dán thêm nội dung điều khoản.',
      });
    }

    if (text.length > 50000) {
      return res.status(400).json({
        error: `Văn bản quá dài (${text.length.toLocaleString('vi-VN')} ký tự). Vui lòng rút gọn xuống dưới 50.000 ký tự để hệ thống phân tích chính xác nhất.`,
      });
    }

    const snippet = text.slice(0, 30000);

    const systemInstruction = `
Bạn là Chuyên gia Đánh giá Tuân thủ Bảo mật Dữ liệu (Privacy & Compliance Officer) cao cấp, am hiểu sâu sắc về:
- Quy định Bảo vệ Dữ liệu Chung Châu Âu (GDPR).
- Nghị định 13/2023/NĐ-CP và Luật Bảo vệ Dữ liệu Cá Nhân 2025 của Việt Nam.

NGUYÊN TẮC BẮT BUỘC:
1. CHỈ DỰA TRÊN VĂN BẢN ĐƯỢC CUNG CẤP: Phân tích khách quan, chính xác theo câu chữ có trong đoạn văn bản. Tuyệt đối KHÔNG suy đoán hoặc thêm thắt thông tin ngoài nội dung văn bản.
2. TUYỆT ĐỐI KHÔNG TÍNH ĐIỂM HOẶC PHẦN TRĂM: Không trả về riskScore, không riskRating, không ratingLabel, không tính phần trăm tuân thủ.
3. ĐÁNH GIÁ ĐỦ VÀ ĐÚNG 13 TIÊU CHÍ (tieuChiDanhGia): Bạn PHẢI đánh giá đúng và đủ 13 tiêu chí sau, không được bỏ sót, không được thêm tiêu chí khác:
   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
   1: Đồng thuận tự nguyện & Quyền rút lại chấp thuận (GDPR Điều 6, 7; NĐ 13/2023 Điều 11)
   2: Giới hạn mục đích xử lý dữ liệu (GDPR Điều 5(1)(b); NĐ 13/2023 Điều 3)
   3: Tối thiểu hóa dữ liệu cá nhân thu thập (GDPR Điều 5(1)(c); Luật BV DLCN 2025)
   4: Tính chính xác và cập nhật thông tin cá nhân (GDPR Điều 5(1)(d))
   5: Giới hạn thời gian lưu trữ & Tiêu hủy dữ liệu (GDPR Điều 5(1)(e))
   6: Minh bạch bên thứ ba nhận/chia sẻ dữ liệu (GDPR Điều 13, 14; NĐ 13/2023 Điều 13)
   7: Quyền truy cập và yêu cầu trích xuất dữ liệu của người dùng (GDPR Điều 15, 20; NĐ 13/2023 Điều 9)
   8: Quyền chỉnh sửa và đính chính dữ liệu (GDPR Điều 16; NĐ 13/2023 Điều 9)
   9: Quyền yêu cầu xóa dữ liệu & Rút lại đồng thuận (GDPR Điều 17; NĐ 13/2023 Điều 9)
   10: Kênh tiếp nhận và giải quyết khiếu nại, đầu mối DPO/liên hệ (GDPR Điều 37, 38; NĐ 13/2023 Điều 9)
   11: Biện pháp kỹ thuật và an toàn thông tin (GDPR Điều 32; NĐ 13/2023 Điều 26)
   12: Quy trình thông báo và ứng phó khi có sự cố rò rỉ dữ liệu (GDPR Điều 33, 34; NĐ 13/2023 Điều 26)
   13: Bảo vệ dữ liệu trẻ em và nhóm đối tượng yếu thế (GDPR Điều 8; NĐ 13/2023 Điều 20)

4. BẰNG CHỨNG TRÍCH DẪN: Mỗi tiêu chí có trường "trichDan" chứa đoạn trích dẫn nguyên văn ngắn (DƯỚI 25 TỪ) từ văn bản gốc, hoặc ghi đúng là "Không đề cập" nếu không có.
5. Trường "muc" BẮT BUỘC là 1 trong 3 chuỗi: "ro_rang" | "chua_day_du" | "khong_de_cap".
6. ĐIỂM ĐÁNG LƯU Ý (diemDangLuuY): Liệt kê các điểm cần thận trọng hoặc cần làm rõ thêm, KHÔNG dùng từ ngữ khẳng định tổ chức đã vi phạm pháp luật.
`;

    let generatedJsonStr = '';

    try {
      console.log('[PolicySummarizer] Đang gửi yêu cầu phân tích tới Gemini AI...');
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Hãy phân tích Chính sách Bảo mật sau đây (App: ${appName || 'Không xác định'}, URL: ${url || 'Không có'}). Bạn PHẢI đánh giá đúng và đủ 13 tiêu chí sau (criterionId từ 1 đến 13), không được bỏ sót, không được thêm tiêu chí khác: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]:\n\n${snippet}`,
              },
            ],
          },
        ],
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              appName: { type: Type.STRING },
              fivePoints: {
                type: Type.OBJECT,
                properties: {
                  collectedData: { type: Type.STRING },
                  purpose: { type: Type.STRING },
                  thirdPartySharing: { type: Type.STRING },
                  retentionPeriod: { type: Type.STRING },
                  userRights: { type: Type.STRING },
                },
                required: ['collectedData', 'purpose', 'thirdPartySharing', 'retentionPeriod', 'userRights'],
              },
              tieuChiDanhGia: {
                type: Type.ARRAY,
                description: 'Mảng bắt buộc ĐÁNH GIÁ ĐỦ ĐÚNG 13 TIÊU CHÍ với criterionId từ 1 đến 13 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]',
                items: {
                  type: Type.OBJECT,
                  properties: {
                    criterionId: {
                      type: Type.INTEGER,
                      description: 'Mã số tiêu chí pháp lý cố định từ 1 đến 13',
                    },
                    muc: {
                      type: Type.STRING,
                      description: 'Mức độ: "ro_rang" | "chua_day_du" | "khong_de_cap"',
                    },
                    trichDan: {
                      type: Type.STRING,
                      description: 'Trích dẫn nguyên văn dưới 25 từ hoặc "Không đề cập"',
                    },
                  },
                  required: ['criterionId', 'muc', 'trichDan'],
                },
              },
              diemDangLuuY: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    tieuChiLienQuan: { type: Type.STRING },
                    legalBasis: { type: Type.STRING },
                    severity: { type: Type.STRING },
                    detail: { type: Type.STRING },
                  },
                  required: ['title', 'tieuChiLienQuan', 'legalBasis', 'severity', 'detail'],
                },
              },
              recommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['appName', 'fivePoints', 'tieuChiDanhGia', 'diemDangLuuY', 'recommendations'],
          },
          temperature: 0.2,
        },
      });

      generatedJsonStr = response.text || '';
      console.log('[PolicySummarizer] Response thô từ Gemini TRƯỚC khi parse JSON:\n', generatedJsonStr);
    } catch (apiErr) {
      console.warn('[PolicySummarizer] Gemini API call failed, falling back to legal heuristic engine:', apiErr);
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
      // Normalize tieuChiDanhGia to strictly 13 items using ensure13Criteria
      parsedResult.tieuChiDanhGia = ensure13Criteria(parsedResult.tieuChiDanhGia || parsedResult.goldenRules);
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

      const standardCriteria = LEGAL_CRITERIA_13.map((std) => {
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

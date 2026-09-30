import { TieuChiDanhGia, TieuChiMuc } from '../types';

export interface LegalCriterionDef {
  id: number;
  criterionId: number;
  ten: string;
  moTa: string;
  canCuPhapLy: string;
}

export const LEGAL_CRITERIA_13: LegalCriterionDef[] = [
  {
    id: 1,
    criterionId: 1,
    ten: 'Đồng thuận tự nguyện & Quyền rút lại chấp thuận',
    moTa: 'Có sự đồng ý tự nguyện và cơ chế rút lại chấp thuận không?',
    canCuPhapLy: 'GDPR Điều 6, 7; NĐ 13/2023 Điều 11',
  },
  {
    id: 2,
    criterionId: 2,
    ten: 'Giới hạn mục đích xử lý dữ liệu',
    moTa: 'Mục đích thu thập rõ ràng, minh bạch, không sử dụng ngoài phạm vi?',
    canCuPhapLy: 'GDPR Điều 5(1)(b); NĐ 13/2023 Điều 3',
  },
  {
    id: 3,
    criterionId: 3,
    ten: 'Tối thiểu hóa dữ liệu cá nhân thu thập',
    moTa: 'Chỉ thu thập thông tin cá nhân cần thiết, tương ứng với tính năng?',
    canCuPhapLy: 'GDPR Điều 5(1)(c); Luật BV DLCN 2025',
  },
  {
    id: 4,
    criterionId: 4,
    ten: 'Tính chính xác và cập nhật thông tin cá nhân',
    moTa: 'Có biện pháp bảo đảm tính chuẩn xác và cho phép cập nhật thông tin?',
    canCuPhapLy: 'GDPR Điều 5(1)(d)',
  },
  {
    id: 5,
    criterionId: 5,
    ten: 'Giới hạn thời gian lưu trữ & Tiêu hủy dữ liệu',
    moTa: 'Quy định rõ thời hạn lưu giữ hoặc tiêu chí xác định thời hạn và cơ chế tiêu hủy?',
    canCuPhapLy: 'GDPR Điều 5(1)(e)',
  },
  {
    id: 6,
    criterionId: 6,
    ten: 'Minh bạch bên thứ ba nhận/chia sẻ dữ liệu',
    moTa: 'Nêu rõ danh tính và phạm vi chuyển giao cho đối tác, nhà cung cấp thứ ba?',
    canCuPhapLy: 'GDPR Điều 13, 14; NĐ 13/2023 Điều 13',
  },
  {
    id: 7,
    criterionId: 7,
    ten: 'Quyền truy cập và yêu cầu trích xuất dữ liệu của người dùng',
    moTa: 'Người dùng có quyền xem lại và yêu cầu cung cấp bản sao hồ sơ dữ liệu?',
    canCuPhapLy: 'GDPR Điều 15, 20; NĐ 13/2023 Điều 9',
  },
  {
    id: 8,
    criterionId: 8,
    ten: 'Quyền chỉnh sửa và đính chính dữ liệu',
    moTa: 'Quy trình và quyền yêu cầu sửa đổi thông tin cá nhân chưa chính xác?',
    canCuPhapLy: 'GDPR Điều 16; NĐ 13/2023 Điều 9',
  },
  {
    id: 9,
    criterionId: 9,
    ten: 'Quyền yêu cầu xóa dữ liệu & Rút lại đồng thuận',
    moTa: 'Quy trình xóa vĩnh viễn dữ liệu (Right to be forgotten) và xóa tài khoản?',
    canCuPhapLy: 'GDPR Điều 17; NĐ 13/2023 Điều 9',
  },
  {
    id: 10,
    criterionId: 10,
    ten: 'Kênh tiếp nhận khiếu nại & Đầu mối DPO',
    moTa: 'Có thông tin liên hệ, email hoặc nhân sự phụ trách bảo vệ dữ liệu?',
    canCuPhapLy: 'GDPR Điều 37, 38; NĐ 13/2023 Điều 9',
  },
  {
    id: 11,
    criterionId: 11,
    ten: 'Biện pháp kỹ thuật và an toàn thông tin',
    moTa: 'Cam kết mã hóa, bảo mật kỹ thuật và phòng ngừa truy cập trái phép?',
    canCuPhapLy: 'GDPR Điều 32; NĐ 13/2023 Điều 26',
  },
  {
    id: 12,
    criterionId: 12,
    ten: 'Quy trình thông báo và ứng phó sự cố dữ liệu',
    moTa: 'Cam kết thông báo cơ quan quản lý và người dùng khi xảy ra rò rỉ dữ liệu?',
    canCuPhapLy: 'GDPR Điều 33, 34; NĐ 13/2023 Điều 26',
  },
  {
    id: 13,
    criterionId: 13,
    ten: 'Bảo vệ dữ liệu trẻ em và nhóm đối tượng yếu thế',
    moTa: 'Chính sách riêng biệt hoặc giới hạn độ tuổi và biện pháp bảo vệ trẻ em?',
    canCuPhapLy: 'GDPR Điều 8; NĐ 13/2023 Điều 20',
  },
];

/**
 * Ensures that the criteria array always contains exactly 13 items from ID 1 to 13.
 * Any missing criteria are automatically added with "khong_de_cap".
 */
export function ensure13Criteria(rawList: any[] | undefined): TieuChiDanhGia[] {
  const map = new Map<number, any>();
  if (Array.isArray(rawList)) {
    rawList.forEach((item, idx) => {
      const id = Number(item.criterionId || item.id || item.ruleNumber) || (idx + 1);
      map.set(id, item);
    });
  }

  return LEGAL_CRITERIA_13.map((def) => {
    const existing = map.get(def.id);
    if (existing) {
      let m: TieuChiMuc = 'khong_de_cap';
      const rawMuc = String(existing.muc || existing.status || '').toLowerCase();
      if (rawMuc === 'ro_rang' || rawMuc === 'clear' || existing.passed === true) {
        m = 'ro_rang';
      } else if (rawMuc === 'chua_day_du' || rawMuc === 'incomplete' || existing.passed === false) {
        m = 'chua_day_du';
      } else {
        m = 'khong_de_cap';
      }

      return {
        id: def.id,
        ten: def.ten,
        moTa: def.moTa,
        muc: m,
        trichDan: existing.trichDan || existing.detail || (m === 'khong_de_cap' ? 'Không đề cập' : 'Nêu trong văn bản'),
        canCuPhapLy: def.canCuPhapLy,
      };
    }

    // Default missing criterion to 'khong_de_cap' as required
    return {
      id: def.id,
      ten: def.ten,
      moTa: def.moTa,
      muc: 'khong_de_cap',
      trichDan: 'Không đề cập',
      canCuPhapLy: def.canCuPhapLy,
    };
  });
}

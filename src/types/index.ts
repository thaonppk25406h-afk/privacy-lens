export type AppCategory =
  | 'flashlight'
  | 'calculator'
  | 'social_media'
  | 'photo_editor'
  | 'ecommerce'
  | 'fitness'
  | 'utility'
  | 'gaming';

export interface PermissionDetail {
  name: string;
  shortName: string;
  isDangerous: boolean;
  isAllowedForCategory: boolean;
  status: 'valid' | 'violation';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  categoryExplanation: string;
  ruleViolated?: string;
  description: string;
}

export interface ApkScanResult {
  appName: string;
  packageName: string;
  version: string;
  fileSizeMb: number;
  scanTime: string;
  appCategory: AppCategory;
  categoryNameVi: string;
  totalPermissions: number;
  dangerousCount: number;
  violationCount: number;
  complianceScore: number;
  complianceRating: 'GREEN' | 'YELLOW' | 'RED';
  ratingLabel: string;
  violationsSummary: string[];
  recommendations: string[];
  permissions: PermissionDetail[];
}

export type TieuChiMuc = 'ro_rang' | 'chua_day_du' | 'khong_de_cap';

export interface TieuChiDanhGia {
  id: number;
  ten: string;
  moTa: string;
  muc: TieuChiMuc;
  trichDan: string;
  canCuPhapLy: string;
}

// Backward compatibility aliases
export type GoldenRuleStatus = TieuChiMuc;
export type GoldenRuleCheck = TieuChiDanhGia;

export interface DiemDangLuuY {
  title: string;
  tieuChiLienQuan: string;
  legalBasis: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  detail: string;
  ruleViolated?: string;
}

export type PolicyNoteItem = DiemDangLuuY;
export type PolicyViolation = DiemDangLuuY;

export interface PolicySummaryResult {
  appName: string;
  sourceUrl?: string;
  analyzedAt: string;
  charCount: number;
  isDemoData?: boolean;
  policyDate?: string;
  cachedAt?: string;
  sampleId?: string;
  fivePoints: {
    collectedData: string;
    purpose: string;
    thirdPartySharing: string;
    retentionPeriod: string;
    userRights: string;
  };
  tieuChiDanhGia: TieuChiDanhGia[];
  goldenRules?: TieuChiDanhGia[];
  diemDangLuuY: DiemDangLuuY[];
  violations?: DiemDangLuuY[];
  recommendations: string[];
}

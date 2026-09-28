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

export interface GoldenRuleCheck {
  ruleNumber: number;
  title: string;
  criterion: string;
  passed: boolean;
  detail: string;
  legalReference: string;
}

export interface PolicyViolation {
  title: string;
  ruleViolated: string;
  legalBasis: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  detail: string;
}

export interface PolicySummaryResult {
  appName: string;
  sourceUrl?: string;
  analyzedAt: string;
  charCount: number;
  fivePoints: {
    collectedData: string;
    purpose: string;
    thirdPartySharing: string;
    retentionPeriod: string;
    userRights: string;
  };
  goldenRules: GoldenRuleCheck[];
  violations: PolicyViolation[];
  riskScore: number;
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  ratingLabel: string;
  recommendations: string[];
}

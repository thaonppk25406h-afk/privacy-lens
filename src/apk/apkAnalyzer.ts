import JSZip from 'jszip';
import { ApkScanResult, AppCategory, PermissionDetail } from '../types';
import { ANDROID_PERMISSIONS_DB, CATEGORIES_INFO } from './permissionRef';

/**
 * Parses binary Android XML (AXML) string pool to extract all referenced permission strings and package names.
 */
function extractStringsFromAxml(buffer: ArrayBuffer): string[] {
  const bytes = new Uint8Array(buffer);
  const strings: string[] = [];

  // Look for "android.permission." ASCII or UTF-16 patterns
  const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
  const matches = text.match(/android\.permission\.[A-Z0-9_]+/g);
  if (matches) {
    for (const m of matches) {
      if (!strings.includes(m)) {
        strings.push(m);
      }
    }
  }

  // Also check for UTF-16 LE encoded strings
  const utf16Matches: string[] = [];
  for (let i = 0; i < bytes.length - 38; i += 2) {
    // Check for 'a\0n\0d\0r\0o\0i\0d\0.\0p\0e\0r\0m\0i\0s\0s\0i\0o\0n\0'
    if (
      bytes[i] === 0x61 && bytes[i + 1] === 0 &&
      bytes[i + 2] === 0x6e && bytes[i + 3] === 0 &&
      bytes[i + 4] === 0x64 && bytes[i + 5] === 0 &&
      bytes[i + 6] === 0x72 && bytes[i + 7] === 0
    ) {
      let str = '';
      let j = i;
      while (j < bytes.length - 1 && bytes[j] !== 0 && bytes[j + 1] === 0) {
        const charCode = bytes[j];
        if (
          (charCode >= 65 && charCode <= 90) || // A-Z
          (charCode >= 97 && charCode <= 122) || // a-z
          (charCode >= 48 && charCode <= 57) || // 0-9
          charCode === 46 || // .
          charCode === 95 // _
        ) {
          str += String.fromCharCode(charCode);
          j += 2;
        } else {
          break;
        }
      }
      if (str.startsWith('android.permission.') && !utf16Matches.includes(str)) {
        utf16Matches.push(str);
      }
    }
  }

  const combined = Array.from(new Set([...strings, ...utf16Matches]));
  return combined;
}

/**
 * Extracts package name hint from manifest or file name
 */
function extractPackageName(buffer: ArrayBuffer, fileName: string): string {
  const bytes = new Uint8Array(buffer);
  const text = new TextDecoder('latin1').decode(bytes.slice(0, 4096));
  const pkgMatch = text.match(/([a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+)/i);
  if (pkgMatch && pkgMatch[1].includes('.') && pkgMatch[1].length > 6) {
    return pkgMatch[1];
  }
  return fileName.replace(/\.apk$/i, '').toLowerCase().replace(/[^a-z0-9.]/g, '.');
}

/**
 * Analyzes permissions against a target application category
 */
export function evaluatePermissions(
  permissionNames: string[],
  category: AppCategory,
  appName: string,
  packageName: string,
  version: string,
  fileSizeMb: number
): ApkScanResult {
  const categoryRule = CATEGORIES_INFO[category] || CATEGORIES_INFO.utility;
  const processedPermissions: PermissionDetail[] = [];

  let dangerousCount = 0;
  let violationCount = 0;
  const violationsSummary: string[] = [];
  const recommendations: string[] = [];

  for (const permName of permissionNames) {
    const meta = ANDROID_PERMISSIONS_DB[permName] || {
      shortName: permName.replace('android.permission.', ''),
      isDangerous: false,
      categoryDesc: 'Quyền ứng dụng tiêu chuẩn Android',
      generalRisk: 'LOW',
    };

    if (meta.isDangerous) {
      dangerousCount++;
    }

    const isExplicitlyAllowed = categoryRule.allowedPermissions.includes(permName);
    const isExplicitlyRisky = categoryRule.riskyPermissions.includes(permName);

    let status: 'valid' | 'violation' = 'valid';
    let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = meta.generalRisk;
    let explanation = '';
    let ruleViolated: string | undefined = undefined;

    if (isExplicitlyRisky) {
      status = 'violation';
      riskLevel = 'HIGH';
      violationCount++;
      explanation = `Vi phạm - App ${categoryRule.nameVi} không có lý do hợp lý nào để yêu cầu quyền ${meta.shortName}!`;
      ruleViolated = 'Quy tắc 3 (GDPR & Luật VN 2025): Tối thiểu hóa dữ liệu (Data Minimization)';
      violationsSummary.push(`App yêu cầu ${meta.shortName}: Không phù hợp với danh mục ${categoryRule.nameVi}`);
      recommendations.push(`Loại bỏ quyền ${permName} khỏi AndroidManifest.xml`);
    } else if (isExplicitlyAllowed) {
      status = 'valid';
      riskLevel = 'LOW';
      explanation = `Hợp lý - Phục vụ trực tiếp cho tính năng của loại ứng dụng ${categoryRule.nameVi}`;
    } else {
      // Not explicitly in either list
      if (meta.isDangerous) {
        status = 'violation';
        riskLevel = 'MEDIUM';
        violationCount++;
        explanation = `Cảnh báo - Quyền nguy hại ${meta.shortName} thường không cần thiết đối với ${categoryRule.nameVi}`;
        ruleViolated = 'Quy tắc 2: Mục đích giới hạn (Purpose Limitation)';
        violationsSummary.push(`Quyền nguy hại ${meta.shortName} cần xem xét lại tính cần thiết`);
        recommendations.push(`Đánh giá hoặc gỡ bỏ ${permName} nếu không dùng cho chức năng cốt lõi`);
      } else {
        status = 'valid';
        riskLevel = 'LOW';
        explanation = `Bình thường - Quyền hệ thống tiêu chuẩn`;
      }
    }

    processedPermissions.push({
      name: permName,
      shortName: meta.shortName,
      isDangerous: meta.isDangerous,
      isAllowedForCategory: status === 'valid',
      status,
      riskLevel,
      categoryExplanation: explanation,
      ruleViolated,
      description: meta.categoryDesc,
    });
  }

  // Calculate compliance score (0 - 100)
  // Base 100 points
  // Each dangerous violation deducts 20 points
  // Each medium violation deducts 10 points
  let score = 100;
  for (const p of processedPermissions) {
    if (p.status === 'violation') {
      if (p.riskLevel === 'HIGH') {
        score -= 22;
      } else if (p.riskLevel === 'MEDIUM') {
        score -= 12;
      }
    }
  }

  if (processedPermissions.length === 0) {
    score = 100;
  }
  score = Math.max(0, Math.min(100, Math.round(score)));

  let complianceRating: 'GREEN' | 'YELLOW' | 'RED' = 'GREEN';
  let ratingLabel = 'TUÂN THỦ RẤT TỐT (GREEN)';
  if (score < 50) {
    complianceRating = 'RED';
    ratingLabel = 'VI PHẠM NGHIÊM TRỌNG (RED)';
  } else if (score < 80) {
    complianceRating = 'YELLOW';
    ratingLabel = 'CẢNH BÁO TUÂN THỦ (YELLOW)';
  }

  if (recommendations.length === 0) {
    recommendations.push('Ứng dụng hiện tại đáp ứng chuẩn mực tối thiểu hóa dữ liệu.');
    recommendations.push('Duy trì các chính sách kiểm soát quyền truy cập định kỳ.');
  }

  const now = new Date();
  const scanTime = `${now.toLocaleDateString('vi-VN')} - ${now.toLocaleTimeString('vi-VN')}`;

  return {
    appName,
    packageName,
    version,
    fileSizeMb: Number(fileSizeMb.toFixed(2)),
    scanTime,
    appCategory: category,
    categoryNameVi: categoryRule.nameVi,
    totalPermissions: processedPermissions.length,
    dangerousCount,
    violationCount,
    complianceScore: score,
    complianceRating,
    ratingLabel,
    violationsSummary,
    recommendations,
    permissions: processedPermissions,
  };
}

/**
 * Analyzes an uploaded APK file (.apk or .xml)
 */
export async function parseApkFile(
  file: File,
  category: AppCategory
): Promise<ApkScanResult> {
  const fileName = file.name;
  const fileSizeMb = file.size / (1024 * 1024);

  // Validate file size (max 50MB per BRD)
  if (fileSizeMb > 50) {
    throw new Error('File quá lớn! Giới hạn tối đa là 50MB theo yêu cầu của hệ thống.');
  }

  const isApk = fileName.toLowerCase().endsWith('.apk');
  const isXml = fileName.toLowerCase().endsWith('.xml');

  if (!isApk && !isXml) {
    throw new Error('Định dạng không hỗ trợ! Vui lòng upload file .apk hoặc AndroidManifest.xml hợp lệ.');
  }

  const arrayBuffer = await file.arrayBuffer();
  let extractedPermissions: string[] = [];
  let detectedPackage = 'com.app.' + fileName.replace(/\.[^/.]+$/, '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (isXml) {
    // Text XML parsing
    const xmlText = new TextDecoder('utf-8').decode(arrayBuffer);
    const matches = xmlText.match(/android\.permission\.[A-Z0-9_]+/g);
    if (matches) {
      extractedPermissions = Array.from(new Set(matches));
    }
    const pkgMatch = xmlText.match(/package\s*=\s*["']([^"']+)["']/);
    if (pkgMatch) {
      detectedPackage = pkgMatch[1];
    }
  } else {
    // Unzip APK archive
    try {
      const zip = await JSZip.loadAsync(arrayBuffer);
      const manifestFile = zip.file('AndroidManifest.xml');
      if (!manifestFile) {
        throw new Error('File APK không chứa AndroidManifest.xml hoặc file đã bị lỗi/mã hóa!');
      }

      const manifestBuffer = await manifestFile.async('arraybuffer');
      extractedPermissions = extractStringsFromAxml(manifestBuffer);
      detectedPackage = extractPackageName(manifestBuffer, fileName);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Không thể giải nén file APK: ${msg}`);
    }
  }

  // If no permissions found in APK, check standard baseline
  if (extractedPermissions.length === 0) {
    extractedPermissions = [
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
    ];
  }

  const cleanAppName = fileName
    .replace(/\.apk$/i, '')
    .replace(/\.xml$/i, '')
    .replace(/[-_]/g, ' ')
    .trim();

  return evaluatePermissions(
    extractedPermissions,
    category,
    cleanAppName || 'Ứng dụng đã tải lên',
    detectedPackage,
    '1.0.0',
    fileSizeMb
  );
}

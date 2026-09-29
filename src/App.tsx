import React, { useState } from 'react';
import { Navbar, NavTab } from './frontend/Navbar';
import { HomeView } from './frontend/HomeView';
import { ApkScannerView } from './apk/ApkScannerView';
import { PolicySummarizerView } from './policy/PolicySummarizerView';
import { RegulationsView } from './frontend/RegulationsView';
import { Footer } from './frontend/Footer';
import { AuditCertificateModal } from './frontend/AuditCertificateModal';
import { SAMPLE_APKS } from './apk/sampleApks';
import { PRELOADED_POLICIES } from './policy/preloadedPolicies';
import { ApkScanResult, PolicySummaryResult } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [activeApkResult, setActiveApkResult] = useState<ApkScanResult | null>(null);
  const [activePolicyResult, setActivePolicyResult] = useState<PolicySummaryResult | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  const handleQuickSampleApk = () => {
    const sample = SAMPLE_APKS[0]; // Flashlight Pro
    setActiveApkResult(sample);
    setCurrentTab('apk_scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickSamplePolicy = () => {
    const sample = PRELOADED_POLICIES[0].analyzedResult; // TikTok
    setActivePolicyResult(sample);
    setCurrentTab('policy_summarizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fix #1: Sync ApkScanResult back to App-level state so navigating away
  // and returning doesn't restore a stale initialScanResult
  const handleApkScanComplete = (result: ApkScanResult | null) => {
    setActiveApkResult(result);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleTabChange}
            onQuickSampleApk={handleQuickSampleApk}
            onQuickSamplePolicy={handleQuickSamplePolicy}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {currentTab === 'apk_scanner' && (
          <ApkScannerView
            onBackToHome={() => handleTabChange('home')}
            initialScanResult={activeApkResult}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onScanComplete={handleApkScanComplete}
          />
        )}

        {currentTab === 'policy_summarizer' && (
          <PolicySummarizerView
            onBackToHome={() => handleTabChange('home')}
            initialResult={activePolicyResult}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {currentTab === 'regulations' && (
          <RegulationsView />
        )}

      </main>

      {/* Formal Audit Certificate Printable Modal */}
      <AuditCertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        apkResult={activeApkResult}
        policyResult={activePolicyResult}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

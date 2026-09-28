import React from 'react';
import { Shield, Smartphone, FileText, BookOpen, Layers, CheckCircle } from 'lucide-react';

export type NavTab = 'home' | 'apk_scanner' | 'policy_summarizer' | 'regulations';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenCertificate?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenCertificate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Wordmark (Zone 1) */}
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => onSelectTab('home')}
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:bg-slate-800 transition-colors">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight">Privacy Compass</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline">
                Enterprise
              </span>
            </div>
          </div>

          {/* Navigation Links (Zone 2) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('home')}
              className={`transition-colors hover:text-slate-900 ${currentTab === 'home' ? 'text-slate-900 font-semibold' : ''
                }`}
            >
              Tổng quan
            </button>

            <button
              onClick={() => onSelectTab('apk_scanner')}
              className={`transition-colors hover:text-slate-900 flex items-center gap-1.5 ${currentTab === 'apk_scanner' ? 'text-slate-900 font-semibold' : ''
                }`}
            >
              <span>Kiểm toán APK</span>
            </button>

            <button
              onClick={() => onSelectTab('policy_summarizer')}
              className={`transition-colors hover:text-slate-900 flex items-center gap-1.5 ${currentTab === 'policy_summarizer' ? 'text-slate-900 font-semibold' : ''
                }`}
            >
              <span>Soát xét Chính sách</span>
            </button>

            <button
              onClick={() => onSelectTab('regulations')}
              className={`transition-colors hover:text-slate-900 ${currentTab === 'regulations' ? 'text-slate-900 font-semibold' : ''
                }`}
            >
              Khung pháp lý
            </button>

          </nav>

          {/* Action Zone (Zone 3) */}
          <div className="flex items-center gap-3">
            {onOpenCertificate && (
              <button
                onClick={onOpenCertificate}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mẫu chứng nhận kiểm toán</span>
              </button>
            )}

            <button
              onClick={() => onSelectTab('apk_scanner')}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs whitespace-nowrap"
            >
              Bắt đầu kiểm toán
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

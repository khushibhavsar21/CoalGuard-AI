import React from 'react';
import { 
  LayoutDashboard, 
  FileCheck2, 
  BrainCircuit, 
  ClipboardCheck, 
  BarChart3, 
  Flame,
  AlertOctagon,
  HelpCircle,
  X
} from 'lucide-react';

interface SidebarProps {
  currentScreen: string;
  onSelectScreen: (screen: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  criticalCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onSelectScreen,
  mobileOpen,
  onCloseMobile,
  criticalCount
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'National overview & risk summary',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'compliance',
      label: 'Compliance',
      description: 'DGMS statutory regulations',
      icon: FileCheck2,
      badge: criticalCount > 0 ? `${criticalCount} Critical` : null,
      badgeColor: 'bg-red-100 text-red-700'
    },
    {
      id: 'ai-risk',
      label: 'AI Risk Analysis',
      description: 'Predictive hazard engine',
      icon: BrainCircuit,
      badge: 'Engine',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'inspection',
      label: 'Inspection',
      description: 'Field checklist & evidence logs',
      icon: ClipboardCheck,
      badge: null
    },
    {
      id: 'reports',
      label: 'Reports',
      description: 'Analytics, PDF & Excel export',
      icon: BarChart3,
      badge: null
    }
  ];

  const content = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200">
      
      {/* Sidebar Header / Mobile Close */}
      <div className="p-4 flex items-center justify-between border-b border-slate-800">
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Smart India Hackathon 2026
          </div>
          <div className="text-xs font-semibold text-slate-200 mt-0.5">
            Problem Statement #26024
          </div>
        </div>
        {mobileOpen && (
          <button 
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Primary Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectScreen(item.id);
                if (mobileOpen) onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm tracking-tight truncate flex items-center justify-between">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className={`text-[11px] truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                  {item.description}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Quick Status / Regulatory Note */}
      <div className="p-4 m-3 rounded-xl bg-slate-800/70 border border-slate-700/60 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-[11px]">
          <AlertOctagon className="w-4 h-4 shrink-0" />
          <span>Statutory Authority</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">
          Directorate General of Mines Safety (DGMS) CMR 2017 & Mines Act 1952 compliance monitoring.
        </p>
        <div className="mt-2.5 pt-2 border-t border-slate-700 flex items-center justify-between text-[10px] text-slate-400">
          <span>Target Mines: 24</span>
          <span className="text-emerald-400 font-semibold">Active Engine</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-400">
        <div className="font-semibold text-slate-300">Coal India Limited (CIL)</div>
        <div className="text-[10px] text-slate-400 mt-0.5">Ministry of Coal · Govt. of India</div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 border-r border-slate-800 h-[calc(100vh-4rem)] sticky top-16 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
            onClick={onCloseMobile}
          />
          <div className="relative flex flex-col w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

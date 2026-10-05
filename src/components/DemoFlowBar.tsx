import React from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  LogIn, 
  LayoutDashboard, 
  FileCheck2, 
  BrainCircuit, 
  ClipboardCheck, 
  BarChart3 
} from 'lucide-react';

interface DemoFlowBarProps {
  currentScreen: string;
  onSelectScreen: (screen: string) => void;
  onRunDemoStep?: (stepId: string) => void;
}

export const DemoFlowBar: React.FC<DemoFlowBarProps> = ({
  currentScreen,
  onSelectScreen
}) => {
  const steps = [
    { id: 'login', label: '1. Login', screen: 'login', icon: LogIn, tip: 'Role & Auth' },
    { id: 'dashboard', label: '2. Dashboard', screen: 'dashboard', icon: LayoutDashboard, tip: 'Identify High-Risk Mine (Dhanbad)' },
    { id: 'compliance', label: '3. Compliance', screen: 'compliance', icon: FileCheck2, tip: 'Critical & Overdue Violations' },
    { id: 'ai-risk', label: '4. AI Risk Engine', screen: 'ai-risk', icon: BrainCircuit, tip: 'Run AI Heuristics & Action Plan' },
    { id: 'inspection', label: '5. Inspection', screen: 'inspection', icon: ClipboardCheck, tip: 'Submit Checklist & Evidence' },
    { id: 'reports', label: '6. Reports', screen: 'reports', icon: BarChart3, tip: 'DGMS Audit Dossier & Export' }
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2.5 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5">
        
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span className="font-bold">SIH Demo Flow</span>
          </div>
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            Follow the 6-stage presentation pipeline:
          </span>
        </div>

        {/* Clickable breadcrumb flow */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none text-xs">
          {steps.map((step, idx) => {
            const isActive = currentScreen === step.screen;
            const Icon = step.icon;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => onSelectScreen(step.screen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  title={step.tip}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{step.label}</span>
                </button>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
};

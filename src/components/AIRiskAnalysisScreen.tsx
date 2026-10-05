import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Play, 
  RefreshCw, 
  ShieldAlert, 
  FileText, 
  Building2, 
  HelpCircle,
  TrendingUp,
  Flame,
  CheckCircle
} from 'lucide-react';
import { Mine, AIRiskProfile } from '../types';
import { MINE_RISK_PROFILES } from '../data/mockData';
import { ActionPlanModal } from './ActionPlanModal';

interface AIRiskAnalysisScreenProps {
  mines: Mine[];
  selectedMineId: string;
  onSelectMine: (mineId: string) => void;
  onDispatchInspection: (mineId: string) => void;
}

export const AIRiskAnalysisScreen: React.FC<AIRiskAnalysisScreenProps> = ({
  mines,
  selectedMineId,
  onSelectMine,
  onDispatchInspection
}) => {
  const [currentMineId, setCurrentMineId] = useState<string>(selectedMineId || 'MINE-001');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [hasRunAnalysis, setHasRunAnalysis] = useState(false);
  const [showActionPlanModal, setShowActionPlanModal] = useState(false);

  const selectedMine = mines.find(m => m.id === currentMineId) || mines[0];
  const profile: AIRiskProfile = MINE_RISK_PROFILES[currentMineId] || MINE_RISK_PROFILES['MINE-001'];

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setHasRunAnalysis(false);
    
    setAnalysisStep('Ingesting historical compliance & DGMS inspection logs...');
    setTimeout(() => {
      setAnalysisStep('Cross-referencing safety sensor feeds with CMR 2017 thresholds...');
    }, 700);

    setTimeout(() => {
      setAnalysisStep('Evaluating overdue maintenance backlogs & hazardous vectors...');
    }, 1400);

    setTimeout(() => {
      setIsAnalyzing(false);
      setHasRunAnalysis(true);
      setAnalysisStep('');
    }, 2100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-50 border-red-200';
    if (score >= 50) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  };

  return (
    <div className="space-y-6">
      
      {/* Prototype AI Engine Mandatory Disclaimer Banner */}
      <div className="p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 flex items-start gap-3 shadow-xs">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold">Prototype Demonstration Notice (SIH 2026): </strong>
          <span>
            This is a prototype AI compliance risk engine using synthetic demo data for Smart India Hackathon 2026. Heuristic risk algorithms evaluate multi-factor safety compliance without running a production neural network.
          </span>
        </div>
      </div>

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-blue-700" />
            <span>AI Compliance Risk Engine</span>
            <span>·</span>
            <span>Predictive Hazard Detection</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            AI Compliance Risk Engine
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Analyzes compliance history, inspection records, safety violations and overdue requirements to identify high-risk mines and recommend preventive actions.
          </p>
        </div>

        {/* Mine Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase whitespace-nowrap">
            Evaluated Mine:
          </label>
          <select
            value={currentMineId}
            onChange={(e) => {
              setCurrentMineId(e.target.value);
              onSelectMine(e.target.value);
              setHasRunAnalysis(false);
            }}
            className="py-2 px-3.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 shadow-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          >
            {mines.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.riskLevel} Risk - {m.riskScore}/100)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Analysis Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Risk Score & Level Summary (Span 1) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Target Facility
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-0.5">
                  {selectedMine.name}
                </h2>
                <p className="text-xs text-slate-500">{selectedMine.subsidiary}</p>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${
                selectedMine.riskLevel === 'HIGH' 
                  ? 'bg-red-100 text-red-700 border-red-300' 
                  : selectedMine.riskLevel === 'MEDIUM' 
                    ? 'bg-amber-100 text-amber-800 border-amber-300' 
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }`}>
                {selectedMine.riskLevel} RISK
              </span>
            </div>

            {/* AI Risk Score Big Display */}
            <div className="mt-8 text-center p-6 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                AI Risk Score
              </span>
              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="text-5xl font-black text-slate-900 font-mono tabular-nums">
                  {selectedMine.riskScore}
                </span>
                <span className="text-xl font-bold text-slate-400 font-mono">/ 100</span>
              </div>
              <div className="mt-2 text-xs font-semibold">
                Risk Level:{' '}
                <strong className={selectedMine.riskScore >= 70 ? 'text-red-600' : 'text-amber-600'}>
                  {selectedMine.riskLevel}
                </strong>
              </div>

              {/* Visual meter bar */}
              <div className="w-full bg-slate-200 h-2.5 rounded-full mt-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    selectedMine.riskScore >= 70
                      ? 'bg-red-600'
                      : selectedMine.riskScore >= 50
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                  }`}
                  style={{ width: `${selectedMine.riskScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>0 (Safe)</span>
                <span>50 (Warning)</span>
                <span>100 (Critical)</span>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Mining Type:</span>
                <span className="font-semibold text-slate-800">{selectedMine.type}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Workforce Onsite:</span>
                <span className="font-semibold text-slate-800 font-mono tabular-nums">{selectedMine.workforce} miners</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Last Evaluated:</span>
                <span className="font-semibold text-slate-800 font-mono">{profile.lastEvaluated}</span>
              </div>
            </div>
          </div>

          {/* Run AI Analysis CTA Button */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 disabled:opacity-75 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                  <span>Analyzing compliance records...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-blue-300 fill-blue-300" />
                  <span>Run AI Analysis</span>
                </>
              )}
            </button>
            <div className="text-[11px] text-slate-400 text-center mt-2">
              Evaluates DGMS audit vectors in real-time
            </div>
          </div>
        </div>

        {/* Right Column: Risk Factors & AI Recommendation (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Real-time Analysis Feedback Box */}
          {isAnalyzing && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl animate-in fade-in duration-150">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                <span>Analyzing compliance records...</span>
              </div>
              <p className="text-xs text-blue-800 mt-1 font-mono">
                {analysisStep}
              </p>
            </div>
          )}

          {hasRunAnalysis && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="font-bold text-emerald-900">Analysis Complete</div>
                  <div className="text-[11px] text-emerald-700">
                    Risk factors identified: Safety violations · Inspection delays · Repeated observations · Compliance deadlines
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                Synchronized
              </span>
            </div>
          )}

          {/* Risk Factors Breakdown with Progress Bars */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Identified Risk Factors</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Algorithmic evaluation of safety violations, overdue inspections, repeated observations & deadlines.
                </p>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">
                4 Critical Dimensions
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {profile.riskFactors.map((factor, idx) => {
                const isHighSeverity = factor.severity === 'High';

                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isHighSeverity ? 'bg-red-600' : 'bg-amber-500'}`} />
                        <span className="font-bold text-slate-900">{factor.title}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-[11px] text-slate-500 font-semibold">{factor.metric}</span>
                        <span className={`text-xs font-bold ${isHighSeverity ? 'text-red-600' : 'text-amber-600'}`}>
                          {factor.score}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Visual Indicator */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          isHighSeverity ? 'bg-red-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 leading-normal pl-4">
                      {factor.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Recommendation Section */}
          <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                <BrainCircuit className="w-4 h-4 text-blue-400" />
                <span>AI Recommendation</span>
              </div>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded">
                Target: 48 Hours
              </span>
            </div>

            <div className="mt-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-base font-bold text-white leading-relaxed">
                "{profile.aiRecommendation}"
              </p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Immediate dispatch of DGMS-certified mechanical inspector required to audit Incline 2 winder brakes and recalibrate Return Airway 3 methane telemetry head.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Automated action plan prioritizes immediate Section 22 de-escalation.
              </span>
              
              <button
                onClick={() => setShowActionPlanModal(true)}
                className="py-2.5 px-4 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Generate Action Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Action Plan Modal */}
      <ActionPlanModal
        isOpen={showActionPlanModal}
        onClose={() => setShowActionPlanModal(false)}
        mine={selectedMine}
        actionPlan={profile.actionPlan}
        onDispatchInspection={onDispatchInspection}
      />

    </div>
  );
};

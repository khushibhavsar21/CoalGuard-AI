import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  BrainCircuit, 
  ArrowRight, 
  TrendingUp, 
  ShieldAlert, 
  Search, 
  ChevronRight,
  Filter,
  FileSpreadsheet
} from 'lucide-react';
import { Mine, AlertItem } from '../types';
import { COMPLIANCE_TREND_DATA } from '../data/mockData';

interface DashboardScreenProps {
  mines: Mine[];
  alerts: AlertItem[];
  onNavigateToRisk: (mineId?: string) => void;
  onNavigateToCompliance: (mineId?: string) => void;
  onNavigateToInspection: (mineId?: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  mines,
  alerts,
  onNavigateToRisk,
  onNavigateToCompliance,
  onNavigateToInspection
}) => {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMines = mines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subsidiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
            <span>Ministry of Coal</span>
            <span>·</span>
            <span>Coal India Limited</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Coal Mine Governance Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time DGMS statutory compliance, safety telemetry, and predictive risk indicators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateToCompliance()}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>View All Requirements</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
          
          <button
            onClick={() => onNavigateToRisk('MINE-001')}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <BrainCircuit className="w-4 h-4 text-blue-200" />
            <span>Launch AI Engine</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Mines */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Mines</span>
            <Building2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">24</div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-blue-700 font-semibold">5 Key Hubs</span>
              <span>monitored live in prototype</span>
            </div>
          </div>
        </div>

        {/* Compliance Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Compliance Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">87%</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+2.4% vs previous quarter</span>
            </div>
          </div>
        </div>

        {/* Pending Inspections */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Inspections</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">18</div>
            <div className="text-[11px] text-amber-700 font-semibold mt-1 flex items-center gap-1">
              <span>2 overdue</span>
              <span className="text-slate-400 font-normal">· requires action</span>
            </div>
          </div>
        </div>

        {/* Critical Violations */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Critical Violations</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-red-600 tabular-nums">7</div>
            <div className="text-[11px] text-red-700 font-semibold mt-1">
              4 concentrated at Dhanbad
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Compliance Trend Chart & AI Insight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Compliance Trend Chart (Span 2) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Compliance Trend (Last 6 Months)</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Aggregate DGMS statutory adherence percentage across all national coal divisions.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded-xs bg-blue-600 inline-block" />
                  Actual Rate
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-3 h-0.5 bg-slate-400 inline-block" />
                  Target (85%)
                </span>
              </div>
            </div>

            {/* Interactive SVG / Bar & Line Trend Visualization */}
            <div className="mt-6 pt-2">
              <div className="h-52 w-full flex items-end justify-between gap-2 sm:gap-4 px-2 relative border-b border-slate-200 pb-2">
                
                {/* 85% Target Line */}
                <div 
                  className="absolute left-0 right-0 border-b border-dashed border-slate-300 pointer-events-none flex items-center justify-end pr-2"
                  style={{ bottom: `${(85 / 100) * 190}px` }}
                >
                  <span className="text-[10px] font-semibold text-slate-400 bg-white px-1">Target: 85%</span>
                </div>

                {COMPLIANCE_TREND_DATA.map((d, index) => {
                  const heightPercent = (d.rate / 100) * 180;
                  const isHovered = hoveredMonth === index;

                  return (
                    <div 
                      key={d.month}
                      className="flex-1 flex flex-col items-center group relative cursor-pointer"
                      onMouseEnter={() => setHoveredMonth(index)}
                      onMouseLeave={() => setHoveredMonth(null)}
                    >
                      {/* Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-12 z-20 bg-slate-900 text-white text-xs py-1 px-2 rounded shadow-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-100">
                          <span className="font-bold">{d.month}</span>: <span className="text-blue-300 font-mono">{d.rate}%</span>
                        </div>
                      )}

                      {/* Bar Value */}
                      <span className={`text-[11px] font-bold tabular-nums mb-1.5 transition-colors ${
                        isHovered ? 'text-blue-700' : 'text-slate-600'
                      }`}>
                        {d.rate}%
                      </span>

                      {/* Bar Column */}
                      <div 
                        className={`w-full max-w-[48px] rounded-t-md transition-all duration-200 ${
                          isHovered 
                            ? 'bg-blue-600 shadow-md' 
                            : index === COMPLIANCE_TREND_DATA.length - 1 
                              ? 'bg-blue-700' 
                              : 'bg-slate-200 hover:bg-slate-300'
                        }`}
                        style={{ height: `${heightPercent}px` }}
                      />

                      {/* Month Label */}
                      <span className="text-[11px] font-medium text-slate-500 mt-2 text-center whitespace-nowrap">
                        {d.month.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-2">
                <span>Directorate General of Mines Safety (DGMS) Baseline</span>
                <span>Current Standing: <strong className="text-slate-700 font-semibold">87% (Compliant)</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insight Card */}
        <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 text-white p-6 rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-400/30">
                  <BrainCircuit className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-blue-300">
                    Predictive Intelligence
                  </span>
                  <h3 className="text-sm font-bold text-white">AI Compliance Insight</h3>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                Action Required
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xs">
                <p className="text-base font-bold text-white leading-snug">
                  "AI has identified 3 mines requiring immediate attention."
                </p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Severe anomaly correlation detected in Dhanbad Central (telemetric gas sensor drift + overdue winder cable inspections) elevating incident risk probability by 4.2x.
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between py-1 border-b border-white/10">
                  <span>Dhanbad Central Mine</span>
                  <span className="text-red-400 font-bold font-mono">Score 82 · HIGH</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/10">
                  <span>Singrauli Opencast Mine</span>
                  <span className="text-red-400 font-bold font-mono">Score 76 · HIGH</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Korba Coal Mine</span>
                  <span className="text-amber-300 font-bold font-mono">Score 61 · MEDIUM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <button
              onClick={() => onNavigateToRisk('MINE-001')}
              className="w-full py-2.5 px-4 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>View AI Risk Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-[10px] text-slate-400 text-center mt-2">
              Prototype AI Heuristic Engine · SIH 2026
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section: Mine Risk Overview & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Mine Risk Overview Table (Span 2) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Mine Risk Overview</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Composite hazard scoring calculated from violations, inspections, and sensor telemetry.
              </p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter by mine, state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-600 w-full sm:w-56"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <th className="py-3 px-4">Mine Name & Subsidiary</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4 text-center">Risk Level</th>
                  <th className="py-3 px-4 text-right">Risk Score</th>
                  <th className="py-3 px-4 text-right">Violations</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredMines.map((mine) => {
                  const isHigh = mine.riskLevel === 'HIGH';
                  const isMedium = mine.riskLevel === 'MEDIUM';

                  return (
                    <tr 
                      key={mine.id} 
                      className={`hover:bg-slate-50 transition-colors ${
                        mine.id === 'MINE-001' ? 'bg-red-50/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{mine.name}</div>
                        <div className="text-[11px] text-slate-500">{mine.subsidiary}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">
                        {mine.state}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                          isHigh 
                            ? 'bg-red-100 text-red-700' 
                            : isMedium 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {mine.riskLevel}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold tabular-nums text-slate-900">
                        {mine.riskScore}
                        <span className="text-[10px] text-slate-400 font-normal"> / 100</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`font-mono font-bold tabular-nums ${mine.criticalViolations > 0 ? 'text-red-600' : 'text-slate-600'}`}>
                          {mine.criticalViolations} critical
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => onNavigateToRisk(mine.id)}
                            className="px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                            title="Run AI Risk Engine on this mine"
                          >
                            AI Risk
                          </button>
                          <button
                            onClick={() => onNavigateToInspection(mine.id)}
                            className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                            title="Open Field Inspection Checklist"
                          >
                            Inspect
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Displaying 5 representative mines for SIH 2026 live prototype</span>
            <button
              onClick={() => onNavigateToRisk('MINE-001')}
              className="font-bold text-blue-700 hover:underline"
            >
              Analyze Dhanbad Central Mine Risk Factors →
            </button>
          </div>
        </div>

        {/* Recent Alerts (Span 1) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Recent Alerts</h2>
                <p className="text-xs text-slate-500 mt-0.5">Automated compliance triggers</p>
              </div>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                Live Feed
              </span>
            </div>

            <div className="p-4 space-y-3">
              {/* Alert 1: CRITICAL */}
              <div className="p-3.5 rounded-lg border border-red-200 bg-red-50/50">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-red-600 text-white tracking-wider">
                    CRITICAL
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">12 min ago</span>
                </div>
                <h4 className="text-xs font-bold text-red-950 mt-1.5">
                  Dhanbad Central Mine has 4 unresolved safety violations.
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                  Ventilation airflow drop in Seam IV & methane sensor drift past calibration threshold.
                </p>
                <div className="mt-2.5 pt-2 border-t border-red-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-red-700">Ref: DGMS CMR 152</span>
                  <button
                    onClick={() => onNavigateToRisk('MINE-001')}
                    className="text-xs font-bold text-red-700 hover:text-red-900 inline-flex items-center gap-1"
                  >
                    <span>View AI Risk</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Alert 2: WARNING */}
              <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/50">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-amber-500 text-white tracking-wider">
                    WARNING
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">45 min ago</span>
                </div>
                <h4 className="text-xs font-bold text-amber-950 mt-1.5">
                  2 inspections are overdue.
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                  DGMS safety equipment verification (Dhanbad) and Bench 7 slope stability audit (Singrauli).
                </p>
                <div className="mt-2.5 pt-2 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-amber-800">Action: Field Dispatch</span>
                  <button
                    onClick={() => onNavigateToCompliance()}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 inline-flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-slate-200 bg-slate-50 text-center">
            <button
              onClick={() => onNavigateToCompliance()}
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              Open Full Compliance Tracker →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

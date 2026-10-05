import React, { useState } from 'react';
import { 
  BarChart3, 
  FileCheck2, 
  ShieldCheck, 
  Leaf, 
  ClipboardCheck, 
  Download, 
  Printer, 
  RefreshCw, 
  CheckCircle2, 
  FileSpreadsheet,
  FileText,
  Building2,
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';
import { Mine, ComplianceRecord, InspectionRecord } from '../types';
import { downloadCSV, downloadInspectionCSV, triggerPrintReport } from '../utils/helpers';

interface ReportsScreenProps {
  mines: Mine[];
  complianceRecords: ComplianceRecord[];
  inspections: InspectionRecord[];
}

type ReportType = 'compliance' | 'safety' | 'inspection' | 'environmental';

export const ReportsScreen: React.FC<ReportsScreenProps> = ({
  mines,
  complianceRecords,
  inspections
}) => {
  const [activeReport, setActiveReport] = useState<ReportType>('compliance');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string>('05 Oct 2026, 08:30 IST');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const reportTabs = [
    { id: 'compliance', label: 'Compliance Report', icon: FileCheck2, desc: 'DGMS statutory adherence summary' },
    { id: 'safety', label: 'Safety Report', icon: ShieldCheck, desc: 'Hazardous incident & violation audit' },
    { id: 'inspection', label: 'Inspection Report', icon: ClipboardCheck, desc: 'Field audit checklists & logs' },
    { id: 'environmental', label: 'Environmental Report', icon: Leaf, desc: 'Air quality, dust, and water discharge' }
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newTime = `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} IST`;
      setLastGenerated(newTime);
      showToast(`${activeReport.toUpperCase()} report compiled and updated with latest DGMS field data.`);
    }, 700);
  };

  const handleDownloadPDF = () => {
    const summary = {
      'Compliance Rate': '87%',
      'Safety Adherence': '91%',
      'Environmental Compliance': '84%',
      'Inspection Completion': '78%'
    };

    let detailsTable = '';
    if (activeReport === 'compliance' || activeReport === 'safety') {
      detailsTable = `
        <h3 style="font-size: 14px; font-weight: 700; color: #0f2a4a; margin-top: 20px;">Statutory Verification Records</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Requirement</th>
              <th>Mine</th>
              <th>Category</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${complianceRecords.map(r => `
              <tr>
                <td style="font-family: monospace; font-weight: bold;">${r.id}</td>
                <td>${r.requirement}</td>
                <td>${r.mineName}</td>
                <td>${r.category}</td>
                <td style="font-family: monospace;">${r.dueDate}</td>
                <td><span class="badge badge-${r.status.toLowerCase()}">${r.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    } else {
      detailsTable = `
        <h3 style="font-size: 14px; font-weight: 700; color: #0f2a4a; margin-top: 20px;">Field Inspection Dossier Entries</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mine</th>
              <th>Type</th>
              <th>Date</th>
              <th>Inspector</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            ${inspections.map(i => `
              <tr>
                <td style="font-family: monospace; font-weight: bold;">${i.id}</td>
                <td>${i.mineName}</td>
                <td>${i.type}</td>
                <td style="font-family: monospace;">${i.date}</td>
                <td>${i.inspectorName}</td>
                <td><span class="badge badge-${i.riskLevel.toLowerCase()}">${i.riskLevel}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }

    triggerPrintReport(
      `CoalGuard AI - ${activeReport.toUpperCase()} STATUTORY DOSSIER`,
      summary,
      detailsTable
    );
  };

  const handleExportExcel = () => {
    if (activeReport === 'inspection') {
      downloadInspectionCSV(inspections, `CoalGuard_Inspection_Report_${Date.now()}.csv`);
    } else {
      downloadCSV(complianceRecords, `CoalGuard_${activeReport.toUpperCase()}_Report_${Date.now()}.csv`);
    }
    showToast(`Spreadsheet exported with ${activeReport === 'inspection' ? inspections.length : complianceRecords.length} records.`);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom duration-200 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
            <span>Ministry of Coal & Coal India Limited</span>
            <span>·</span>
            <span>Executive Reporting</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Reports & Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Generate and export statutory compliance dossiers for DGMS, state pollution boards, and CIL directorate.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-3.5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Compiling Dossier...' : 'Generate Report'}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            title="Download PDF or Print Dossier"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            title="Download CSV spreadsheet"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Dashboard (Required 4 items) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Compliance Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Compliance Rate</span>
            <FileCheck2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">87%</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">
              National statutory benchmark
            </div>
          </div>
        </div>

        {/* Safety Compliance */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Safety Compliance</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-emerald-700 tabular-nums">91%</div>
            <div className="text-[11px] text-slate-500 mt-1">
              DGMS CMR 2017 adherence
            </div>
          </div>
        </div>

        {/* Environmental Compliance */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Environmental Compliance</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">84%</div>
            <div className="text-[11px] text-amber-700 font-semibold mt-1">
              CAAQMS continuous sampling
            </div>
          </div>
        </div>

        {/* Inspection Completion */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Inspection Completion</span>
            <ClipboardCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">78%</div>
            <div className="text-[11px] text-slate-500 mt-1">
              18 inspections pending
            </div>
          </div>
        </div>

      </div>

      {/* Report Selection Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {reportTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeReport === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveReport(tab.id as ReportType)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-blue-50/80 border-blue-500 ring-1 ring-blue-500 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-slate-500'}`} />
                {isActive && (
                  <span className="text-[10px] font-bold text-blue-800 uppercase bg-blue-100 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </div>
              <div className="mt-3">
                <div className={`text-sm font-bold ${isActive ? 'text-blue-950' : 'text-slate-900'}`}>
                  {tab.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {tab.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Report View Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Report Preview Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Active Dossier
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-mono font-semibold text-blue-800">
                Ref: CIL/DGMS/2026-Q3
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 mt-0.5">
              {reportTabs.find(t => t.id === activeReport)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Compiled: {lastGenerated}</span>
            </span>
          </div>
        </div>

        {/* Dynamic Report Content Table */}
        <div className="overflow-x-auto">
          {activeReport === 'inspection' ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <th className="py-3 px-4">Inspection ID</th>
                  <th className="py-3 px-4">Target Mine</th>
                  <th className="py-3 px-4">Inspection Type</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Officer In-Charge</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Risk Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {inspections.map((ins) => (
                  <tr key={ins.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">{ins.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{ins.mineName}</td>
                    <td className="py-3 px-4 text-slate-700">{ins.type}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{ins.date}</td>
                    <td className="py-3 px-4 text-slate-700">{ins.inspectorName}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800">
                        {ins.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        ins.riskLevel === 'High' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {ins.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <th className="py-3 px-4">Requirement & Statutory Reference</th>
                  <th className="py-3 px-4">Mine & Subsidiary</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4 text-center">Audit Status</th>
                  <th className="py-3 px-4">Evidence Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {complianceRecords
                  .filter(r => activeReport === 'compliance' || (activeReport === 'safety' ? r.category === 'Safety' : r.category === 'Environment'))
                  .map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{rec.requirement}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{rec.statutoryRef}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">{rec.mineName}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                          {rec.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-slate-700">{rec.dueDate}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          rec.status === 'Compliant'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rec.status === 'Pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {rec.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {rec.evidenceSubmitted ? (
                          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-red-600 font-bold">
                            Missing Document
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Certified under Mines Act 1952 statutory compliance schedule for SIH 2026.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              className="text-blue-700 font-bold hover:underline"
            >
              Print Statutory Dossier (.PDF) →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

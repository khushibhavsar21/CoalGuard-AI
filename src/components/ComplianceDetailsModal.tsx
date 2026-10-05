import React from 'react';
import { 
  X, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Building2, 
  User, 
  Calendar, 
  ArrowRight,
  ExternalLink,
  Download
} from 'lucide-react';
import { ComplianceRecord } from '../types';

interface ComplianceDetailsModalProps {
  record: ComplianceRecord | null;
  onClose: () => void;
  onScheduleInspection: (mineId: string) => void;
  onAnalyzeRisk: (mineId: string) => void;
  onUploadEvidence: (recordId: string) => void;
}

export const ComplianceDetailsModal: React.FC<ComplianceDetailsModalProps> = ({
  record,
  onClose,
  onScheduleInspection,
  onAnalyzeRisk,
  onUploadEvidence
}) => {
  if (!record) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Overdue': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">{record.id}</span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-semibold text-slate-600">{record.category} Compliance</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight mt-0.5">
                {record.requirement}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          {/* Key Status Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Status</span>
              <div className="mt-1">
                <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold border ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mine</span>
              <p className="mt-1 font-bold text-slate-900 truncate">{record.mineName}</p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Due Date</span>
              <p className="mt-1 font-bold text-slate-900 font-mono">{record.dueDate}</p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Last Audit</span>
              <p className="mt-1 font-medium text-slate-600 font-mono">{record.lastAuditDate}</p>
            </div>
          </div>

          {/* Statutory Reference */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
            <div className="flex items-center gap-1.5 text-blue-900 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>Statutory Regulation & Mandate</span>
            </div>
            <p className="mt-1.5 text-xs font-semibold text-blue-950 leading-relaxed">
              {record.statutoryRef}
            </p>
            <div className="mt-2 text-[11px] text-blue-800">
              <strong className="font-semibold text-red-700">Statutory Liability: </strong>
              <span>{record.penaltyRisk}</span>
            </div>
          </div>

          {/* Inspector Notes */}
          <div>
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Inspector Observations & Field Findings
            </span>
            <div className="mt-1.5 p-3.5 bg-white rounded-lg border border-slate-200 text-slate-800 leading-relaxed font-mono text-[11px]">
              "{record.inspectorNotes}"
            </div>
          </div>

          {/* Assigned Authority */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Assigned Compliance Officer</span>
                <div className="text-xs font-bold text-slate-900">{record.assignedOfficer}</div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500">Evidence Documentation</span>
              <div className="text-xs font-semibold">
                {record.evidenceSubmitted ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified: {record.evidenceName || 'Uploaded'}</span>
                  </span>
                ) : (
                  <span className="text-red-600 font-bold">Pending Submission</span>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => onUploadEvidence(record.id)}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
          >
            {record.evidenceSubmitted ? 'Replace Evidence' : 'Attach Verification Evidence'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onAnalyzeRisk(record.mineId);
              }}
              className="px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>View Mine AI Risk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                onClose();
                onScheduleInspection(record.mineId);
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Schedule Inspection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

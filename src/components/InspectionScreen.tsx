import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Upload, 
  FileText, 
  ArrowRight, 
  Building2, 
  Camera, 
  Sparkles,
  ShieldAlert,
  Check,
  RotateCcw
} from 'lucide-react';
import { Mine, InspectionRecord, ChecklistStatus, ChecklistItem } from '../types';

interface InspectionScreenProps {
  mines: Mine[];
  inspections: InspectionRecord[];
  onAddInspection: (inspection: InspectionRecord) => void;
  onNavigateToRisk: (mineId: string) => void;
  preselectedMineId?: string;
}

export const InspectionScreen: React.FC<InspectionScreenProps> = ({
  mines,
  inspections,
  onAddInspection,
  onNavigateToRisk,
  preselectedMineId
}) => {
  // Step 1: Select Mine
  const [selectedMineId, setSelectedMineId] = useState<string>(preselectedMineId || 'MINE-001');
  
  // Step 2: Inspection Type
  const [inspectionType, setInspectionType] = useState<'Safety' | 'Environment' | 'Equipment' | 'Regulatory'>('Safety');

  // Step 3: Checklist
  const [checklist, setChecklist] = useState<{ id: string; question: string; status: ChecklistStatus; note: string }[]>([
    { id: 'q1', question: 'Emergency exits accessible?', status: 'PASS', note: '' },
    { id: 'q2', question: 'PPE available?', status: 'PASS', note: '' },
    { id: 'q3', question: 'Fire safety equipment functional?', status: 'NEEDS_ATTENTION', note: 'Fire extinguisher pressure slightly low' },
    { id: 'q4', question: 'Machinery safety maintained?', status: 'FAIL', note: 'Winder emergency brake solenoid sweating fluid' },
    { id: 'q5', question: 'Safety protocols followed?', status: 'FAIL', note: 'Gas monitoring register log missing entry' }
  ]);

  // Step 4: Observation text box
  const [observations, setObservations] = useState(
    'Methane detector battery low in Pit 4. Return ventilation airway shows airflow degradation below 6 m3/s statutory threshold. Debris obstruction at Incline 2 emergency egress route.'
  );

  // Step 5: Evidence upload UI
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'Incline2_Egress_Obstruction.jpg',
    'Gas_Sampling_Sensor_Reading.png'
  ]);
  const [isUploading, setIsUploading] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInspection, setSubmittedInspection] = useState<InspectionRecord | null>(null);

  const selectedMine = mines.find(m => m.id === selectedMineId) || mines[0];

  const handleStatusChange = (questionId: string, newStatus: ChecklistStatus) => {
    setChecklist(prev => prev.map(item => 
      item.id === questionId ? { ...item, status: newStatus } : item
    ));
  };

  const handleSimulatedFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadedFiles(prev => [...prev, `Inspection_Site_Photo_${Date.now().toString().slice(-4)}.jpg`]);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Determine risk level based on fails
      const failCount = checklist.filter(c => c.status === 'FAIL').length;
      const needsAttentionCount = checklist.filter(c => c.status === 'NEEDS_ATTENTION').length;
      
      let computedRisk: 'High' | 'Medium' | 'Low' = 'Low';
      if (failCount >= 2 || (failCount >= 1 && needsAttentionCount >= 1)) {
        computedRisk = 'High';
      } else if (failCount === 1 || needsAttentionCount >= 2) {
        computedRisk = 'Medium';
      }

      const newId = `INS-2026-1042`;

      const newRecord: InspectionRecord = {
        id: newId,
        mineId: selectedMine.id,
        mineName: selectedMine.name,
        type: inspectionType,
        inspectorName: 'Er. Sandeep Mukherjee',
        inspectorRole: 'DGMS Senior Field Inspector',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Submitted',
        riskLevel: computedRisk,
        checklist: checklist.map(c => ({
          id: c.id,
          question: c.question,
          status: c.status,
          notes: c.note
        })),
        observations,
        evidenceFileName: uploadedFiles[0] || 'Inspection_Dossier_2026.pdf',
        statutoryRegulation: 'DGMS Coal Mines Regulations 2017 - Regulation 152 & Section 22'
      };

      onAddInspection(newRecord);
      setSubmittedInspection(newRecord);
      setIsSubmitting(false);
    }, 800);
  };

  const handleResetForm = () => {
    setSubmittedInspection(null);
    setChecklist([
      { id: 'q1', question: 'Emergency exits accessible?', status: 'PASS', note: '' },
      { id: 'q2', question: 'PPE available?', status: 'PASS', note: '' },
      { id: 'q3', question: 'Fire safety equipment functional?', status: 'PASS', note: '' },
      { id: 'q4', question: 'Machinery safety maintained?', status: 'PASS', note: '' },
      { id: 'q5', question: 'Safety protocols followed?', status: 'PASS', note: '' }
    ]);
    setObservations('');
    setUploadedFiles([]);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
            <span>DGMS On-Site Verification Protocol</span>
            <span>·</span>
            <span>Digital Audit Dossier</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Field Inspection
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Conduct and record statutory safety, environmental, and equipment field inspections with geotagged evidence.
          </p>
        </div>

        {submittedInspection && (
          <button
            onClick={handleResetForm}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Another Inspection</span>
          </button>
        )}
      </div>

      {/* Submitted Confirmation Banner */}
      {submittedInspection && (
        <div className="p-6 bg-white border-2 border-emerald-500 rounded-2xl shadow-xl space-y-4 animate-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Verification Successful
                </span>
                <h2 className="text-xl font-black text-slate-900">
                  Inspection submitted successfully.
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Logged into Central DGMS Compliance Repository and mapped into the AI Risk Model.
                </p>
              </div>
            </div>

            <span className="px-3 py-1 bg-red-100 text-red-800 font-extrabold text-xs rounded-full border border-red-200 uppercase">
              Risk: {submittedInspection.riskLevel}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px]">Inspection ID</span>
              <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                {submittedInspection.id}
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px]">Status</span>
              <div className="font-bold text-blue-700 mt-0.5">
                {submittedInspection.status}
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px]">Target Mine</span>
              <div className="font-bold text-slate-900 mt-0.5 truncate">
                {submittedInspection.mineName}
              </div>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px]">Computed Hazard</span>
              <div className="font-bold text-red-600 mt-0.5">
                Risk: {submittedInspection.riskLevel}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <p className="text-xs text-slate-600">
              Failure observations automatically escalated to Area Safety Officer and fed into the AI Compliance Engine.
            </p>

            <button
              onClick={() => onNavigateToRisk(submittedInspection.mineId)}
              className="w-full sm:w-auto px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View AI Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Workflow Card */}
      {!submittedInspection && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          <div className="p-5 border-b border-slate-200 bg-slate-50">
            <h2 className="text-base font-bold text-slate-900">Field Inspection Protocol Workflow</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Complete each required step to register an official DGMS statutory inspection.
            </p>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Step 1 & 2: Select Mine and Inspection Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Step 1: Select Mine */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Step 1: Select Mine
                </label>
                <select
                  value={selectedMineId}
                  onChange={(e) => setSelectedMineId(e.target.value)}
                  className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden shadow-2xs"
                >
                  {mines.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.subsidiary} - {m.state})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500">
                  Current Risk Score: <strong className="text-slate-800">{selectedMine.riskScore}/100</strong> ({selectedMine.riskLevel})
                </p>
              </div>

              {/* Step 2: Inspection Type */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Step 2: Inspection Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-0.5">
                  {(['Safety', 'Environment', 'Equipment', 'Regulatory'] as const).map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setInspectionType(type)}
                      className={`py-2 px-2 text-xs font-bold rounded-lg border transition-all ${
                        inspectionType === type
                          ? 'bg-blue-700 text-white border-blue-700 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500">
                  Evaluated category: <strong className="text-slate-800">{inspectionType} Audit</strong>
                </p>
              </div>

            </div>

            {/* Step 3: Statutory Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Step 3: Statutory Checklist
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Assess each mandatory verification item under DGMS standard parameters.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">
                  5 Items Required
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl divide-y divide-slate-200 overflow-hidden">
                {checklist.map((item, index) => (
                  <div key={item.id} className="p-4 bg-white hover:bg-slate-50/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    <div className="flex items-start gap-2.5">
                      <span className="text-xs font-mono font-bold text-slate-400 mt-0.5">
                        0{index + 1}.
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {item.question}
                        </div>
                        {item.note && (
                          <div className="text-[11px] text-red-600 mt-0.5">
                            Observation: {item.note}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* PASS / FAIL / NEEDS ATTENTION Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(item.id, 'PASS')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all ${
                          item.status === 'PASS'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                            : 'bg-white text-emerald-700 border-slate-300 hover:bg-emerald-50'
                        }`}
                      >
                        PASS
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(item.id, 'NEEDS_ATTENTION')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all ${
                          item.status === 'NEEDS_ATTENTION'
                            ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                            : 'bg-white text-amber-700 border-slate-300 hover:bg-amber-50'
                        }`}
                      >
                        NEEDS ATTENTION
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStatusChange(item.id, 'FAIL')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md border transition-all ${
                          item.status === 'FAIL'
                            ? 'bg-red-600 text-white border-red-600 shadow-2xs'
                            : 'bg-white text-red-700 border-slate-300 hover:bg-red-50'
                        }`}
                      >
                        FAIL
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Observation text box */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                Step 4: Observation & Hazard Log
              </label>
              <textarea
                rows={3}
                required
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Enter specific field observations, equipment serial tags, seam coordinates..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-hidden font-mono"
              />
              <p className="text-[11px] text-slate-400">
                Detailed notes are automatically parsed by the AI Risk Engine for anomaly keywords.
              </p>
            </div>

            {/* Step 5: Evidence upload UI */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                Step 5: Evidence Upload & Geotagged Media
              </label>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-5 text-center bg-slate-50 hover:bg-slate-100/60 transition-colors">
                <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">
                  Drag and drop inspection photos, gas logs, or NDT certificates
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supported: JPEG, PNG, PDF up to 25MB with embedded GPS metadata
                </p>

                <div className="mt-3">
                  <button
                    type="button"
                    onClick={handleSimulatedFileUpload}
                    disabled={isUploading}
                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Uploading file...' : 'Browse & Attach Evidence'}</span>
                  </button>
                </div>
              </div>

              {/* Uploaded File Previews */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Attached Files ({uploadedFiles.length}):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {uploadedFiles.map((file, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 font-mono font-medium"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step 6: Submit Inspection Button */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                Step 6: Confirm submission under penalty of Mines Act 1952 statutory declaration.
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Recording Inspection...</span>
                ) : (
                  <>
                    <ClipboardCheck className="w-4 h-4 text-blue-200" />
                    <span>Submit Inspection</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </form>
      )}

      {/* Recent Field Inspections Log Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Field Inspection Dossiers</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Immutable statutory record of all recent DGMS and internal mine audits.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Total Logged: {inspections.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-4">Inspection ID</th>
                <th className="py-3 px-4">Mine</th>
                <th className="py-3 px-4">Audit Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Inspector</th>
                <th className="py-3 px-4 text-center">Risk Level</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {inspections.map((ins) => (
                <tr key={ins.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-700">
                    {ins.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {ins.mineName}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                      {ins.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">
                    {ins.date}
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    {ins.inspectorName}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                      ins.riskLevel === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : ins.riskLevel === 'Medium' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {ins.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-800">
                      {ins.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

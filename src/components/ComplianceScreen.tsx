import React, { useState, useMemo } from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Filter, 
  Search, 
  Download, 
  Building2, 
  ExternalLink,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ComplianceRecord, ComplianceCategory, ComplianceStatus } from '../types';
import { ComplianceDetailsModal } from './ComplianceDetailsModal';
import { downloadCSV } from '../utils/helpers';

interface ComplianceScreenProps {
  records: ComplianceRecord[];
  onScheduleInspection: (mineId: string) => void;
  onAnalyzeRisk: (mineId: string) => void;
  onUpdateRecordStatus?: (recordId: string, status: ComplianceStatus) => void;
  preselectedMineId?: string;
}

export const ComplianceScreen: React.FC<ComplianceScreenProps> = ({
  records,
  onScheduleInspection,
  onAnalyzeRisk,
  preselectedMineId
}) => {
  const [selectedMine, setSelectedMine] = useState<string>(preselectedMineId || 'ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalRecord, setActiveModalRecord] = useState<ComplianceRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const minesList = useMemo(() => {
    const names = Array.from(new Set(records.map(r => r.mineName)));
    return names;
  }, [records]);

  const categories: ComplianceCategory[] = ['Safety', 'Environment', 'Labour', 'Equipment', 'Regulatory'];
  const statuses: ComplianceStatus[] = ['Compliant', 'Pending', 'Overdue', 'Critical'];

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      if (selectedMine !== 'ALL' && record.mineName !== selectedMine && record.mineId !== selectedMine) {
        return false;
      }
      if (selectedCategory !== 'ALL' && record.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== 'ALL' && record.status !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesReq = record.requirement.toLowerCase().includes(query);
        const matchesMine = record.mineName.toLowerCase().includes(query);
        const matchesRef = record.statutoryRef.toLowerCase().includes(query);
        return matchesReq || matchesMine || matchesRef;
      }
      return true;
    });
  }, [records, selectedMine, selectedCategory, selectedStatus, searchQuery]);

  const resetFilters = () => {
    setSelectedMine('ALL');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSearchQuery('');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUploadEvidence = (recordId: string) => {
    showToast(`Verification evidence uploaded successfully for record #${recordId}. Marked for DGMS audit.`);
  };

  const getStatusBadge = (status: ComplianceStatus) => {
    switch (status) {
      case 'Compliant':
        return <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Compliant</span>;
      case 'Pending':
        return <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Pending</span>;
      case 'Overdue':
        return <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800">Overdue</span>;
      case 'Critical':
        return <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 animate-pulse">Critical</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom duration-200 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
            <span>DGMS Coal Mines Regulations 2017</span>
            <span>·</span>
            <span>Statutory Verification</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Compliance Monitoring
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tracking 120 statutory requirements across safety, environmental, labor, and machinery operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadCSV(filteredRecords, 'CoalGuard_Statutory_Compliance_Export.csv')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Table (.CSV)</span>
          </button>
        </div>
      </div>

      {/* Top 4 Compliance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Requirements */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Requirements</span>
            <FileCheck2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">120</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Statutory DGMS / CPCB mandates
            </div>
          </div>
        </div>

        {/* Compliant */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Compliant</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-emerald-700 tabular-nums">104</div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              86.7% adherence rate
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Pending</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-amber-600 tabular-nums">9</div>
            <div className="text-[11px] text-amber-700 font-medium mt-1">
              Within permissible grace window
            </div>
          </div>
        </div>

        {/* Overdue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Overdue</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-red-600 tabular-nums">7</div>
            <div className="text-[11px] text-red-700 font-medium mt-1">
              Statutory closure notices pending
            </div>
          </div>
        </div>

      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search requirement, statutory regulation, or mine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:bg-white"
            />
          </div>

          {/* Mine Filter */}
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase whitespace-nowrap">Mine:</label>
            <select
              value={selectedMine}
              onChange={(e) => setSelectedMine(e.target.value)}
              className="py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
            >
              <option value="ALL">All Mines (5)</option>
              {minesList.map(mine => (
                <option key={mine} value={mine}>{mine}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase whitespace-nowrap">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
            >
              <option value="ALL">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase whitespace-nowrap">Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
            >
              <option value="ALL">All Statuses</option>
              {statuses.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Reset button */}
          {(selectedMine !== 'ALL' || selectedCategory !== 'ALL' || selectedStatus !== 'ALL' || searchQuery !== '') && (
            <button
              onClick={resetFilters}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 text-xs"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

        </div>

        {/* Filter count feedback */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-800">{filteredRecords.length}</strong> matching compliance mandates
          </span>
          {selectedMine !== 'ALL' && (
            <span className="text-blue-700 font-semibold">
              Filtered for: {selectedMine}
            </span>
          )}
        </div>
      </div>

      {/* Compliance Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-4">Requirement</th>
                <th className="py-3 px-4">Mine</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No compliance records match your selected filters. Try resetting the filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => {
                  const isHighlighted = record.status === 'Critical' || record.status === 'Overdue';

                  return (
                    <tr 
                      key={record.id} 
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isHighlighted ? 'bg-red-50/20' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{record.requirement}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5 truncate max-w-sm">
                          {record.statutoryRef}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800">{record.mineName}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                          {record.category}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono font-medium text-slate-700">
                        {record.dueDate}
                      </td>

                      <td className="py-3 px-4 text-center">
                        {getStatusBadge(record.status)}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => setActiveModalRecord(record)}
                          className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors shadow-2xs"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span>DGMS statutory audit frequency: Fortnightly sync enabled</span>
          <button
            onClick={() => onAnalyzeRisk('MINE-001')}
            className="font-bold text-blue-700 hover:underline flex items-center gap-1"
          >
            <span>Run AI Risk Engine on Overdue Items</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Details Modal */}
      <ComplianceDetailsModal
        record={activeModalRecord}
        onClose={() => setActiveModalRecord(null)}
        onScheduleInspection={onScheduleInspection}
        onAnalyzeRisk={onAnalyzeRisk}
        onUploadEvidence={handleUploadEvidence}
      />

    </div>
  );
};

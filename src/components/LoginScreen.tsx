import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Sparkles 
} from 'lucide-react';
import { UserRole } from '../types';
import { CoalGuardLogo, IndiaGovEmblem } from './Emblem';

interface LoginScreenProps {
  onLogin: (role: UserRole, userId: string) => void;
  selectedRole: UserRole;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, selectedRole: initialRole }) => {
  const [userId, setUserId] = useState('EMP-CIL-8841');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserRole>(initialRole || 'Compliance Officer');
  const [isLoading, setIsLoading] = useState(false);

  const roles: { role: UserRole; desc: string; sampleId: string }[] = [
    { role: 'Administrator', desc: 'Central Ministry & HQ Oversight', sampleId: 'ADM-MOC-1001' },
    { role: 'Mine Manager', desc: 'On-site Operations & Safety Incharge', sampleId: 'MGR-BCCL-4022' },
    { role: 'Compliance Officer', desc: 'DGMS Statutory Standards & Audits', sampleId: 'EMP-CIL-8841' },
    { role: 'Field Inspector', desc: 'Site Checklist & Hazard Verification', sampleId: 'INS-DGMS-9204' }
  ];

  const handleRoleSelect = (newRole: UserRole, sampleId: string) => {
    setRole(newRole);
    setUserId(sampleId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(role, userId);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-900">
      
      {/* Top Bar with Ministry Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IndiaGovEmblem size={30} />
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div>
              <div className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                Ministry of Coal · Government of India
              </div>
              <div className="text-[11px] font-medium text-slate-500">
                Coal India Limited (CIL) Regulatory Governance Network
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>DGMS CMR 2017 Regulatory Protocol Active</span>
          </div>
        </div>
      </header>

      {/* Main Login Center Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-slate-900 text-white p-6 sm:p-7 border-b border-slate-800 text-center relative">
            <div className="flex justify-center mb-3">
              <CoalGuardLogo size={48} />
            </div>
            
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              CoalGuard <span className="text-blue-400">AI</span>
            </h1>
            <p className="text-xs font-medium text-blue-200 mt-1">
              Intelligent Compliance. Safer Mines. Smarter Governance.
            </p>
            
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Smart India Hackathon 2026 · PS #26024</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
            
            {/* Role Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Designated Role
              </label>
              <select
                value={role}
                onChange={(e) => {
                  const newRole = e.target.value as UserRole;
                  const matching = roles.find(r => r.role === newRole);
                  handleRoleSelect(newRole, matching?.sampleId || 'EMP-CIL-8841');
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
              >
                {roles.map((r) => (
                  <option key={r.role} value={r.role}>
                    {r.role} - {r.desc}
                  </option>
                ))}
              </select>
            </div>

            {/* User ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Official User ID / Employee Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="e.g. EMP-CIL-8841"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Portal Security Key / Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Fast Demo Role Selectors */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span>Quick Role Presets (For Evaluators)</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {roles.map((r) => (
                  <button
                    type="button"
                    key={r.role}
                    onClick={() => handleRoleSelect(r.role, r.sampleId)}
                    className={`px-2.5 py-1.5 text-xs rounded-md text-left transition-colors border ${
                      role === r.role
                        ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="truncate">{r.role}</div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">{r.sampleId}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <span>Authenticating Credentials...</span>
                ) : (
                  <>
                    <span>Enter Coal Mine Governance Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center pt-2">
              <p className="text-[11px] text-slate-500">
                Authorized for Coal India Limited subsidiaries (BCCL, SECL, MCL, NCL, ECL)
              </p>
            </div>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Ministry of Coal · Coal India Limited · Smart India Hackathon 2026 Prototype
          </div>
          <div className="text-slate-400 text-[11px]">
            Statutory Framework: DGMS CMR 2017 & Mines Act 1952
          </div>
        </div>
      </footer>

    </div>
  );
};

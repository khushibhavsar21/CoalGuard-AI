import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  ShieldCheck, 
  LogOut, 
  ChevronDown, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  UserCheck,
  Building2,
  ExternalLink
} from 'lucide-react';
import { UserProfile, UserRole, AlertItem } from '../types';
import { CoalGuardLogo, IndiaGovEmblem } from './Emblem';

interface NavbarProps {
  user: UserProfile;
  currentScreen: string;
  alerts: AlertItem[];
  onSelectScreen: (screen: string) => void;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
  onAlertClick: (alert: AlertItem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  currentScreen,
  alerts,
  onSelectScreen,
  onRoleChange,
  onLogout,
  onAlertClick
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadAlerts = alerts.filter(a => !a.isRead);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: UserRole[] = [
    'Administrator',
    'Mine Manager',
    'Compliance Officer',
    'Field Inspector'
  ];

  const getScreenTitle = (screen: string) => {
    switch (screen) {
      case 'dashboard': return 'Governance Dashboard';
      case 'compliance': return 'Compliance Monitoring';
      case 'ai-risk': return 'AI Risk Engine';
      case 'inspection': return 'Field Inspection';
      case 'reports': return 'Reports & Analytics';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        
        {/* Zone 1: Single element / Brand Lockup with Indian Gov & CIL context */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <IndiaGovEmblem size={24} />
          </div>
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          
          <button 
            onClick={() => onSelectScreen('dashboard')}
            className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90"
          >
            <CoalGuardLogo size={32} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-slate-900">CoalGuard</span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">AI</span>
              </div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider hidden md:block">
                Ministry of Coal · Coal India Ltd
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: Contextual Breadcrumb & SIH Badge */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500">
          <span className="font-medium text-slate-400">Portal</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">{getScreenTitle(currentScreen)}</span>
          <span className="mx-2 text-slate-300">·</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-900 bg-slate-100 px-2 py-0.5 rounded">
            <span>SIH 2026</span>
            <span className="text-slate-400 font-normal">#26024</span>
          </span>
        </div>

        {/* Zone 3: Actions - Notifications, Role selector, User profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Notifications Popover */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Recent Alerts & Notices"
              aria-label="Alerts"
            >
              <Bell className="w-5 h-5" />
              {unreadAlerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 uppercase tracking-wider">
                    <Bell className="w-3.5 h-3.5 text-blue-600" />
                    <span>Statutory Alerts ({alerts.length})</span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">
                    {unreadAlerts.length} unread
                  </span>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {alerts.map((alert) => (
                    <button
                      key={alert.id}
                      onClick={() => {
                        onAlertClick(alert);
                        setShowNotifications(false);
                      }}
                      className={`w-full text-left p-3 hover:bg-slate-50 transition-colors flex gap-2.5 items-start ${
                        !alert.isRead ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {alert.type === 'CRITICAL' && (
                          <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                            <AlertTriangle className="w-3 h-3" />
                          </div>
                        )}
                        {alert.type === 'WARNING' && (
                          <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                            <AlertTriangle className="w-3 h-3" />
                          </div>
                        )}
                        {alert.type === 'INFO' && (
                          <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <Info className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {alert.title}
                          </p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">
                            {alert.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                          {alert.message}
                        </p>
                        {alert.mineName && (
                          <span className="inline-block mt-1 text-[10px] font-semibold text-slate-500">
                            Mine: {alert.mineName}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="px-3 py-2 border-t border-slate-100 bg-slate-50 text-center">
                  <button
                    onClick={() => {
                      onSelectScreen('compliance');
                      setShowNotifications(false);
                    }}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
                  >
                    View All Compliance Warnings & Action Items
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200" />

          {/* User Profile & Role Switcher */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 text-left rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            >
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-slate-200">
                {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[130px]">
                  {user.name}
                </div>
                <div className="text-[11px] font-medium text-blue-700">
                  {user.role}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{user.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    <Building2 className="w-3 h-3 text-slate-500" />
                    <span>{user.subsidiary}</span>
                  </div>
                </div>

                {/* Role Switcher for SIH evaluation */}
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Switch Active Persona (Evaluation Mode)
                  </div>
                  <div className="space-y-1">
                    {roles.map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          onRoleChange(role);
                          setShowProfileMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md flex items-center justify-between transition-colors ${
                          user.role === role 
                            ? 'bg-blue-50 font-bold text-blue-800' 
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <UserCheck className={`w-3.5 h-3.5 ${user.role === role ? 'text-blue-600' : 'text-slate-400'}`} />
                          {role}
                        </span>
                        {user.role === role && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-2 pt-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out to Login Screen</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

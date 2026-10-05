import React, { useState } from 'react';
import { 
  INITIAL_USER, 
  MINES_DATA, 
  INITIAL_COMPLIANCE_RECORDS, 
  INITIAL_INSPECTIONS, 
  INITIAL_ALERTS 
} from './data/mockData';
import { 
  UserProfile, 
  UserRole, 
  Mine, 
  ComplianceRecord, 
  InspectionRecord, 
  AlertItem 
} from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DemoFlowBar } from './components/DemoFlowBar';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ComplianceScreen } from './components/ComplianceScreen';
import { AIRiskAnalysisScreen } from './components/AIRiskAnalysisScreen';
import { InspectionScreen } from './components/InspectionScreen';
import { ReportsScreen } from './components/ReportsScreen';
import { Menu } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [mines, setMines] = useState<Mine[]>(MINES_DATA);
  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>(INITIAL_COMPLIANCE_RECORDS);
  const [inspections, setInspections] = useState<InspectionRecord[]>(INITIAL_INSPECTIONS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [selectedMineId, setSelectedMineId] = useState<string>('MINE-001'); // Dhanbad Central Mine default
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle Login
  const handleLogin = (role: UserRole, userId: string) => {
    setCurrentUser(prev => ({
      ...prev,
      role,
      id: userId || prev.id
    }));
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('login');
  };

  // Handle Role Change from Navbar
  const handleRoleChange = (role: UserRole) => {
    setCurrentUser(prev => ({
      ...prev,
      role
    }));
  };

  // Navigation callbacks
  const handleNavigateToRisk = (mineId?: string) => {
    if (mineId) setSelectedMineId(mineId);
    setCurrentScreen('ai-risk');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToCompliance = (mineId?: string) => {
    if (mineId) setSelectedMineId(mineId);
    setCurrentScreen('compliance');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToInspection = (mineId?: string) => {
    if (mineId) setSelectedMineId(mineId);
    setCurrentScreen('inspection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAlertClick = (alert: AlertItem) => {
    // Mark as read
    setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, isRead: true } : a));
    if (alert.mineId) {
      setSelectedMineId(alert.mineId);
      setCurrentScreen('ai-risk');
    } else {
      setCurrentScreen('compliance');
    }
  };

  const handleAddInspection = (newInspection: InspectionRecord) => {
    setInspections(prev => [newInspection, ...prev]);
    // Also add a new alert
    const newAlert: AlertItem = {
      id: `ALT-${Date.now().toString().slice(-4)}`,
      type: newInspection.riskLevel === 'High' ? 'CRITICAL' : 'INFO',
      title: `Field Inspection Registered: ${newInspection.id}`,
      message: `Completed ${newInspection.type} inspection at ${newInspection.mineName} with ${newInspection.riskLevel} risk rating.`,
      mineId: newInspection.mineId,
      mineName: newInspection.mineName,
      timestamp: 'Just now',
      isRead: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  // If not authenticated, show Login Screen (or allow direct demo login)
  if (!isAuthenticated || currentScreen === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        selectedRole={currentUser.role}
      />
    );
  }

  // Count critical records
  const criticalCount = complianceRecords.filter(r => r.status === 'Critical' || r.status === 'Overdue').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* SIH Demonstration Guided Header Flow Bar */}
      <DemoFlowBar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          if (screen === 'login') {
            setIsAuthenticated(false);
          }
          setCurrentScreen(screen);
        }}
      />

      {/* Top Navbar */}
      <Navbar
        user={currentUser}
        currentScreen={currentScreen}
        alerts={alerts}
        onSelectScreen={setCurrentScreen}
        onRoleChange={handleRoleChange}
        onLogout={handleLogout}
        onAlertClick={handleAlertClick}
      />

      {/* Mobile Menu Hamburger Ribbon (Mobile Only) */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-white"
        >
          <Menu className="w-4 h-4" />
          <span>Navigation Menu</span>
        </button>

        <span className="text-[11px] font-mono text-blue-300">
          Mine: {mines.find(m => m.id === selectedMineId)?.name || 'Dhanbad'}
        </span>
      </div>

      {/* Main App Layout: Sidebar + Viewport */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar */}
        <Sidebar
          currentScreen={currentScreen}
          onSelectScreen={setCurrentScreen}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          criticalCount={criticalCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              mines={mines}
              alerts={alerts}
              onNavigateToRisk={handleNavigateToRisk}
              onNavigateToCompliance={handleNavigateToCompliance}
              onNavigateToInspection={handleNavigateToInspection}
            />
          )}

          {currentScreen === 'compliance' && (
            <ComplianceScreen
              records={complianceRecords}
              onScheduleInspection={handleNavigateToInspection}
              onAnalyzeRisk={handleNavigateToRisk}
              preselectedMineId={selectedMineId}
            />
          )}

          {currentScreen === 'ai-risk' && (
            <AIRiskAnalysisScreen
              mines={mines}
              selectedMineId={selectedMineId}
              onSelectMine={setSelectedMineId}
              onDispatchInspection={handleNavigateToInspection}
            />
          )}

          {currentScreen === 'inspection' && (
            <InspectionScreen
              mines={mines}
              inspections={inspections}
              onAddInspection={handleAddInspection}
              onNavigateToRisk={handleNavigateToRisk}
              preselectedMineId={selectedMineId}
            />
          )}

          {currentScreen === 'reports' && (
            <ReportsScreen
              mines={mines}
              complianceRecords={complianceRecords}
              inspections={inspections}
            />
          )}

        </main>

      </div>

    </div>
  );
}

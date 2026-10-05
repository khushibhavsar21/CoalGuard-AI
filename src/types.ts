export type UserRole = 
  | 'Administrator'
  | 'Mine Manager'
  | 'Compliance Officer'
  | 'Field Inspector';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  designation: string;
  subsidiary: string;
  email: string;
}

export interface Mine {
  id: string;
  name: string;
  location: string;
  state: string;
  subsidiary: string;
  type: 'Underground' | 'Opencast' | 'Mixed';
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  riskScore: number;
  complianceRate: number;
  openViolations: number;
  pendingInspections: number;
  criticalViolations: number;
  dailyProductionTons: number;
  workforce: number;
  lastInspectionDate: string;
}

export type ComplianceCategory = 'Safety' | 'Environment' | 'Labour' | 'Equipment' | 'Regulatory';
export type ComplianceStatus = 'Compliant' | 'Pending' | 'Overdue' | 'Critical';

export interface ComplianceRecord {
  id: string;
  requirement: string;
  mineId: string;
  mineName: string;
  category: ComplianceCategory;
  dueDate: string;
  status: ComplianceStatus;
  statutoryRef: string;
  penaltyRisk: string;
  lastAuditDate: string;
  inspectorNotes: string;
  assignedOfficer: string;
  evidenceSubmitted: boolean;
  evidenceName?: string;
}

export type ChecklistStatus = 'PASS' | 'FAIL' | 'NEEDS_ATTENTION';

export interface ChecklistItem {
  id: string;
  question: string;
  status: ChecklistStatus;
  notes?: string;
}

export interface InspectionRecord {
  id: string;
  mineId: string;
  mineName: string;
  type: 'Safety' | 'Environment' | 'Equipment' | 'Regulatory';
  inspectorName: string;
  inspectorRole: string;
  date: string;
  status: 'Submitted' | 'Under Review' | 'Closed';
  riskLevel: 'High' | 'Medium' | 'Low';
  checklist: ChecklistItem[];
  observations: string;
  evidenceFileName?: string;
  statutoryRegulation?: string;
}

export interface AlertItem {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  message: string;
  mineId?: string;
  mineName?: string;
  timestamp: string;
  isRead: boolean;
}

export interface ActionPlanItem {
  priority: number;
  title: string;
  description: string;
  assignee: string;
  timeline: string;
  impact: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface AIRiskFactor {
  title: string;
  metric: string;
  score: number;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
}

export interface AIRiskProfile {
  mineId: string;
  mineName: string;
  riskScore: number;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  lastEvaluated: string;
  riskFactors: AIRiskFactor[];
  aiRecommendation: string;
  actionPlan: ActionPlanItem[];
}

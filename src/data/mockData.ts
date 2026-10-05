import {
  Mine,
  ComplianceRecord,
  InspectionRecord,
  AlertItem,
  AIRiskProfile,
  UserProfile
} from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'EMP-CIL-8841',
  name: 'Rajesh Kumar Verma',
  role: 'Compliance Officer',
  designation: 'Senior Director of Mine Safety & Compliance',
  subsidiary: 'Coal India Limited (HQ - Kolkata)',
  email: 'rajesh.verma@coalindia.gov.in'
};

export const MINES_DATA: Mine[] = [
  {
    id: 'MINE-001',
    name: 'Dhanbad Central Mine',
    location: 'Jharia Coalfield, Dhanbad',
    state: 'Jharkhand',
    subsidiary: 'Bharat Coking Coal Limited (BCCL)',
    type: 'Underground',
    riskLevel: 'HIGH',
    riskScore: 82,
    complianceRate: 71,
    openViolations: 6,
    pendingInspections: 3,
    criticalViolations: 4,
    dailyProductionTons: 14500,
    workforce: 1850,
    lastInspectionDate: '02 Oct 2026'
  },
  {
    id: 'MINE-002',
    name: 'Korba Coal Mine',
    location: 'Korba Coalfield, Korba',
    state: 'Chhattisgarh',
    subsidiary: 'South Eastern Coalfields Limited (SECL)',
    type: 'Opencast',
    riskLevel: 'MEDIUM',
    riskScore: 61,
    complianceRate: 84,
    openViolations: 3,
    pendingInspections: 2,
    criticalViolations: 1,
    dailyProductionTons: 32000,
    workforce: 2200,
    lastInspectionDate: '28 Sep 2026'
  },
  {
    id: 'MINE-003',
    name: 'Talcher Mine',
    location: 'Bhubaneswar/Angul Basin',
    state: 'Odisha',
    subsidiary: 'Mahanadi Coalfields Limited (MCL)',
    type: 'Opencast',
    riskLevel: 'LOW',
    riskScore: 39,
    complianceRate: 94,
    openViolations: 1,
    pendingInspections: 1,
    criticalViolations: 0,
    dailyProductionTons: 45000,
    workforce: 3100,
    lastInspectionDate: '01 Oct 2026'
  },
  {
    id: 'MINE-004',
    name: 'Singrauli Mine',
    location: 'Northern Coalfield Belt',
    state: 'Madhya Pradesh',
    subsidiary: 'Northern Coalfields Limited (NCL)',
    type: 'Opencast',
    riskLevel: 'HIGH',
    riskScore: 76,
    complianceRate: 77,
    openViolations: 5,
    pendingInspections: 4,
    criticalViolations: 2,
    dailyProductionTons: 38000,
    workforce: 2750,
    lastInspectionDate: '25 Sep 2026'
  },
  {
    id: 'MINE-005',
    name: 'Raniganj Mine',
    location: 'Asansol Coal Belt',
    state: 'West Bengal',
    subsidiary: 'Eastern Coalfields Limited (ECL)',
    type: 'Underground',
    riskLevel: 'LOW',
    riskScore: 28,
    complianceRate: 96,
    openViolations: 1,
    pendingInspections: 1,
    criticalViolations: 0,
    dailyProductionTons: 11000,
    workforce: 1400,
    lastInspectionDate: '04 Oct 2026'
  }
];

export const COMPLIANCE_TREND_DATA = [
  { month: 'May 2026', rate: 91, target: 85 },
  { month: 'Jun 2026', rate: 89, target: 85 },
  { month: 'Jul 2026', rate: 84, target: 85 },
  { month: 'Aug 2026', rate: 82, target: 85 },
  { month: 'Sep 2026', rate: 85, target: 85 },
  { month: 'Oct 2026', rate: 87, target: 85 }
];

export const INITIAL_COMPLIANCE_RECORDS: ComplianceRecord[] = [
  {
    id: 'CMP-1001',
    requirement: 'Safety Equipment Inspection',
    mineId: 'MINE-001',
    mineName: 'Dhanbad Central Mine',
    category: 'Safety',
    dueDate: '10 Oct 2026',
    status: 'Overdue',
    statutoryRef: 'DGMS Coal Mines Regulations 2017 - Regulation 152 (Inspection of Safety Lamps & Detectors)',
    penaltyRisk: 'Notice of Closure & ₹5,00,000 fine under Mines Act 1952 Sec 22',
    lastAuditDate: '15 Aug 2026',
    inspectorNotes: 'Gas sampling meters (multi-gas detectors) past due calibration by 14 days in Seam IV.',
    assignedOfficer: 'Er. Sandeep Mukherjee (DGMS Safety Inspector)',
    evidenceSubmitted: false
  },
  {
    id: 'CMP-1002',
    requirement: 'Air Quality Monitoring',
    mineId: 'MINE-002',
    mineName: 'Korba Coal Mine',
    category: 'Environment',
    dueDate: '15 Oct 2026',
    status: 'Compliant',
    statutoryRef: 'CPCB Guidelines & Environment (Protection) Act 1986 - PM10 / PM2.5 Continuous Sampling',
    penaltyRisk: 'State Pollution Control Board showcause notice',
    lastAuditDate: '28 Sep 2026',
    inspectorNotes: 'Continuous Ambient Air Quality Monitoring Station (CAAQMS) reporting PM10 within 92 µg/m3 threshold.',
    assignedOfficer: 'Dr. Priya Nambiar (State PCB Liaison)',
    evidenceSubmitted: true,
    evidenceName: 'Korba_AmbientAir_Sept2026_Report.pdf'
  },
  {
    id: 'CMP-1003',
    requirement: 'Worker Safety Training',
    mineId: 'MINE-003',
    mineName: 'Talcher Mine',
    category: 'Labour',
    dueDate: '12 Oct 2026',
    status: 'Pending',
    statutoryRef: 'Mines Vocational Training Rules 1966 - Refresher Training for Underground Miners',
    penaltyRisk: 'Suspension of non-certified miners from active haulage shift',
    lastAuditDate: '18 Sep 2026',
    inspectorNotes: 'Batch 14 completed (120 miners); Batch 15 scheduled for 09 Oct 2026.',
    assignedOfficer: 'Vikramaditya Jena (Training Officer MCL)',
    evidenceSubmitted: true,
    evidenceName: 'Batch14_Attendance_Verification.pdf'
  },
  {
    id: 'CMP-1004',
    requirement: 'Underground Methane & CO Sensor Calibration',
    mineId: 'MINE-001',
    mineName: 'Dhanbad Central Mine',
    category: 'Safety',
    dueDate: '08 Oct 2026',
    status: 'Critical',
    statutoryRef: 'DGMS Circular No. 04 of 2019 - Mandatory Telemetric Gas Monitoring Standards',
    penaltyRisk: 'Immediate Cessation of Work in Return Airway Sections',
    lastAuditDate: '10 Sep 2026',
    inspectorNotes: 'Two telemetry gas heads showing signal drift exceeding 0.3% CH4 in Return Airway 3.',
    assignedOfficer: 'Er. Sandeep Mukherjee (DGMS Safety Inspector)',
    evidenceSubmitted: false
  },
  {
    id: 'CMP-1005',
    requirement: 'Overburden Slope Stability Radar Audit',
    mineId: 'MINE-004',
    mineName: 'Singrauli Mine',
    category: 'Safety',
    dueDate: '05 Oct 2026',
    status: 'Overdue',
    statutoryRef: 'DGMS Tech Circular No. 02 of 2020 - Continuous Slope Stability Monitoring in Opencast Benches',
    penaltyRisk: 'Bench clearance embargo for Heavy Earth Moving Machinery',
    lastAuditDate: '02 Aug 2026',
    inspectorNotes: 'Geotechnical displacement monitor bench B-3 overdue for 3D LiDAR re-survey.',
    assignedOfficer: 'Harishankar Tripathi (Geotech Lead NCL)',
    evidenceSubmitted: false
  },
  {
    id: 'CMP-1006',
    requirement: 'Dust Suppression & Mist Water Sprinkling',
    mineId: 'MINE-004',
    mineName: 'Singrauli Mine',
    category: 'Environment',
    dueDate: '14 Oct 2026',
    status: 'Pending',
    statutoryRef: 'Ministry of Environment, Forest & Climate Change (MoEFCC) EC Conditions',
    penaltyRisk: 'Environmental Compensation Levy by CPCB',
    lastAuditDate: '22 Sep 2026',
    inspectorNotes: 'Fixed high-pressure mist cannons operational along 12km haul road; mobile tanker replenishment logged.',
    assignedOfficer: 'Anuradha Sen (Environmental Lead)',
    evidenceSubmitted: true,
    evidenceName: 'Singrauli_Dust_Log_W40.pdf'
  },
  {
    id: 'CMP-1007',
    requirement: 'Heavy Earth Moving Machinery (HEMM) Fitness Certification',
    mineId: 'MINE-005',
    mineName: 'Raniganj Mine',
    category: 'Equipment',
    dueDate: '20 Oct 2026',
    status: 'Compliant',
    statutoryRef: 'DGMS Standard Operating Procedures for Surface Mining Equipment (Dumper & Shovel)',
    penaltyRisk: 'Grounded vehicle status & operating permit suspension',
    lastAuditDate: '30 Sep 2026',
    inspectorNotes: 'All 24 Komatsu & BEML 100T dumpers fitted with functional rear-view cameras and automatic fire suppression.',
    assignedOfficer: 'Sunil Roy (Chief Mechanical Engineer)',
    evidenceSubmitted: true,
    evidenceName: 'Raniganj_HEMM_Fitness_Q3.pdf'
  },
  {
    id: 'CMP-1008',
    requirement: 'Mine Incline Ventilation Survey & Air Velocity Audit',
    mineId: 'MINE-001',
    mineName: 'Dhanbad Central Mine',
    category: 'Safety',
    dueDate: '07 Oct 2026',
    status: 'Critical',
    statutoryRef: 'DGMS Coal Mines Regulations 2017 - Regulation 153 (Quantity of Air in Ventilation Districts)',
    penaltyRisk: 'Prohibition notice under Section 22A of Mines Act',
    lastAuditDate: '07 Sep 2026',
    inspectorNotes: 'Air quantity at 5th Dip Section measured at 2.4 m3/s, below the statutory minimum of 6 m3/s.',
    assignedOfficer: 'Er. Sandeep Mukherjee (DGMS Safety Inspector)',
    evidenceSubmitted: false
  },
  {
    id: 'CMP-1009',
    requirement: 'Contractual Workmen Statutory Compensation & PF Audit',
    mineId: 'MINE-002',
    mineName: 'Korba Coal Mine',
    category: 'Labour',
    dueDate: '28 Oct 2026',
    status: 'Compliant',
    statutoryRef: 'Contract Labour (Regulation and Abolition) Act 1970 & CMPF Rules 1948',
    penaltyRisk: 'Labour Ministry penalty and contractor license debarment',
    lastAuditDate: '24 Sep 2026',
    inspectorNotes: 'All 480 outsourced transportation workers verified on Coal Mines Provident Fund portal.',
    assignedOfficer: 'M. S. Baghel (Personnel Manager SECL)',
    evidenceSubmitted: true,
    evidenceName: 'CMPF_Remittance_Audit_Sep2026.pdf'
  },
  {
    id: 'CMP-1010',
    requirement: 'Controlled Blasting Ground Vibration & Peak Particle Velocity (PPV) Survey',
    mineId: 'MINE-003',
    mineName: 'Talcher Mine',
    category: 'Regulatory',
    dueDate: '18 Oct 2026',
    status: 'Compliant',
    statutoryRef: 'DGMS Circular No. 07 of 1997 - Permissible Levels of Ground Vibration in Surface Mines',
    penaltyRisk: 'Stoppage of blasting permissions within 500m of residential zones',
    lastAuditDate: '29 Sep 2026',
    inspectorNotes: 'Seismograph recordings at Perimeter Village Ananta show PPV max 4.2 mm/s (permissible limit 10 mm/s).',
    assignedOfficer: 'Deepak Mohapatra (Blasting Incharge)',
    evidenceSubmitted: true,
    evidenceName: 'Talcher_PPV_Seismo_Logs.pdf'
  },
  {
    id: 'CMP-1011',
    requirement: 'Emergency Refuge Chamber & Self-Contained Self-Rescuers (SCSR) Audit',
    mineId: 'MINE-001',
    mineName: 'Dhanbad Central Mine',
    category: 'Safety',
    dueDate: '11 Oct 2026',
    status: 'Overdue',
    statutoryRef: 'DGMS Guideline on Refuge Chambers in Underground Coal Mines (2021)',
    penaltyRisk: 'Immediate DGMS show-cause notice',
    lastAuditDate: '11 Aug 2026',
    inspectorNotes: '18 units of SCSR breathing apparatus at Incline 4 requiring hydro-static pressure testing.',
    assignedOfficer: 'Er. Sandeep Mukherjee (DGMS Safety Inspector)',
    evidenceSubmitted: false
  },
  {
    id: 'CMP-1012',
    requirement: 'Effluent Treatment Plant (ETP) Acid Mine Drainage Discharge Analysis',
    mineId: 'MINE-005',
    mineName: 'Raniganj Mine',
    category: 'Environment',
    dueDate: '22 Oct 2026',
    status: 'Compliant',
    statutoryRef: 'Central Pollution Control Board Schedule VI - General Standards for Discharge of Environmental Pollutants',
    penaltyRisk: 'Closure of discharge outfall by West Bengal Pollution Control Board',
    lastAuditDate: '26 Sep 2026',
    inspectorNotes: 'Discharged neutralised water pH 7.2; suspended solids 48 mg/L (well within standard 100 mg/L limit).',
    assignedOfficer: 'Debabrata Ghosh (Environmental Officer ECL)',
    evidenceSubmitted: true,
    evidenceName: 'Raniganj_ETP_Analysis_Sep2026.pdf'
  }
];

export const INITIAL_INSPECTIONS: InspectionRecord[] = [
  {
    id: 'INS-2026-1041',
    mineId: 'MINE-001',
    mineName: 'Dhanbad Central Mine',
    type: 'Safety',
    inspectorName: 'Er. Sandeep Mukherjee',
    inspectorRole: 'DGMS Regional Inspector',
    date: '02 Oct 2026',
    status: 'Submitted',
    riskLevel: 'High',
    checklist: [
      { id: 'c1', question: 'Emergency exits accessible?', status: 'NEEDS_ATTENTION', notes: 'Escape haulage route partially blocked by loose debris at Pit 4.' },
      { id: 'c2', question: 'PPE available?', status: 'PASS', notes: 'Miners equipped with helmets, cap lamps, and boots.' },
      { id: 'c3', question: 'Fire safety equipment functional?', status: 'FAIL', notes: 'Two foam fire extinguishers near electrical sub-station uncharged.' },
      { id: 'c4', question: 'Machinery safety maintained?', status: 'FAIL', notes: 'Winder rope non-destructive testing past due date.' },
      { id: 'c5', question: 'Safety protocols followed?', status: 'FAIL', notes: 'Gas checking interval log omitted for Shift B on 01 Oct.' }
    ],
    observations: 'Critical observations regarding winder cable testing and blocked emergency route in Seam IV. Unresolved methane sensor calibration leaves return ventilation exposed.',
    evidenceFileName: 'Dhanbad_Incline4_Debris_Photo.jpg',
    statutoryRegulation: 'DGMS Coal Mines Regulations 2017 - Reg 152 & Reg 76'
  },
  {
    id: 'INS-2026-1040',
    mineId: 'MINE-004',
    mineName: 'Singrauli Mine',
    type: 'Equipment',
    inspectorName: 'Er. R. K. Shrivastava',
    inspectorRole: 'Superintending Mechanical Engineer',
    date: '25 Sep 2026',
    status: 'Under Review',
    riskLevel: 'High',
    checklist: [
      { id: 'c1', question: 'Emergency exits accessible?', status: 'PASS' },
      { id: 'c2', question: 'PPE available?', status: 'PASS' },
      { id: 'c3', question: 'Fire safety equipment functional?', status: 'PASS' },
      { id: 'c4', question: 'Machinery safety maintained?', status: 'NEEDS_ATTENTION', notes: 'Dragline boom hydraulic pressure relief valve sweating oil.' },
      { id: 'c5', question: 'Safety protocols followed?', status: 'NEEDS_ATTENTION', notes: 'Berm height along Section 7 pit wall falls short of required 2.5m.' }
    ],
    observations: 'Bench slope stability monitoring radar system needs recalibration. Continuous monitoring feed dropped 3 times during inspection.',
    evidenceFileName: 'Singrauli_Bench7_Berm_Measurement.jpg',
    statutoryRegulation: 'DGMS Tech Circular No. 02 of 2020'
  },
  {
    id: 'INS-2026-1039',
    mineId: 'MINE-002',
    mineName: 'Korba Coal Mine',
    type: 'Environment',
    inspectorName: 'Dr. Priya Nambiar',
    inspectorRole: 'CPCB Senior Environmental Assessor',
    date: '28 Sep 2026',
    status: 'Closed',
    riskLevel: 'Medium',
    checklist: [
      { id: 'c1', question: 'Emergency exits accessible?', status: 'PASS' },
      { id: 'c2', question: 'PPE available?', status: 'PASS' },
      { id: 'c3', question: 'Fire safety equipment functional?', status: 'PASS' },
      { id: 'c4', question: 'Machinery safety maintained?', status: 'PASS' },
      { id: 'c5', question: 'Safety protocols followed?', status: 'PASS' }
    ],
    observations: 'Air quality sampling points verified. Continuous mist spray guns operating on haul road. Recommends augmenting tree plantation buffer along northern boundary.',
    evidenceFileName: 'Korba_Ambient_Sensor_Audit.jpg',
    statutoryRegulation: 'CPCB Opencast Mine Guidelines 2021'
  },
  {
    id: 'INS-2026-1038',
    mineId: 'MINE-003',
    mineName: 'Talcher Mine',
    type: 'Regulatory',
    inspectorName: 'Deepak Mohapatra',
    inspectorRole: 'DGMS Certified Blasting Auditor',
    date: '01 Oct 2026',
    status: 'Closed',
    riskLevel: 'Low',
    checklist: [
      { id: 'c1', question: 'Emergency exits accessible?', status: 'PASS' },
      { id: 'c2', question: 'PPE available?', status: 'PASS' },
      { id: 'c3', question: 'Fire safety equipment functional?', status: 'PASS' },
      { id: 'c4', question: 'Machinery safety maintained?', status: 'PASS' },
      { id: 'c5', question: 'Safety protocols followed?', status: 'PASS' }
    ],
    observations: 'Electronic delay detonators properly accounted for in statutory explosive magazine register. PPV levels consistently below limits.',
    evidenceFileName: 'Talcher_Magazine_Register.jpg',
    statutoryRegulation: 'Explosives Rules 2008 & DGMS Reg 160'
  },
  {
    id: 'INS-2026-1037',
    mineId: 'MINE-005',
    mineName: 'Raniganj Mine',
    type: 'Safety',
    inspectorName: 'Sunil Roy',
    inspectorRole: 'Area Safety Officer ECL',
    date: '04 Oct 2026',
    status: 'Closed',
    riskLevel: 'Low',
    checklist: [
      { id: 'c1', question: 'Emergency exits accessible?', status: 'PASS' },
      { id: 'c2', question: 'PPE available?', status: 'PASS' },
      { id: 'c3', question: 'Fire safety equipment functional?', status: 'PASS' },
      { id: 'c4', question: 'Machinery safety maintained?', status: 'PASS' },
      { id: 'c5', question: 'Safety protocols followed?', status: 'PASS' }
    ],
    observations: 'Underground coal seam continuous haulage conveyors running smoothly with working pull-cord emergency stop switches.',
    evidenceFileName: 'Raniganj_PullCord_Test.jpg',
    statutoryRegulation: 'DGMS CMR 2017 Reg 88'
  },
  {
    id: 'INS-2026-1036',
    mineId: 'MINE-001',
    mineName: 'Dhanbad Central Mine',
    type: 'Equipment',
    inspectorName: 'Er. Sandeep Mukherjee',
    inspectorRole: 'DGMS Regional Inspector',
    date: '18 Sep 2026',
    status: 'Closed',
    riskLevel: 'High',
    checklist: [
      { id: 'c1', question: 'Emergency exits accessible?', status: 'PASS' },
      { id: 'c2', question: 'PPE available?', status: 'PASS' },
      { id: 'c3', question: 'Fire safety equipment functional?', status: 'NEEDS_ATTENTION' },
      { id: 'c4', question: 'Machinery safety maintained?', status: 'FAIL', notes: 'Man-riding winder emergency brake solenoid showed slow response.' },
      { id: 'c5', question: 'Safety protocols followed?', status: 'NEEDS_ATTENTION' }
    ],
    observations: 'Man-riding system at Incline 2 needs urgent overhaul of electric hoist braking mechanism.',
    evidenceFileName: 'Dhanbad_BrakeSolenoid_Reading.png',
    statutoryRegulation: 'DGMS CMR 2017 Reg 76 (Winding in Shafts & Inclines)'
  },
  {
    id: 'INS-2026-1035',
    mineId: 'MINE-002',
    mineName: 'Korba Coal Mine',
    type: 'Safety',
    inspectorName: 'Er. V. P. Patel',
    inspectorRole: 'Deputy Director DGMS Bilaspur',
    date: '14 Sep 2026',
    status: 'Closed',
    riskLevel: 'Medium',
    checklist: [
      { id: 'c1', question: 'Emergency exits accessible?', status: 'PASS' },
      { id: 'c2', question: 'PPE available?', status: 'PASS' },
      { id: 'c3', question: 'Fire safety equipment functional?', status: 'PASS' },
      { id: 'c4', question: 'Machinery safety maintained?', status: 'NEEDS_ATTENTION', notes: 'Water truck sprinkling nozzle choked on southern bench.' },
      { id: 'c5', question: 'Safety protocols followed?', status: 'PASS' }
    ],
    observations: 'General pit safety in accordance with regulations; corrective work ordered for haul road dust suppression nozzle lines.',
    evidenceFileName: 'Korba_BenchWater_Photo.jpg',
    statutoryRegulation: 'DGMS CMR 2017 Reg 108'
  },
  {
    id: 'INS-2026-1034',
    mineId: 'MINE-004',
    mineName: 'Singrauli Mine',
    type: 'Environment',
    inspectorName: 'Dr. Anita Rao',
    inspectorRole: 'MPPCB Regional Officer',
    date: '08 Sep 2026',
    status: 'Closed',
    riskLevel: 'Medium',
    checklist: [
      { id: 'c1', question: 'Emergency exits accessible?', status: 'PASS' },
      { id: 'c2', question: 'PPE available?', status: 'PASS' },
      { id: 'c3', question: 'Fire safety equipment functional?', status: 'PASS' },
      { id: 'c4', question: 'Machinery safety maintained?', status: 'PASS' },
      { id: 'c5', question: 'Safety protocols followed?', status: 'NEEDS_ATTENTION', notes: 'Topsoil preservation embankment lack geotextile netting.' }
    ],
    observations: 'Topsoil storage yard at Dump 4 requires bio-turfing and retention bund to prevent monsoon erosion.',
    evidenceFileName: 'Singrauli_Topsoil_Yard.jpg',
    statutoryRegulation: 'MoEFCC Environmental Clearance Guideline'
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'ALT-901',
    type: 'CRITICAL',
    title: 'Critical Safety Violations at Dhanbad Central Mine',
    message: 'Dhanbad Central Mine has 4 unresolved safety violations including methane sensor calibration and winder brake overhaul.',
    mineId: 'MINE-001',
    mineName: 'Dhanbad Central Mine',
    timestamp: '12 minutes ago',
    isRead: false
  },
  {
    id: 'ALT-902',
    type: 'WARNING',
    title: 'Overdue Statutory Inspections',
    message: '2 inspections are overdue: DGMS Safety Equipment Inspection (Dhanbad) and Slope Stability Audit (Singrauli).',
    mineId: 'MINE-004',
    mineName: 'Singrauli Mine',
    timestamp: '45 minutes ago',
    isRead: false
  },
  {
    id: 'ALT-903',
    type: 'INFO',
    title: 'Quarterly DGMS Compliance Portal Synchronization',
    message: 'Synchronized 104 compliant statutory certificates across BCCL, SECL, MCL, NCL, and ECL divisions.',
    timestamp: '3 hours ago',
    isRead: true
  },
  {
    id: 'ALT-904',
    type: 'WARNING',
    title: 'Environmental Deadline Warning - Korba Coal Mine',
    message: 'Quarterly ambient air quality continuous sensor certification renewal due in 10 days.',
    mineId: 'MINE-002',
    mineName: 'Korba Coal Mine',
    timestamp: '6 hours ago',
    isRead: false
  }
];

export const MINE_RISK_PROFILES: Record<string, AIRiskProfile> = {
  'MINE-001': {
    mineId: 'MINE-001',
    mineName: 'Dhanbad Central Mine',
    riskScore: 82,
    riskLevel: 'HIGH',
    lastEvaluated: '05 Oct 2026, 08:30 IST',
    riskFactors: [
      {
        title: '4 unresolved safety violations',
        metric: '4 Open Critical Items',
        score: 88,
        severity: 'High',
        description: 'Methane sensor calibration and ventilation airflow rate fail DGMS Regulation 152 & 153 standards.'
      },
      {
        title: '2 overdue inspections',
        metric: '14 Days Past Due',
        score: 79,
        severity: 'High',
        description: 'Mandatory quarterly mechanical winder rope testing and emergency refuge chamber audit delayed.'
      },
      {
        title: 'Repeated equipment-related observations',
        metric: '3 Recurring Faults',
        score: 84,
        severity: 'High',
        description: 'Incline 2 haulage winder braking solenoids flagged in consecutive inspections without certified replacement.'
      },
      {
        title: 'Upcoming environmental compliance deadline',
        metric: 'Due in 6 Days',
        score: 65,
        severity: 'Medium',
        description: 'Quarterly mine sump water discharge heavy-metal filtration report due for statutory submission.'
      }
    ],
    aiRecommendation: 'Schedule an immediate safety inspection and resolve critical equipment observations within 48 hours.',
    actionPlan: [
      {
        priority: 1,
        title: 'Resolve critical safety violations',
        description: 'Recalibrate underground telemetry gas sensors at Return Airway 3 and replace degraded winder brake solenoids at Incline 2.',
        assignee: 'Chief Safety Officer (BCCL) & DGMS Certified Electrical Engineer',
        timeline: 'Within 48 hours',
        impact: 'Removes immediate Section 22 work stoppage liability and reduces risk score by ~32 points.',
        status: 'Pending'
      },
      {
        priority: 2,
        title: 'Schedule inspection',
        description: 'Dispatch special DGMS taskforce to perform comprehensive ventilation survey at 5th Dip Section and clear emergency exit route.',
        assignee: 'Regional Field Inspection Unit (Dhanbad Zone)',
        timeline: 'Within 72 hours',
        impact: 'Ensures compliance with CMR 2017 Regulation 153 and verifies air circulation adequacy.',
        status: 'Pending'
      },
      {
        priority: 3,
        title: 'Upload missing compliance evidence',
        description: 'Digitally upload certified NDT testing certificates, SCSR pressure test logs, and gas sampling records to the CoalGuard compliance repository.',
        assignee: 'Mine General Manager & Compliance Officer',
        timeline: 'Within 5 calendar days',
        impact: 'Updates DGMS centralized compliance dashboard to compliant standing.',
        status: 'Pending'
      }
    ]
  },
  'MINE-004': {
    mineId: 'MINE-004',
    mineName: 'Singrauli Mine',
    riskScore: 76,
    riskLevel: 'HIGH',
    lastEvaluated: '05 Oct 2026, 07:15 IST',
    riskFactors: [
      {
        title: '2 overdue inspections',
        metric: '9 Days Past Due',
        score: 74,
        severity: 'High',
        description: 'Geotechnical slope stability audit of Bench 7 overdue per DGMS Tech Circular 02/2020.'
      },
      {
        title: '2 critical violations',
        metric: '2 Critical Flags',
        score: 80,
        severity: 'High',
        description: 'Overburden bench berm height short of safety guidelines; radar telemetry signal dropout.'
      },
      {
        title: 'Upcoming environmental compliance deadline',
        metric: 'Due in 9 Days',
        score: 62,
        severity: 'Medium',
        description: 'MoEFCC topsoil preservation embankment bio-turfing verification needed.'
      },
      {
        title: 'HEMM traffic safety observations',
        metric: '1 Pending',
        score: 55,
        severity: 'Medium',
        description: 'Haul road blind corner mirror cleaning and demarcation maintenance.'
      }
    ],
    aiRecommendation: 'Execute ground stability radar calibration and restore bench berm heights along Sector 7 within 72 hours.',
    actionPlan: [
      {
        priority: 1,
        title: 'Resolve critical safety violations',
        description: 'Rebuild safety berm to minimum 2.5m height and deploy mobile radar unit on Bench B-3.',
        assignee: 'Opencast Mine Manager (NCL)',
        timeline: 'Within 48 hours',
        impact: 'Prevents bench collapse hazard for 100T dumpers.',
        status: 'Pending'
      },
      {
        priority: 2,
        title: 'Schedule inspection',
        description: 'Engage Central Mine Planning & Design Institute (CMPDI) geologists for bench LiDAR audit.',
        assignee: 'NCL Geotechnical Team',
        timeline: 'Within 4 days',
        impact: 'Restores slope safety certification.',
        status: 'Pending'
      },
      {
        priority: 3,
        title: 'Upload missing compliance evidence',
        description: 'File daily radar displacement data sheets and certified slope stability records.',
        assignee: 'Compliance Desk NCL',
        timeline: 'Within 6 days',
        impact: 'Re-aligns compliance score from 77% to 88%.',
        status: 'Pending'
      }
    ]
  },
  'MINE-002': {
    mineId: 'MINE-002',
    mineName: 'Korba Coal Mine',
    riskScore: 61,
    riskLevel: 'MEDIUM',
    lastEvaluated: '04 Oct 2026, 18:20 IST',
    riskFactors: [
      {
        title: '1 unresolved safety violation',
        metric: '1 Open Item',
        score: 58,
        severity: 'Medium',
        description: 'Haul road dust suppression mist spray nozzle choking in southern sector.'
      },
      {
        title: 'Periodic inspection scheduled',
        metric: 'Upcoming in 4 Days',
        score: 45,
        severity: 'Low',
        description: 'Routine quarterly environmental sampling scheduled for CPCB review.'
      },
      {
        title: 'Contractual worker roster updates',
        metric: '98% Completed',
        score: 30,
        severity: 'Low',
        description: 'Minor pending paperwork for 12 newly inducted heavy machine operators.'
      }
    ],
    aiRecommendation: 'Clear water mist spray pipelines along haul routes and conclude contractor safety inductions.',
    actionPlan: [
      {
        priority: 1,
        title: 'Resolve critical safety violations',
        description: 'Flush and descale clogged sprinkler nozzles on haul road Sector 2.',
        assignee: 'Civil Maintenance Division (SECL)',
        timeline: 'Within 3 days',
        impact: 'Eliminates dust suppression non-compliance.',
        status: 'Pending'
      },
      {
        priority: 2,
        title: 'Schedule inspection',
        description: 'Routine ambient air sensor check with state pollution control representatives.',
        assignee: 'Environmental Cell SECL',
        timeline: 'Within 10 days',
        impact: 'Maintains compliant environmental audit rating.',
        status: 'Pending'
      },
      {
        priority: 3,
        title: 'Upload missing compliance evidence',
        description: 'Submit updated contractor medical fitness certificates to the portal.',
        assignee: 'HR & Safety Office',
        timeline: 'Within 1 week',
        impact: 'Reaches 100% labour compliance.',
        status: 'Pending'
      }
    ]
  },
  'MINE-003': {
    mineId: 'MINE-003',
    mineName: 'Talcher Mine',
    riskScore: 39,
    riskLevel: 'LOW',
    lastEvaluated: '05 Oct 2026, 06:00 IST',
    riskFactors: [
      {
        title: 'Pending worker refresher training',
        metric: 'Batch 15 (40 workers)',
        score: 38,
        severity: 'Low',
        description: 'Batch 15 vocational refresher scheduled for 09 Oct 2026.'
      },
      {
        title: 'Blasting vibration logs nominal',
        metric: 'PPV 4.2 mm/s (Safe)',
        score: 18,
        severity: 'Low',
        description: 'Ground vibration readings safely within DGMS standard of 10 mm/s.'
      }
    ],
    aiRecommendation: 'Maintain standard operating procedures; conclude scheduled vocational refresher Batch 15.',
    actionPlan: [
      {
        priority: 1,
        title: 'Complete worker refresher training',
        description: 'Conclude remaining 40 miners vocational training batch at MCL Training Center.',
        assignee: 'MCL Training Director',
        timeline: 'By 12 Oct 2026',
        impact: 'Brings labour compliance to 100%.',
        status: 'Pending'
      },
      {
        priority: 2,
        title: 'Schedule inspection',
        description: 'Routine six-monthly opencast pit perimeter check.',
        assignee: 'Area Safety Inspector',
        timeline: 'By end of October',
        impact: 'Proactive compliance upkeep.',
        status: 'Pending'
      },
      {
        priority: 3,
        title: 'Upload missing compliance evidence',
        description: 'Archive Batch 15 certification cards to CoalGuard database.',
        assignee: 'Safety Clerk',
        timeline: 'Within 10 days',
        impact: 'Preserves low-risk profile.',
        status: 'Pending'
      }
    ]
  },
  'MINE-005': {
    mineId: 'MINE-005',
    mineName: 'Raniganj Mine',
    riskScore: 28,
    riskLevel: 'LOW',
    lastEvaluated: '05 Oct 2026, 05:45 IST',
    riskFactors: [
      {
        title: 'All statutory DGMS inspections up-to-date',
        metric: '100% Audit Complete',
        score: 15,
        severity: 'Low',
        description: 'All 24 HEMM vehicles certified; underground conveyor interlocks tested.'
      },
      {
        title: 'Effluent treatment operating nominally',
        metric: 'pH 7.2 (Optimal)',
        score: 12,
        severity: 'Low',
        description: 'Water discharge chemistry meets CPCB Schedule VI specifications.'
      }
    ],
    aiRecommendation: 'Model compliance benchmark. Continue daily shift inspections and telemetric water logging.',
    actionPlan: [
      {
        priority: 1,
        title: 'Maintain periodic routine servicing',
        description: 'Continue scheduled 500-hour preventative maintenance on continuous miner units.',
        assignee: 'ECL Mechanical Workshop',
        timeline: 'Ongoing',
        impact: 'Sustains optimal safety benchmark.',
        status: 'Completed'
      },
      {
        priority: 2,
        title: 'Schedule inspection',
        description: 'Standard quarterly DGMS ventilation district review.',
        assignee: 'DGMS Sitarampur Region',
        timeline: 'Next month',
        impact: 'Routine statutory validation.',
        status: 'Pending'
      },
      {
        priority: 3,
        title: 'Upload missing compliance evidence',
        description: 'All current logs submitted and verified.',
        assignee: 'Compliance Clerk',
        timeline: 'Completed',
        impact: 'Audit record pristine.',
        status: 'Completed'
      }
    ]
  }
};

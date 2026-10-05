import { ComplianceRecord, InspectionRecord } from '../types';

export function downloadCSV(records: ComplianceRecord[], filename = 'CoalGuard_Compliance_Report.csv') {
  const headers = ['Requirement ID', 'Requirement Name', 'Mine Name', 'Category', 'Due Date', 'Status', 'Statutory Ref', 'Assigned Officer'];
  const rows = records.map(r => [
    `"${r.id}"`,
    `"${r.requirement.replace(/"/g, '""')}"`,
    `"${r.mineName}"`,
    `"${r.category}"`,
    `"${r.dueDate}"`,
    `"${r.status}"`,
    `"${r.statutoryRef.replace(/"/g, '""')}"`,
    `"${r.assignedOfficer.replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadInspectionCSV(inspections: InspectionRecord[], filename = 'CoalGuard_Inspection_Report.csv') {
  const headers = ['Inspection ID', 'Mine Name', 'Type', 'Date', 'Status', 'Risk Level', 'Inspector', 'Regulation'];
  const rows = inspections.map(i => [
    `"${i.id}"`,
    `"${i.mineName}"`,
    `"${i.type}"`,
    `"${i.date}"`,
    `"${i.status}"`,
    `"${i.riskLevel}"`,
    `"${i.inspectorName}"`,
    `"${(i.statutoryRegulation || 'DGMS Regulations').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function triggerPrintReport(title: string, summary: Record<string, string | number>, detailsHtml: string) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    // Fallback if popup blocked
    window.print();
    return;
  }

  const summaryItems = Object.entries(summary)
    .map(([key, value]) => `<div style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;"><div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 600;">${key}</div><div style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 4px;">${value}</div></div>`)
    .join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} - CoalGuard AI</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 30px; color: #1e293b; }
          .header { border-bottom: 2px solid #0f2a4a; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
          .gov-title { font-size: 13px; font-weight: 600; color: #0f2a4a; text-transform: uppercase; letter-spacing: 0.5px; }
          .sub-title { font-size: 11px; color: #64748b; margin-top: 2px; }
          .report-title { font-size: 24px; font-weight: 800; color: #0f172a; margin-top: 10px; }
          .meta { font-size: 12px; color: #64748b; text-align: right; }
          .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
          th { background: #0f2a4a; color: white; text-align: left; padding: 10px; font-weight: 600; }
          td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
          tr:nth-child(even) { background: #f8fafc; }
          .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
          .badge-high, .badge-critical { background: #fee2e2; color: #991b1b; }
          .badge-medium, .badge-warning { background: #fef3c7; color: #92400e; }
          .badge-low, .badge-compliant { background: #dcfce7; color: #166534; }
          .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #cbd5e1; font-size: 11px; color: #64748b; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="gov-title">Government of India · Ministry of Coal · Coal India Limited</div>
            <div class="sub-title">Directorate General of Mines Safety (DGMS) Statutory Oversight</div>
            <div class="report-title">${title}</div>
          </div>
          <div class="meta">
            <div>Generated: ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} IST</div>
            <div>Ref: CIL/DGMS/AUDIT/2026-Q3</div>
            <div>System: CoalGuard AI Heuristic Engine</div>
          </div>
        </div>

        <div class="summary-grid">
          ${summaryItems}
        </div>

        ${detailsHtml}

        <div class="footer">
          <div>CoalGuard AI · Smart Governance & Compliance Monitoring System for Coal Mines (SIH 2026)</div>
          <div>Confidential Statutory Record · Authorized Personnel Only</div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

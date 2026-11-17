export interface ProjectMetadata {
  projectName: string;
  facilityLocation: string;
  inspectorName: string;
  date: string;
  notes: string;
}

export interface ExportSessionItem {
  id: string;
  timestamp: string;
  type: 'calculation' | 'ai_audit' | 'equipment_spec';
  title: string;
  moduleName: string;
  safetyStatus: 'safe' | 'warning' | 'critical';
  details: Record<string, any>;
  summary: string;
}

export interface CompiledReportData {
  metadata: ProjectMetadata;
  items: ExportSessionItem[];
  generatedAt: string;
}

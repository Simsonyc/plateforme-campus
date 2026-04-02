export interface AuditLogEntry {
  userId?: string;
  campusId?: string;
  action: string;
  entityType: string;
  entityId: string;
  payload?: Record<string, unknown>;
  ipAddress?: string;
}

export interface AuditLogPort {
  log(entry: AuditLogEntry): Promise<void>;
}
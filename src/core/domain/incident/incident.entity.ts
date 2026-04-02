import { IncidentStatus, IncidentSeverity } from '../shared/enums';
import { ValidationError } from '../shared/errors';

export interface IncidentProps {
  id: string;
  campusId: string;
  resourceId?: string;
  bookingId?: string;
  loanId?: string;
  associationId?: string;
  clubId?: string;
  eventId?: string;
  reportedBy: string;
  assignedTo?: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  occurredAt?: Date;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Incident {
  private constructor(private readonly props: IncidentProps) {}

  static create(props: IncidentProps): Incident {
    if (!props.title || props.title.trim().length === 0) {
      throw new ValidationError('Incident title is required');
    }
    if (!props.description || props.description.trim().length === 0) {
      throw new ValidationError('Incident description is required');
    }
    if (!props.reportedBy) {
      throw new ValidationError('Incident must have a reporter');
    }
    if (!props.campusId) {
      throw new ValidationError('Incident must belong to a campus');
    }
    return new Incident(props);
  }

  get id(): string { return this.props.id; }
  get campusId(): string { return this.props.campusId; }
  get resourceId(): string | undefined { return this.props.resourceId; }
  get bookingId(): string | undefined { return this.props.bookingId; }
  get loanId(): string | undefined { return this.props.loanId; }
  get associationId(): string | undefined { return this.props.associationId; }
  get clubId(): string | undefined { return this.props.clubId; }
  get eventId(): string | undefined { return this.props.eventId; }
  get reportedBy(): string { return this.props.reportedBy; }
  get assignedTo(): string | undefined { return this.props.assignedTo; }
  get title(): string { return this.props.title; }
  get description(): string { return this.props.description; }
  get severity(): IncidentSeverity { return this.props.severity; }
  get status(): IncidentStatus { return this.props.status; }
  get occurredAt(): Date | undefined { return this.props.occurredAt; }
  get resolvedAt(): Date | undefined { return this.props.resolvedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  isCritical(): boolean {
    return this.props.severity === IncidentSeverity.CRITICAL;
  }

  isOpen(): boolean {
    return this.props.status === IncidentStatus.OPEN;
  }

  isResolved(): boolean {
    return this.props.status === IncidentStatus.RESOLVED;
  }

  belongsToCampus(campusId: string): boolean {
    return this.props.campusId === campusId;
  }
}
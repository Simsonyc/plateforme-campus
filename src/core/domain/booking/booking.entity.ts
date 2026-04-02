import { BookingStatus } from '../shared/enums';
import { ValidationError, BusinessRuleViolationError } from '../shared/errors';

export interface BookingProps {
  id: string;
  campusId: string;
  resourceId: string;
  userId: string;
  clubId?: string;
  associationId?: string;
  eventId?: string;
  title?: string;
  purpose?: string;
  startAt: Date;
  endAt: Date;
  status: BookingStatus;
  submittedAt?: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Booking {
  private constructor(private readonly props: BookingProps) {}

  static create(props: BookingProps): Booking {
    if (!props.resourceId) {
      throw new ValidationError('Booking must have a resource');
    }
    if (!props.userId) {
      throw new ValidationError('Booking must have a user');
    }
    if (!props.campusId) {
      throw new ValidationError('Booking must belong to a campus');
    }
    // Invariant métier critique — BLOCK_05 section 14
    if (props.endAt <= props.startAt) {
      throw new BusinessRuleViolationError(
        'Booking end date must be after start date'
      );
    }
    return new Booking(props);
  }

  get id(): string { return this.props.id; }
  get campusId(): string { return this.props.campusId; }
  get resourceId(): string { return this.props.resourceId; }
  get userId(): string { return this.props.userId; }
  get clubId(): string | undefined { return this.props.clubId; }
  get associationId(): string | undefined { return this.props.associationId; }
  get eventId(): string | undefined { return this.props.eventId; }
  get title(): string | undefined { return this.props.title; }
  get purpose(): string | undefined { return this.props.purpose; }
  get startAt(): Date { return this.props.startAt; }
  get endAt(): Date { return this.props.endAt; }
  get status(): BookingStatus { return this.props.status; }
  get submittedAt(): Date | undefined { return this.props.submittedAt; }
  get reviewedBy(): string | undefined { return this.props.reviewedBy; }
  get reviewedAt(): Date | undefined { return this.props.reviewedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  isApproved(): boolean {
    return this.props.status === BookingStatus.APPROVED;
  }

  belongsToCampus(campusId: string): boolean {
    return this.props.campusId === campusId;
  }

  overlapsWith(other: Booking): boolean {
    return this.props.startAt < other.endAt && this.props.endAt > other.startAt;
  }
}
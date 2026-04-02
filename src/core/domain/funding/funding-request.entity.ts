import { FundingRequestStatus } from '../shared/enums';
import { ValidationError, BusinessRuleViolationError } from '../shared/errors';

export interface FundingRequestProps {
  id: string;
  campusId: string;
  associationId?: string;
  clubId?: string;
  eventId?: string;
  title: string;
  description?: string;
  category: string;
  amountRequested: string;
  amountApproved?: string;
  status: FundingRequestStatus;
  submittedBy: string;
  reviewedBy?: string;
  reviewedAt?: Date;
  decisionComment?: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class FundingRequest {
  private constructor(private readonly props: FundingRequestProps) {}

  static create(props: FundingRequestProps): FundingRequest {
    if (!props.title || props.title.trim().length === 0) {
      throw new ValidationError('Funding request title is required');
    }
    if (!props.campusId) {
      throw new ValidationError('Funding request must belong to a campus');
    }
    // Invariant métier critique — BLOCK_05 section 12
    if (!props.associationId && !props.clubId) {
      throw new BusinessRuleViolationError(
        'Funding request must have a unique structural target: association or club'
      );
    }
    if (props.associationId && props.clubId) {
      throw new BusinessRuleViolationError(
        'Funding request cannot target both an association and a club'
      );
    }
    if (parseFloat(props.amountRequested) <= 0) {
      throw new ValidationError('Amount requested must be greater than 0');
    }
    return new FundingRequest(props);
  }

  get id(): string { return this.props.id; }
  get campusId(): string { return this.props.campusId; }
  get associationId(): string | undefined { return this.props.associationId; }
  get clubId(): string | undefined { return this.props.clubId; }
  get eventId(): string | undefined { return this.props.eventId; }
  get title(): string { return this.props.title; }
  get description(): string | undefined { return this.props.description; }
  get category(): string { return this.props.category; }
  get amountRequested(): string { return this.props.amountRequested; }
  get amountApproved(): string | undefined { return this.props.amountApproved; }
  get status(): FundingRequestStatus { return this.props.status; }
  get submittedBy(): string { return this.props.submittedBy; }
  get reviewedBy(): string | undefined { return this.props.reviewedBy; }
  get reviewedAt(): Date | undefined { return this.props.reviewedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  isDraft(): boolean {
    return this.props.status === FundingRequestStatus.DRAFT;
  }

  isApproved(): boolean {
    return this.props.status === FundingRequestStatus.APPROVED;
  }

  targetsAssociation(): boolean {
    return !!this.props.associationId;
  }

  targetsClub(): boolean {
    return !!this.props.clubId;
  }

  belongsToCampus(campusId: string): boolean {
    return this.props.campusId === campusId;
  }
}
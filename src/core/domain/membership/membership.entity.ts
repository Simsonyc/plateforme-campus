import { MembershipStatus } from '../shared/enums';
import { ValidationError, BusinessRuleViolationError } from '../shared/errors';

export interface MembershipProps {
  id: string;
  userId: string;
  campusId: string;
  associationId?: string;
  clubId?: string;
  membershipRole: string;
  status: MembershipStatus;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Membership {
  private constructor(private readonly props: MembershipProps) {}

  static create(props: MembershipProps): Membership {
    // Invariant métier critique — BLOCK_05 section 6
    if (!props.associationId && !props.clubId) {
      throw new BusinessRuleViolationError(
        'A membership must target either an association or a club'
      );
    }
    if (props.associationId && props.clubId) {
      throw new BusinessRuleViolationError(
        'A membership cannot target both an association and a club'
      );
    }
    if (!props.userId) {
      throw new ValidationError('Membership must have a user');
    }
    if (!props.campusId) {
      throw new ValidationError('Membership must have a campus');
    }

    return new Membership(props);
  }

  get id(): string { return this.props.id; }
  get userId(): string { return this.props.userId; }
  get campusId(): string { return this.props.campusId; }
  get associationId(): string | undefined { return this.props.associationId; }
  get clubId(): string | undefined { return this.props.clubId; }
  get membershipRole(): string { return this.props.membershipRole; }
  get status(): MembershipStatus { return this.props.status; }
  get startDate(): Date | undefined { return this.props.startDate; }
  get endDate(): Date | undefined { return this.props.endDate; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  isActive(): boolean {
    return this.props.status === MembershipStatus.ACTIVE;
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
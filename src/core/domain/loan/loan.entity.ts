import { LoanStatus } from '../shared/enums';
import { ValidationError, BusinessRuleViolationError } from '../shared/errors';

export interface LoanProps {
  id: string;
  campusId: string;
  resourceId: string;
  userId: string;
  clubId?: string;
  associationId?: string;
  startDate: Date;
  dueDate: Date;
  returnDate?: Date;
  approvedBy?: string;
  status: LoanStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Loan {
  private constructor(private readonly props: LoanProps) {}

  static create(props: LoanProps): Loan {
    if (!props.resourceId) {
      throw new ValidationError('Loan must have a resource');
    }
    if (!props.userId) {
      throw new ValidationError('Loan must have a user');
    }
    if (!props.campusId) {
      throw new ValidationError('Loan must belong to a campus');
    }
    // Invariant métier critique — BLOCK_05 section 15
    if (props.dueDate <= props.startDate) {
      throw new BusinessRuleViolationError(
        'Loan due date must be after start date'
      );
    }
    return new Loan(props);
  }

  get id(): string { return this.props.id; }
  get campusId(): string { return this.props.campusId; }
  get resourceId(): string { return this.props.resourceId; }
  get userId(): string { return this.props.userId; }
  get clubId(): string | undefined { return this.props.clubId; }
  get associationId(): string | undefined { return this.props.associationId; }
  get startDate(): Date { return this.props.startDate; }
  get dueDate(): Date { return this.props.dueDate; }
  get returnDate(): Date | undefined { return this.props.returnDate; }
  get approvedBy(): string | undefined { return this.props.approvedBy; }
  get status(): LoanStatus { return this.props.status; }
  get notes(): string | undefined { return this.props.notes; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  isLate(): boolean {
    return !this.props.returnDate && new Date() > this.props.dueDate;
  }

  isReturned(): boolean {
    return this.props.status === LoanStatus.RETURNED;
  }

  belongsToCampus(campusId: string): boolean {
    return this.props.campusId === campusId;
  }
}
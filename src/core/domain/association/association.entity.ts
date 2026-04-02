import { AssociationStatus } from '../shared/enums';
import { ValidationError } from '../shared/errors';

export interface AssociationProps {
  id: string;
  campusId: string;
  code?: string;
  slug: string;
  name: string;
  description?: string;
  logoUrl?: string;
  emailContact?: string;
  phoneContact?: string;
  visibility: string;
  status: AssociationStatus;
  createdBy?: string;
  approvedBy?: string;
  approvedAt?: Date;
  archivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Association {
  private constructor(private readonly props: AssociationProps) {}

  static create(props: AssociationProps): Association {
    if (!props.name || props.name.trim().length === 0) {
      throw new ValidationError('Association name is required');
    }
    if (!props.slug || props.slug.trim().length === 0) {
      throw new ValidationError('Association slug is required');
    }
    if (!props.campusId) {
      throw new ValidationError('Association must belong to a campus');
    }
    return new Association(props);
  }

  get id(): string { return this.props.id; }
  get campusId(): string { return this.props.campusId; }
  get code(): string | undefined { return this.props.code; }
  get slug(): string { return this.props.slug; }
  get name(): string { return this.props.name; }
  get description(): string | undefined { return this.props.description; }
  get logoUrl(): string | undefined { return this.props.logoUrl; }
  get emailContact(): string | undefined { return this.props.emailContact; }
  get phoneContact(): string | undefined { return this.props.phoneContact; }
  get visibility(): string { return this.props.visibility; }
  get status(): AssociationStatus { return this.props.status; }
  get createdBy(): string | undefined { return this.props.createdBy; }
  get approvedBy(): string | undefined { return this.props.approvedBy; }
  get approvedAt(): Date | undefined { return this.props.approvedAt; }
  get archivedAt(): Date | undefined { return this.props.archivedAt; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  isActive(): boolean {
    return this.props.status === AssociationStatus.ACTIVE;
  }

  isArchived(): boolean {
    return this.props.status === AssociationStatus.ARCHIVED;
  }

  belongsToCampus(campusId: string): boolean {
    return this.props.campusId === campusId;
  }
}
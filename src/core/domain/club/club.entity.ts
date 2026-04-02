import { AttachmentMode, ClubStatus } from '../shared/enums';
import { ValidationError, BusinessRuleViolationError } from '../shared/errors';

export interface ClubProps {
  id: string;
  campusId: string;
  associationId?: string;
  code?: string;
  slug: string;
  name: string;
  description?: string;
  logoUrl?: string;
  clubType?: string;
  attachmentMode: AttachmentMode;
  visibility: string;
  status: ClubStatus;
  createdBy?: string;
  approvedBy?: string;
  approvedAt?: Date;
  archivedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Club {
  private constructor(private readonly props: ClubProps) {}

  static create(props: ClubProps): Club {
    if (!props.name || props.name.trim().length === 0) {
      throw new ValidationError('Club name is required');
    }
    if (!props.slug || props.slug.trim().length === 0) {
      throw new ValidationError('Club slug is required');
    }

    // Invariant métier critique — BLOCK_05 section 3
    if (props.attachmentMode === AttachmentMode.ATTACHED && !props.associationId) {
      throw new BusinessRuleViolationError(
        'A club in attached mode must reference a parent association'
      );
    }
    if (
      (props.attachmentMode === AttachmentMode.INDEPENDENT ||
        props.attachmentMode === AttachmentMode.STRUCTURING) &&
      props.associationId
    ) {
      throw new BusinessRuleViolationError(
        'A club in independent or structuring mode must not reference an association'
      );
    }

    return new Club(props);
  }

  get id(): string { return this.props.id; }
  get campusId(): string { return this.props.campusId; }
  get associationId(): string | undefined { return this.props.associationId; }
  get name(): string { return this.props.name; }
  get slug(): string { return this.props.slug; }
  get code(): string | undefined { return this.props.code; }
  get description(): string | undefined { return this.props.description; }
  get attachmentMode(): AttachmentMode { return this.props.attachmentMode; }
  get status(): ClubStatus { return this.props.status; }
  get visibility(): string { return this.props.visibility; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  isActive(): boolean {
    return this.props.status === ClubStatus.ACTIVE;
  }

  isAttached(): boolean {
    return this.props.attachmentMode === AttachmentMode.ATTACHED;
  }

  belongsToCampus(campusId: string): boolean {
    return this.props.campusId === campusId;
  }
}
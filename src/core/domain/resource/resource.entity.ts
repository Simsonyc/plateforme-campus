import { ValidationError } from '../shared/errors';

export interface ResourceProps {
  id: string;
  campusId: string;
  code?: string;
  name: string;
  resourceType: string;
  description?: string;
  quantity?: number;
  isActive: boolean;
  isShared: boolean;
  ownerAssociationId?: string;
  ownerClubId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Resource {
  private constructor(private readonly props: ResourceProps) {}

  static create(props: ResourceProps): Resource {
    if (!props.name || props.name.trim().length === 0) {
      throw new ValidationError('Resource name is required');
    }
    if (!props.campusId) {
      throw new ValidationError('Resource must belong to a campus');
    }
    if (!props.resourceType) {
      throw new ValidationError('Resource type is required');
    }
    if (props.quantity !== undefined && props.quantity <= 0) {
      throw new ValidationError('Resource quantity must be greater than 0');
    }
    return new Resource(props);
  }

  get id(): string { return this.props.id; }
  get campusId(): string { return this.props.campusId; }
  get code(): string | undefined { return this.props.code; }
  get name(): string { return this.props.name; }
  get resourceType(): string { return this.props.resourceType; }
  get description(): string | undefined { return this.props.description; }
  get quantity(): number | undefined { return this.props.quantity; }
  get isActive(): boolean { return this.props.isActive; }
  get isShared(): boolean { return this.props.isShared; }
  get ownerAssociationId(): string | undefined { return this.props.ownerAssociationId; }
  get ownerClubId(): string | undefined { return this.props.ownerClubId; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  isAvailable(): boolean {
    return this.props.isActive;
  }

  belongsToCampus(campusId: string): boolean {
    return this.props.campusId === campusId;
  }

  isOwnedBy(structureId: string): boolean {
    return this.props.ownerAssociationId === structureId ||
           this.props.ownerClubId === structureId;
  }
}
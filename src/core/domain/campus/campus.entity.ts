import { CampusStatus } from '../shared/enums';
import { ValidationError } from '../shared/errors';

export interface CampusProps {
  id: string;
  name: string;
  code: string;
  slug: string;
  city: string;
  country: string;
  emailContact?: string;
  phoneContact?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Campus {
  private constructor(private readonly props: CampusProps) {}

  static create(props: CampusProps): Campus {
    if (!props.name || props.name.trim().length === 0) {
      throw new ValidationError('Campus name is required');
    }
    if (!props.code || props.code.trim().length === 0) {
      throw new ValidationError('Campus code is required');
    }
    if (!props.slug || props.slug.trim().length === 0) {
      throw new ValidationError('Campus slug is required');
    }
    return new Campus(props);
  }

  get id(): string { return this.props.id; }
  get name(): string { return this.props.name; }
  get code(): string { return this.props.code; }
  get slug(): string { return this.props.slug; }
  get city(): string { return this.props.city; }
  get country(): string { return this.props.country; }
  get emailContact(): string | undefined { return this.props.emailContact; }
  get phoneContact(): string | undefined { return this.props.phoneContact; }
  get isActive(): boolean { return this.props.isActive; }
  get createdAt(): Date { return this.props.createdAt; }
  get updatedAt(): Date { return this.props.updatedAt; }

  get status(): CampusStatus {
    return this.props.isActive ? CampusStatus.ACTIVE : CampusStatus.INACTIVE;
  }

  isOperational(): boolean {
    return this.props.isActive;
  }
}
export enum CampusStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum AssociationStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  REJECTED = 'rejected',
  ARCHIVED = 'archived',
}

export enum ClubStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  REJECTED = 'rejected',
  ARCHIVED = 'archived',
}

export enum AttachmentMode {
  ATTACHED = 'attached',
  INDEPENDENT = 'independent',
  STRUCTURING = 'structuring',
}

export enum MembershipStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  REJECTED = 'rejected',
  LEFT = 'left',
}

export enum EventStatus {
  DRAFT = 'draft',
  PENDING_REVIEW = 'pending_review',
  PUBLISHED = 'published',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
}

export enum EventRegistrationStatus {
  REGISTERED = 'registered',
  WAITLISTED = 'waitlisted',
  CANCELLED = 'cancelled',
  CHECKED_IN = 'checked_in',
  NO_SHOW = 'no_show',
}

export enum FundingRequestStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  NEED_MORE_INFO = 'need_more_info',
  APPROVED = 'approved',
  PARTIALLY_APPROVED = 'partially_approved',
  REJECTED = 'rejected',
  PAID = 'paid',
  CLOSED = 'closed',
}

export enum BookingStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum LoanStatus {
  DRAFT = 'draft',
  APPROVED = 'approved',
  BORROWED = 'borrowed',
  RETURNED = 'returned',
  LATE = 'late',
  LOST = 'lost',
  DAMAGED = 'damaged',
  CANCELLED = 'cancelled',
}

export enum IncidentStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

export enum IncidentSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum RoleCode {
  SUPER_ADMIN = 'super_admin',
  CAMPUS_ADMIN = 'campus_admin',
  CAMPUS_LIFE_MANAGER = 'campus_life_manager',
  ASSOCIATION_ADMIN = 'association_admin',
  CLUB_MANAGER = 'club_manager',
  MEMBER = 'member',
}
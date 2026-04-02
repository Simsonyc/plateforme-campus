import { Membership } from '../../domain/membership/membership.entity';

export interface MembershipRepositoryPort {
  findById(id: string): Promise<Membership | null>;
  findActiveByUserAndClub(userId: string, clubId: string): Promise<Membership | null>;
  findActiveByUserAndAssociation(userId: string, associationId: string): Promise<Membership | null>;
  findAllByUserId(userId: string): Promise<Membership[]>;
  findAllByClubId(clubId: string): Promise<Membership[]>;
  findAllByAssociationId(associationId: string): Promise<Membership[]>;
  save(membership: Membership): Promise<void>;
  hasActiveMembership(userId: string, clubId?: string, associationId?: string): Promise<boolean>;
}
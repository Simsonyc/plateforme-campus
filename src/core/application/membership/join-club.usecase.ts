import { Membership, MembershipProps } from '../../domain/membership/membership.entity';
import { MembershipStatus } from '../../domain/shared/enums';
import { MembershipRepositoryPort } from './membership.repository.port';
import { ClubRepositoryPort } from '../club/club.repository.port';
import { AuditLogPort } from '../shared/audit-log.port';
import { NotFoundError, ConflictError, BusinessRuleViolationError } from '../../domain/shared/errors';
import { randomUUID } from 'crypto';

export interface JoinClubCommand {
  userId: string;
  campusId: string;
  clubId: string;
}

export class JoinClubUseCase {
  constructor(
    private readonly membershipRepository: MembershipRepositoryPort,
    private readonly clubRepository: ClubRepositoryPort,
    private readonly auditLog: AuditLogPort,
  ) {}

  async execute(command: JoinClubCommand): Promise<Membership> {
    // Vérifier que le club existe
    const club = await this.clubRepository.findById(command.clubId);
    if (!club) {
      throw new NotFoundError('Club', command.clubId);
    }

    // Vérifier que le club appartient au bon campus
    if (!club.belongsToCampus(command.campusId)) {
      throw new BusinessRuleViolationError(
        'Club does not belong to the specified campus'
      );
    }

    // Vérifier qu'il n'y a pas déjà une adhésion active
    const existing = await this.membershipRepository.findActiveByUserAndClub(
      command.userId,
      command.clubId,
    );
    if (existing) {
      throw new ConflictError('User already has an active membership in this club');
    }

    // Créer l'adhésion
    const now = new Date();
    const props: MembershipProps = {
      id: randomUUID(),
      userId: command.userId,
      campusId: command.campusId,
      clubId: command.clubId,
      membershipRole: 'member',
      status: MembershipStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    };

    const membership = Membership.create(props);

    // Persister
    await this.membershipRepository.save(membership);

    // Auditer
    await this.auditLog.log({
      userId: command.userId,
      campusId: command.campusId,
      action: 'membership.created',
      entityType: 'membership',
      entityId: membership.id,
      payload: { clubId: command.clubId },
    });

    return membership;
  }
}
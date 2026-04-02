import { Club, ClubProps } from '../../domain/club/club.entity';
import { AttachmentMode, ClubStatus } from '../../domain/shared/enums';
import { ClubRepositoryPort } from './club.repository.port';
import { CampusRepositoryPort } from '../campus/campus.repository.port';
import { AuditLogPort } from '../shared/audit-log.port';
import { NotFoundError, ConflictError } from '../../domain/shared/errors';
import { randomUUID } from 'crypto';

export interface CreateClubCommand {
  campusId: string;
  name: string;
  slug: string;
  description?: string;
  attachmentMode: AttachmentMode;
  associationId?: string;
  clubType?: string;
  createdBy: string;
}

export class CreateClubUseCase {
  constructor(
    private readonly clubRepository: ClubRepositoryPort,
    private readonly campusRepository: CampusRepositoryPort,
    private readonly auditLog: AuditLogPort,
  ) {}

  async execute(command: CreateClubCommand): Promise<Club> {
    // Vérifier que le campus existe
    const campus = await this.campusRepository.findById(command.campusId);
    if (!campus) {
      throw new NotFoundError('Campus', command.campusId);
    }

    // Vérifier que le slug n'est pas déjà pris sur ce campus
    const existing = await this.clubRepository.findBySlug(command.slug, command.campusId);
    if (existing) {
      throw new ConflictError(`A club with slug "${command.slug}" already exists on this campus`);
    }

    // Créer l'entité — les invariants sont vérifiés dans Club.create()
    const now = new Date();
    const props: ClubProps = {
      id: randomUUID(),
      campusId: command.campusId,
      associationId: command.associationId,
      slug: command.slug,
      name: command.name,
      description: command.description,
      clubType: command.clubType,
      attachmentMode: command.attachmentMode,
      visibility: 'private',
      status: ClubStatus.DRAFT,
      createdBy: command.createdBy,
      createdAt: now,
      updatedAt: now,
    };

    const club = Club.create(props);

    // Persister
    await this.clubRepository.save(club);

    // Auditer
    await this.auditLog.log({
      userId: command.createdBy,
      campusId: command.campusId,
      action: 'club.created',
      entityType: 'club',
      entityId: club.id,
      payload: { name: club.name, attachmentMode: club.attachmentMode },
    });

    return club;
  }
}
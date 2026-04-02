import { Club } from '../../domain/club/club.entity';

export interface ClubRepositoryPort {
  findById(id: string): Promise<Club | null>;
  findBySlug(slug: string, campusId: string): Promise<Club | null>;
  findByCampusId(campusId: string): Promise<Club[]>;
  findByAssociationId(associationId: string): Promise<Club[]>;
  save(club: Club): Promise<void>;
  exists(id: string): Promise<boolean>;
}
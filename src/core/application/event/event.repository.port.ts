import { Event } from '../../domain/event/event.entity';

export interface EventRepositoryPort {
  findById(id: string): Promise<Event | null>;
  findBySlug(slug: string, campusId: string): Promise<Event | null>;
  findByCampusId(campusId: string): Promise<Event[]>;
  findByClubId(clubId: string): Promise<Event[]>;
  findByAssociationId(associationId: string): Promise<Event[]>;
  findPublished(campusId: string): Promise<Event[]>;
  save(event: Event): Promise<void>;
  exists(id: string): Promise<boolean>;
}
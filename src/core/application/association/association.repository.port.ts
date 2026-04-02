import { Association } from '../../domain/association/association.entity';

export interface AssociationRepositoryPort {
  findById(id: string): Promise<Association | null>;
  findBySlug(slug: string, campusId: string): Promise<Association | null>;
  findByCampusId(campusId: string): Promise<Association[]>;
  findAllActive(campusId: string): Promise<Association[]>;
  save(association: Association): Promise<void>;
  exists(id: string): Promise<boolean>;
}
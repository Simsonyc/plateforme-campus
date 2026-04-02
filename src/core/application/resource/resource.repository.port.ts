import { Resource } from '../../domain/resource/resource.entity';

export interface ResourceRepositoryPort {
  findById(id: string): Promise<Resource | null>;
  findByCampusId(campusId: string): Promise<Resource[]>;
  findByCode(code: string, campusId: string): Promise<Resource | null>;
  findActive(campusId: string): Promise<Resource[]>;
  findShared(campusId: string): Promise<Resource[]>;
  save(resource: Resource): Promise<void>;
  exists(id: string): Promise<boolean>;
}
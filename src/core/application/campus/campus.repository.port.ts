import { Campus } from '../../domain/campus/campus.entity';

export interface CampusRepositoryPort {
  findById(id: string): Promise<Campus | null>;
  findByCode(code: string): Promise<Campus | null>;
  findBySlug(slug: string): Promise<Campus | null>;
  findAll(): Promise<Campus[]>;
  findAllActive(): Promise<Campus[]>;
  save(campus: Campus): Promise<void>;
}
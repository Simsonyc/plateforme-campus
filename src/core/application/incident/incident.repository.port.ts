import { Incident } from '../../domain/incident/incident.entity';

export interface IncidentRepositoryPort {
  findById(id: string): Promise<Incident | null>;
  findByCampusId(campusId: string): Promise<Incident[]>;
  findOpen(campusId: string): Promise<Incident[]>;
  findCritical(campusId: string): Promise<Incident[]>;
  findByResourceId(resourceId: string): Promise<Incident[]>;
  save(incident: Incident): Promise<void>;
  exists(id: string): Promise<boolean>;
}
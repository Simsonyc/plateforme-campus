import { FundingRequest } from '../../domain/funding/funding-request.entity';

export interface FundingRequestRepositoryPort {
  findById(id: string): Promise<FundingRequest | null>;
  findByCampusId(campusId: string): Promise<FundingRequest[]>;
  findByClubId(clubId: string): Promise<FundingRequest[]>;
  findByAssociationId(associationId: string): Promise<FundingRequest[]>;
  findPending(campusId: string): Promise<FundingRequest[]>;
  save(fundingRequest: FundingRequest): Promise<void>;
  exists(id: string): Promise<boolean>;
}
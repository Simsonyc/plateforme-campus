import { Booking } from '../../domain/booking/booking.entity';

export interface BookingRepositoryPort {
  findById(id: string): Promise<Booking | null>;
  findByCampusId(campusId: string): Promise<Booking[]>;
  findByResourceId(resourceId: string): Promise<Booking[]>;
  findByUserId(userId: string): Promise<Booking[]>;
  findApprovedByResourceAndPeriod(
    resourceId: string,
    startAt: Date,
    endAt: Date
  ): Promise<Booking[]>;
  save(booking: Booking): Promise<void>;
  exists(id: string): Promise<boolean>;
}
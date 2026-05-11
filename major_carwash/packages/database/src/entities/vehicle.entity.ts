// packages/database/src/entities/vehicle.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany } from '@mikro-orm/decorators/legacy';
import type { BookingEntity as Booking } from './booking.entity.js';
import type { UserEntity as User } from './user.entity.js';
import { Collection } from '@mikro-orm/core';

@Entity({ tableName: 'vehicles' })
export class VehicleEntity {
  @PrimaryKey({ type: 'number' })
  id: number;

  @Property({ type: 'string' })
  make: string;

  @Property({ type: 'string' })
  model: string;

  // FIX: Change "User" to "UserEntity"
  @ManyToOne(() => "UserEntity" as any)
  owner: User; 

  // FIX: Change "Booking" to "BookingEntity"
  @ManyToMany(() => 'BookingEntity' as any, (booking: Booking) => booking.vehicles)
  bookings = new Collection<Booking>(this);
}

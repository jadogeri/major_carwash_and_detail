// packages/database/src/entities/user.entity.ts
import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';

// 1. Keep 'import type' to avoid circular dependency issues
import type { BookingEntity as Booking } from './booking.entity.js';
import type { VehicleEntity as Vehicle } from './vehicle.entity.js';

@Entity({ tableName: 'users' }) 
export class UserEntity {
  @PrimaryKey({type: 'number'})
  id: number;

  @Property({ unique: true, type: 'string' })
  email: string;

  @Property({ nullable: true, type: 'string' })
  name?: string;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  // FIX: Change 'Vehicle' to 'VehicleEntity' to match the discovered class name
  @OneToMany(() => 'VehicleEntity' as any, (vehicle: Vehicle) => vehicle.owner)
  vehicles = new Collection<Vehicle>(this);

  // FIX: Change 'Booking' to 'BookingEntity'
  @OneToMany(() => 'BookingEntity' as any, (booking: Booking) => booking.user)
  bookings = new Collection<Booking>(this);
}

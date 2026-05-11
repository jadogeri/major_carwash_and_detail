// packages/database/src/entities/user.entity.ts
import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';

// 1. MUST use 'import type' to stop TypeScript from emitting metadata for these classes
import type { Booking } from './booking.entity.js';
import type { Vehicle } from './vehicle.entity.js';

@Entity({ tableName: 'users' }) 
export class User {
  @PrimaryKey({type: 'number'})
  id: number;

  @Property({ unique: true, type: 'string' })
  email: string;

  @Property({ nullable: true, type: 'string' })
  name?: string;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  // 2. Use () => 'Vehicle' as any 
  // This satisfies the decorator but prevents the 'Vehicle' class from being accessed at load time
  @OneToMany(() => 'Vehicle' as any, (vehicle: Vehicle) => vehicle.owner)
  vehicles = new Collection<Vehicle>(this);

  // 3. Use () => 'Booking' as any
  @OneToMany(() => 'Booking' as any, (booking: Booking) => booking.user)
  bookings = new Collection<Booking>(this);
}

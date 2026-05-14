// packages/database/src/entities/user.entity.ts
import {Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';

// Keep 'import type' to avoid circular dependency issues
import type { BookingEntity as Booking } from './booking.entity.js';
import type { VehicleEntity as Vehicle } from './vehicle.entity.js';
import { Collection } from '@mikro-orm/libsql';

@Entity({ tableName: 'users' }) 
export class UserEntity {
  // Better Auth requires string IDs (usually UUID or ulid)
  @PrimaryKey({ type: 'string' })
  id!: string;

  @Property({ unique: true, type: 'string' })
  email!: string;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'boolean', default: false })
  emailVerified!: boolean;

  @Property({ type: 'string', nullable: true })
  image?: string;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date' })
  updatedAt: Date = new Date();

  // Better Auth role management field
  @Property({ type: 'string', default: 'user' })
  role!: string;

  // Existing Relations
  @OneToMany(() => 'VehicleEntity' as any, (vehicle: Vehicle) => vehicle.owner)
  vehicles = new Collection<Vehicle>(this);

  @OneToMany(() => 'BookingEntity' as any, (booking: Booking) => booking.user)
  bookings = new Collection<Booking>(this);
}

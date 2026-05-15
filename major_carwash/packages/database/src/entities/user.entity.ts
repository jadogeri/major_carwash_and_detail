// packages/database/src/entities/user.entity.ts
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import type { BookingEntity as Booking } from './booking.entity.js';
import type { VehicleEntity as Vehicle } from './vehicle.entity.js';
import { Collection } from '@mikro-orm/libsql';

@Entity({ tableName: 'users' }) 
export class User {
  @PrimaryKey({ type: 'string' })
  id!: string;

  @Property({ type: 'string', nullable: true }) 
  name?: string; 

  @Property({ unique: true, type: 'string' })
  email!: string;

  @Property({ type: 'boolean', default: false, fieldName: 'email_verified' })
  emailVerified!: boolean;

  @Property({ type: 'string', nullable: true })
  image?: string;

  @Property({ type: 'date', fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ type: 'date', fieldName: 'updated_at' })
  updatedAt: Date = new Date();

  @Property({ type: 'string', default: 'user' })
  role!: string;

  @Property({ type: 'boolean', default: false, nullable: true })
  banned?: boolean;

  // ======================================================================
  // ✅ FIX: Missing properties required by the active Admin & 2FA Plugins
  // ======================================================================
  @Property({ type: 'string', nullable: true, fieldName: 'ban_reason' })
  banReason?: string;

  @Property({ type: 'boolean', default: false, fieldName: 'two_factor_enabled', nullable: true })
  twoFactorEnabled?: boolean;

  // Existing Relations
  @OneToMany(() => 'VehicleEntity' as any, (vehicle: Vehicle) => vehicle.owner)
  vehicles = new Collection<Vehicle>(this);

  @OneToMany(() => 'BookingEntity' as any, (booking: Booking) => booking.user)
  bookings = new Collection<Booking>(this);
}

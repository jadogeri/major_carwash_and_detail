// packages/database/src/entities/booking.entity.ts
import { Collection } from "@mikro-orm/core";
import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany } from "@mikro-orm/decorators/legacy";

// 1. MUST use 'import type' for all related entities
import type { UserEntity as User } from './user.entity.js';
import type { VehicleEntity as Vehicle } from './vehicle.entity.js';
import type { LocationEntity as Location } from './location.entity.js';
import type { ServiceEntity as Service } from './service.entity.js';
import type { ScheduleEntity as Schedule } from './schedule.entity.js';

@Entity({ tableName: 'bookings' })
export class BookingEntity {
  @PrimaryKey({type: 'number'})
  id: number;

  @Property({ type: 'date' })
  bookingDate: Date;

  // 2. Use () => 'ClassName' as any to satisfy legacy decorators 
  // and prevent metadata generation for the 'User' class
  @ManyToOne(() => 'User' as any)
  user: User;

  @ManyToOne(() => 'Location' as any)
  location: Location;

  @ManyToOne(() => 'Schedule' as any, { nullable: true })
  slot?: Schedule;

  @ManyToMany(() => 'Vehicle' as any, 'bookings', { owner: true })
  vehicles = new Collection<Vehicle>(this);

  @ManyToMany(() => 'Service' as any, 'bookings', { owner: true })
  services = new Collection<Service>(this);
}

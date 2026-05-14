// packages/database/src/entities/booking.entity.ts
import { Collection } from "@mikro-orm/core";
import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany } from "@mikro-orm/decorators/legacy";
import type { Ref } from '@mikro-orm/core'; // Import from core instead

// 1. Keep 'import type' to prevent circular dependencies
import type { UserEntity as User } from './user.entity.js';
import type { VehicleEntity as Vehicle } from './vehicle.entity.js';
import type { LocationEntity as Location } from './location.entity.js';
import type { ServiceEntity as Service } from './service.entity.js';
import type { ScheduleEntity as Schedule } from './schedule.entity.js';

@Entity({ tableName: 'bookings' })
export class BookingEntity {
  @PrimaryKey({ type: 'number' })
  id: number;

  @Property({ type: 'date' })
  bookingDate: Date;

  // FIX: Change 'User' to 'UserEntity'
  @ManyToOne(() => 'UserEntity' as any, { fieldName: 'userId', deleteRule: 'cascade' })
  user!: User | Ref<User> | any; 

  // FIX: Change 'Location' to 'LocationEntity'
  @ManyToOne(() => 'LocationEntity' as any)
  location: Location;

  // FIX: Change 'Schedule' to 'ScheduleEntity'
  @ManyToOne(() => 'ScheduleEntity' as any, { nullable: true })
  slot?: Schedule;

  // FIX: Change 'Vehicle' to 'VehicleEntity'
  @ManyToMany(() => 'VehicleEntity' as any, 'bookings', { owner: true })
  vehicles = new Collection<Vehicle>(this);

  // FIX: Change 'Service' to 'ServiceEntity'
  @ManyToMany(() => 'ServiceEntity' as any, 'bookings', { owner: true })
  services = new Collection<Service>(this);
}

// packages/database/src/entities/location.entity.ts
import { Collection } from "@mikro-orm/core";
import { Entity, PrimaryKey, Property, OneToMany } from "@mikro-orm/decorators/legacy";

// 1. Keep 'import type' to prevent circular dependency issues
import type { BookingEntity as Booking } from "./booking.entity.js";
import type { ScheduleEntity as Schedule } from "./schedule.entity.js";

@Entity({ tableName: 'locations' })
export class LocationEntity {
  @PrimaryKey({type: 'number'})
  id: number;

  @Property({ type: 'string' })
  name: string;

  @Property({ type: 'string' })
  address: string;

  // FIX: Change 'Booking' to 'BookingEntity' to match your class name
  @OneToMany(() => 'BookingEntity' as any, (booking: Booking) => booking.location)
  bookings = new Collection<Booking>(this);

  // FIX: Change 'Schedule' to 'ScheduleEntity'
  @OneToMany(() => 'ScheduleEntity' as any, (schedule: Schedule) => schedule.location)
  schedules = new Collection<Schedule>(this);
}

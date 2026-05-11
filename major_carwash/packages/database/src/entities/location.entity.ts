import { Collection } from "@mikro-orm/core";
import { Entity, PrimaryKey, Property, OneToMany } from "@mikro-orm/decorators/legacy";

// 1. MUST use 'import type' to prevent metadata crashes
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

  // 2. Use () => 'Booking' as any to satisfy legacy decorators
  // This avoids referencing the Booking class at runtime
  @OneToMany(() => 'Booking' as any, (booking: Booking) => booking.location)
  bookings = new Collection<Booking>(this);

  // 3. Use () => 'Schedule' as any
  @OneToMany(() => 'Schedule' as any, (schedule: Schedule) => schedule.location)
  schedules = new Collection<Schedule>(this);
}

// packages/database/src/entities/schedule.entity.ts
import { Collection } from "@mikro-orm/core";
import { Entity, PrimaryKey, Property, ManyToOne, OneToMany } from "@mikro-orm/decorators/legacy";
import type { BookingEntity as Booking } from "./booking.entity.js";
import type { LocationEntity as Location } from './location.entity.js'; 

@Entity({ tableName: 'schedules' })
export class ScheduleEntity {
  @PrimaryKey({type: 'number'})
  id: number;

  @Property({ type: 'date' })
  startTime: Date;

  @Property({ type: 'date' })
  endTime: Date;

  // FIX: Change 'Location' to 'LocationEntity' to match your class name
  @ManyToOne(() => 'LocationEntity' as any)
  location: Location;

  // FIX: Change 'Booking' to 'BookingEntity'
  @OneToMany(() => 'BookingEntity' as any, (booking: Booking) => booking.slot)
  bookings = new Collection<Booking>(this);
}

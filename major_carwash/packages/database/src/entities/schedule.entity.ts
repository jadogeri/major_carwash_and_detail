import { Collection } from "@mikro-orm/core";
import { Entity, PrimaryKey, Property, ManyToOne, OneToMany } from "@mikro-orm/decorators/legacy";
import type { Booking } from "./booking.entity.js";
import type { Location } from './location.entity.js'; 

@Entity({ tableName: 'schedules' })
export class Schedule {
  @PrimaryKey({type: 'number'})
  id: number;

  @Property({ type: 'date' })
  startTime: Date;

  @Property({ type: 'date' })
  endTime: Date;

  // FIX: Return the string 'Location' from the function.
  // 1. It satisfies the "Function" type check.
  // 2. It avoids referencing the 'Location' class/global at runtime.
  @ManyToOne(() => 'Location' as any)
  location: Location;

  // FIX: Same pattern for Booking
  @OneToMany(() => 'Booking' as any, (booking: Booking) => booking.slot)
  bookings = new Collection<Booking>(this);
}

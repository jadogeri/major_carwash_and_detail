// packages/database/src/entities/service.entity.ts
import { Collection } from "@mikro-orm/core";
import { Entity, PrimaryKey, Property, ManyToMany } from "@mikro-orm/decorators/legacy";
import type { BookingEntity as Booking } from "./booking.entity.js";

@Entity({ tableName: 'services' })
export class ServiceEntity {
  @PrimaryKey({type: 'number'})
  id: number;

  @Property({ type: 'string' })
  name: string;

  @Property({ type: 'number' })
  price: number;

  // FIX: Change 'Booking' to 'BookingEntity' to match the discovered class name
  @ManyToMany(() => 'BookingEntity' as any, (booking: Booking) => booking.services)
  bookings = new Collection<Booking>(this);
}

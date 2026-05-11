import { Collection } from "@mikro-orm/core";
import { Entity, PrimaryKey, Property, ManyToMany } from "@mikro-orm/decorators/legacy";
// 1. MUST use 'import type' for the related entity
import type { BookingEntity as Booking } from "./booking.entity.js";

@Entity({ tableName: 'services' })
export class ServiceEntity {
  @PrimaryKey({type: 'number'})
  id: number;

  @Property({ type: 'string' })
  name: string;

  @Property({ type: 'number' })
  price: number;

  // 2. Use () => 'Booking' as any to satisfy the legacy decorator 
  // and prevent the 'design:type' metadata from referencing the Class directly.
  @ManyToMany(() => 'Booking' as any, (booking: Booking) => booking.services)
  bookings = new Collection<Booking>(this);
}

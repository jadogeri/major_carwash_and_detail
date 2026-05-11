import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany } from '@mikro-orm/decorators/legacy';
import type { Booking } from './booking.entity.js';
import type { User } from './user.entity.js';
import { Collection } from '@mikro-orm/core';


@Entity({ tableName: 'vehicles' })
export class Vehicle {
  @PrimaryKey({type: 'number'})
  id: number;

  @Property({ type: 'string' })
  make: string;

  @Property({ type: 'string' })
  model: string;

  // Many Vehicles -> Exactly One Owner (1..1)
  @ManyToOne(() => "User" as any)
  owner: User; 

  // One or More Vehicles -> One or More Bookings (1..*)
  @ManyToMany(() => 'Booking' as any, (booking: Booking) => booking.vehicles)
  bookings = new Collection<Booking>(this);
}

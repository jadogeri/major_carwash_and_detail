import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany, Collection } from '@mikro-orm/decorators/legacy';
import { User } from './user.entity';
import { Booking } from './booking.entity';

@Entity({ tableName: 'vehicles' })
export class Vehicle {
  @PrimaryKey()
  id: number;

  @Property()
  make: string;

  @Property()
  model: string;

  // Many Vehicles -> Exactly One Owner (1..1)
  @ManyToOne(() => User)
  owner: User;

  // One or More Vehicles -> One or More Bookings (1..*)
  @ManyToMany(() => Booking, booking => booking.vehicles)
  bookings = new Collection<Booking>(this);
}

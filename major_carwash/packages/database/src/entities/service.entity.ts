import { Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/decorators/legacy';
import { Booking } from './booking.entity';

@Entity({ tableName: 'services' })
export class Service {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  price: number;

  // One or More Services -> One or More Bookings (1..*)
  @ManyToMany(() => Booking, booking => booking.services)
  bookings = new Collection<Booking>(this);
}

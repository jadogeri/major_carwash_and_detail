import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/decorators/legacy';
import { Booking } from './booking.entity';
import { Schedule } from './schedule.entity';

@Entity({ tableName: 'locations' })
export class Location {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  address: string;

  // One Location -> Zero or More Bookings (0..*)
  @OneToMany(() => Booking, booking => booking.location)
  bookings = new Collection<Booking>(this);

  // One Location -> One or More Slots (1..*)
  @OneToMany(() => Schedule, schedule => schedule.location)
  schedules = new Collection<Schedule>(this);
}

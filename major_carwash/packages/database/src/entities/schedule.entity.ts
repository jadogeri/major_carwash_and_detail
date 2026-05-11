import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/decorators/legacy';
import { Location } from './location.entity';
import { Booking } from './booking.entity';

@Entity({ tableName: 'schedules' })
export class Schedule {
  @PrimaryKey()
  id: number;

  @Property()
  startTime: Date;

  @Property()
  endTime: Date;

  // Many Slots -> Exactly One Location (1..1)
  @ManyToOne(() => Location)
  location: Location;

  // One Slot -> Zero or More Bookings (0..*)
  @OneToMany(() => Booking, booking => booking.slot)
  bookings = new Collection<Booking>(this);
}

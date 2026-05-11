import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany, Collection } from '@mikro-orm/decorators/legacy';
import { User } from './user.entity';
import { Vehicle } from './vehicle.entity';
import { Location } from './location.entity';
import { Service } from './service.entity';
import { Schedule } from './schedule.entity';

@Entity({ tableName: 'bookings' })
export class Booking {
  @PrimaryKey()
  id: number;

  @Property()
  bookingDate: Date;

  // Many Bookings -> Exactly One User (1..1)
  @ManyToOne(() => User)
  user: User;

  // Many Bookings -> Exactly One Location (1..1)
  @ManyToOne(() => Location)
  location: Location;

  // Many Bookings -> Exactly One Slot (0..1)
  @ManyToOne(() => Schedule, { nullable: true })
  slot?: Schedule;

  // One or More Bookings -> One or More Vehicles (1..*)
  @ManyToMany(() => Vehicle, 'bookings', { owner: true })
  vehicles = new Collection<Vehicle>(this);

  // One or More Bookings -> One or More Services (1..*)
  @ManyToMany(() => Service, 'bookings', { owner: true })
  services = new Collection<Service>(this);
}

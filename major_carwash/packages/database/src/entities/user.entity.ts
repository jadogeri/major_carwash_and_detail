import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/decorators/legacy';
import { Vehicle } from './vehicle.entity';
import { Booking } from './booking.entity';

@Entity({ tableName: 'users' }) 
export class User {
  @PrimaryKey()
  id: number;

  @Property({ unique: true })
  email: string;

  @Property({ nullable: true })
  name?: string;

  @Property()
  createdAt: Date = new Date();

  // One User -> One or More Vehicles (1..*)
  @OneToMany(() => Vehicle, vehicle => vehicle.owner)
  vehicles = new Collection<Vehicle>(this);

  // One User -> Zero or More Bookings (0..*)
  @OneToMany(() => Booking, booking => booking.user)
  bookings = new Collection<Booking>(this);
}

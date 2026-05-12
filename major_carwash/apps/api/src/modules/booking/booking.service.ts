// apps/api/src/modules/booking/booking.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { 
  BookingEntity, 
  UserEntity, 
  LocationEntity, 
  ScheduleEntity, 
  VehicleEntity, 
  ServiceEntity 
} from '@repo/database';
import { BookingRepository } from './booking.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: BookingRepository,
    private readonly em: EntityManager,
  ) {}

  async create(data: CreateBookingDto) {
    // 1. Create the instance (using repository.create ensures metadata is correct)
    const booking = this.bookingRepository.create({
      bookingDate: new Date(data.bookingDate),
      user: this.em.getReference(UserEntity, data.user),
      location: this.em.getReference(LocationEntity, data.location),
      slot: data.slot ? this.em.getReference(ScheduleEntity, data.slot) : undefined,
    });

    // 2. Add Many-to-Many collections
    data.vehicles.forEach(vId => {
      booking.vehicles.add(this.em.getReference(VehicleEntity, vId));
    });

    data.services.forEach(sId => {
      booking.services.add(this.em.getReference(ServiceEntity, sId));
    });

    // 3. Use the BaseRepository EntityManager to persist and flush
    // This matches the pattern in your other services
    this.em.persist(booking);
    await this.em.flush();
    
    return booking;
  }

  async findAll() {
    return await this.bookingRepository.findAll({ 
      populate: ['user', 'vehicles', 'services', 'location'] as any 
    });
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOne(id, {
      populate: ['user', 'vehicles', 'services', 'location', 'slot'] as any
    });
    if (!booking) throw new NotFoundException(`Booking with ID ${id} not found`);
    return booking;
  }

  async update(id: number, data: UpdateBookingDto) {
    const booking = await this.bookingRepository.update(id, data);
    if (!booking) throw new NotFoundException(`Booking with ID ${id} not found`);
    return booking;
  }

  async remove(id: number) {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) throw new NotFoundException(`Booking with ID ${id} not found`);
    
    // Uses the BaseRepository helper
    await this.bookingRepository.deleteEntity(id);
    return { deleted: true };
  }
}

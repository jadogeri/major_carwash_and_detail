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
    
    // FIX: Coerce data.user to a string to match the Better Auth UserEntity schema
    user: this.em.getReference(UserEntity, String(data.user)),
    
    // Ensure these match their respective entity primary key types (assuming number here)
    location: this.em.getReference(LocationEntity, Number(data.location)),
    slot: data.slot ? this.em.getReference(ScheduleEntity, Number(data.slot)) : undefined,
  });

  // 2. Add Many-to-Many collections
  data.vehicles.forEach(vId => {
    // If your VehicleEntity also shifted to string IDs, change Number(vId) to String(vId)
    booking.vehicles.add(this.em.getReference(VehicleEntity, Number(vId)));
  });

  data.services.forEach(sId => {
    booking.services.add(this.em.getReference(ServiceEntity, Number(sId)));
  });

  // 3. Use the BaseRepository EntityManager to persist and flush
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

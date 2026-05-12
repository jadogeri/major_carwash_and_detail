// apps/api/src/modules/location/location.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { LocationEntity } from '@repo/database';
import { LocationRepository } from './location.repository';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: LocationRepository
  ) {}

  async create(data: CreateLocationDto) {
    return await this.locationRepository.createEntity(data);
  }

  async findAll() {
    return await this.locationRepository.search();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findById(id);
    if (!location) throw new NotFoundException(`Location with ID ${id} not found`);
    return location;
  }

  async update(id: number, data: UpdateLocationDto) {
    const location = await this.locationRepository.update(id, data);
    if (!location) throw new NotFoundException(`Location with ID ${id} not found`);
    return location;
  }

  async remove(id: number) {
    const location = await this.locationRepository.findById(id);
    if (!location) throw new NotFoundException(`Location with ID ${id} not found`);
    
    await this.locationRepository.deleteEntity(id);
    return { deleted: true };
  }
}

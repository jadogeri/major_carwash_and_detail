// apps/api/src/modules/vehicle/vehicle.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { VehicleEntity } from '@repo/database';
import { VehicleRepository } from './vehicle.repository';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: VehicleRepository
  ) {}

  async create(data: CreateVehicleDto) {
    return await this.vehicleRepository.createEntity(data);
  }

  async findAll() {
    return await this.vehicleRepository.search();
  }

  async findOne(id: number) {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) throw new NotFoundException(`Vehicle with ID ${id} not found`);
    return vehicle;
  }

  async update(id: number, data: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepository.update(id, data);
    if (!vehicle) throw new NotFoundException(`Vehicle with ID ${id} not found`);
    return vehicle;
  }

  async remove(id: number) {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) throw new NotFoundException(`Vehicle with ID ${id} not found`);
    
    await this.vehicleRepository.deleteEntity(id);
    return { deleted: true };
  }
}

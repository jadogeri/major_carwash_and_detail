// apps/api/src/modules/service/service.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ServiceEntity } from '@repo/database';
import { ServiceRepository } from './service.repository';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: ServiceRepository
  ) {}

  async create(data: CreateServiceDto) {
    return await this.serviceRepository.createEntity(data);
  }

  async findAll() {
    return await this.serviceRepository.search();
  }

  async findOne(id: number) {
    const service = await this.serviceRepository.findById(id);
    if (!service) throw new NotFoundException(`Service with ID ${id} not found`);
    return service;
  }

  async update(id: number, data: UpdateServiceDto) {
    const service = await this.serviceRepository.update(id, data);
    if (!service) throw new NotFoundException(`Service with ID ${id} not found`);
    return service;
  }

  async remove(id: number) {
    const service = await this.serviceRepository.findById(id);
    if (!service) throw new NotFoundException(`Service with ID ${id} not found`);
    
    await this.serviceRepository.deleteEntity(id);
    return { deleted: true };
  }
}

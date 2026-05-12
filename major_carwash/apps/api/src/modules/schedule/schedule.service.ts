// apps/api/src/modules/schedule/schedule.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ScheduleEntity } from '@repo/database';
import { ScheduleRepository } from './schedule.repository';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async create(data: CreateScheduleDto) {
    return await this.scheduleRepository.createEntity(data);
  }

  async findAll() {
    return await this.scheduleRepository.search();
  }

  async findOne(id: number) {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) throw new NotFoundException(`Schedule with ID ${id} not found`);
    return schedule;
  }

  async update(id: number, data: UpdateScheduleDto) {
    const schedule = await this.scheduleRepository.update(id, data);
    if (!schedule) throw new NotFoundException(`Schedule with ID ${id} not found`);
    return schedule;
  }

  async remove(id: number) {
    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) throw new NotFoundException(`Schedule with ID ${id} not found`);
    
    await this.scheduleRepository.deleteEntity(id);
    return { deleted: true };
  }
}

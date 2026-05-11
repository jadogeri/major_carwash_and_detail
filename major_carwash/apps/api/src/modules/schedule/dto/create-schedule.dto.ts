// apps/api/src/modules/schedule/dto/create-schedule.dto.ts
import { IsDateString, IsNumber, IsNotEmpty } from 'class-validator';
import { ScheduleEntity } from '@repo/database';
import type { RequiredEntityData } from '@mikro-orm/core';

/**
 * DTO for creating a Schedule slot.
 * We Omit 'bookings' because they are created after the schedule exists.
 * We use 'number' for location to accept the ID from the frontend.
 */
export class CreateScheduleDto implements Omit<RequiredEntityData<ScheduleEntity>, 'bookings' | 'location'> {
  
  @IsDateString()
  @IsNotEmpty()
  startTime!: string | Date;

  @IsDateString()
  @IsNotEmpty()
  endTime!: string | Date;

  @IsNumber()
  @IsNotEmpty()
  location!: number;
}

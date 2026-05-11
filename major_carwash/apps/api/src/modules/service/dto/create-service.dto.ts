// apps/api/src/modules/service/dto/create-service.dto.ts
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ServiceEntity } from '@repo/database';
import type { RequiredEntityData } from '@mikro-orm/core';

/**
 * DTO for creating a Service.
 * We Omit 'bookings' because they are managed via the Booking flow, 
 * not during the creation of a standalone Service.
 */
export class CreateServiceDto implements Omit<RequiredEntityData<ServiceEntity>, 'bookings'> {
  
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price!: number;
}

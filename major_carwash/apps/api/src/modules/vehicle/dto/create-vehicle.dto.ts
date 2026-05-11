// apps/api/src/modules/vehicle/dto/create-vehicle.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { VehicleEntity } from '@repo/database';
import type { RequiredEntityData } from '@mikro-orm/core';

/**
 * DTO for creating a Vehicle.
 * We Omit 'bookings' because they are created separately.
 * We use 'number' for owner to accept the User ID from the frontend.
 */
export class CreateVehicleDto implements Omit<RequiredEntityData<VehicleEntity>, 'bookings' | 'owner'> {
  
  @IsString()
  @IsNotEmpty()
  make!: string;

  @IsString()
  @IsNotEmpty()
  model!: string;

  @IsNumber()
  @IsNotEmpty()
  owner!: number;
}

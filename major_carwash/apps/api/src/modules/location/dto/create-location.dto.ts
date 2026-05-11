// apps/api/src/modules/location/dto/create-location.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max } from 'class-validator';
import { LocationEntity } from '@repo/database';
import type { RequiredEntityData } from '@mikro-orm/core';

/**
 * Ensures CreateLocationDto stays in sync with LocationEntity fields.
 * Includes class-validator decorators for runtime API protection.
 */
export class CreateLocationDto implements RequiredEntityData<LocationEntity> {
  
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  // Add any other fields present in your LocationEntity
}

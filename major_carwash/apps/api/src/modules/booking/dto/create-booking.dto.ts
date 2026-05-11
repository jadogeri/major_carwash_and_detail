// apps/api/src/modules/booking/dto/create-booking.dto.ts
import { 
  IsDateString, 
  IsNumber, 
  IsArray, 
  IsOptional, 
  ArrayMinSize 
} from 'class-validator';
import { BookingEntity } from '@repo/database';
import type { RequiredEntityData } from '@mikro-orm/core';

/**
 * We implement RequiredEntityData to ensure this DTO stays in sync 
 * with the DB schema, but we use 'any' for relationships in the interface 
 * because the DTO receives IDs (numbers), while the Entity expects objects.
 */
export class CreateBookingDto implements Omit<RequiredEntityData<BookingEntity>, 'user' | 'location' | 'vehicles' | 'services' | 'slot'> {
  
  @IsDateString()
  bookingDate!: string | Date;

  @IsNumber()
  user!: number;

  @IsNumber()
  location!: number;

  @IsOptional()
  @IsNumber()
  slot?: number;

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  vehicles!: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  services!: number[];
}

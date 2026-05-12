// apps/api/src/modules/booking/booking.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';
import { BookingEntity } from '@repo/database';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingRepository } from './booking.repository';

@Module({
  imports: [MikroOrmModule.forFeature([BookingEntity])],
  controllers: [BookingController],
  providers: [
    BookingService,
    {
      provide: getRepositoryToken(BookingEntity),
      useClass: BookingRepository,
    },
  ],
  exports: [BookingService],
})
export class BookingModule {}

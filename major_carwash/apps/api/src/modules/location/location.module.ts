// apps/api/src/modules/location/location.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';
import { LocationEntity } from '@repo/database';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LocationRepository } from './location.repository';

@Module({
  imports: [MikroOrmModule.forFeature([LocationEntity])],
  controllers: [LocationController],
  providers: [
    LocationService,
    {
      provide: getRepositoryToken(LocationEntity),
      useClass: LocationRepository,
    },
  ],
  exports: [LocationService],
})
export class LocationModule {}

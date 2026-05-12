// apps/api/src/modules/vehicle/vehicle.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';
import { VehicleEntity } from '@repo/database';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { VehicleRepository } from './vehicle.repository';

@Module({
  imports: [MikroOrmModule.forFeature([VehicleEntity])],
  controllers: [VehicleController],
  providers: [
    VehicleService,
    // Using the same pattern as UserModule for consistency
    {
      provide: getRepositoryToken(VehicleEntity),
      useClass: VehicleRepository,
    },
  ],
  exports: [VehicleService],
})
export class VehicleModule {}

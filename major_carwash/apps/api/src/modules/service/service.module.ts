// apps/api/src/modules/service/service.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';
import { ServiceEntity } from '@repo/database';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { ServiceRepository } from './service.repository';

@Module({
  imports: [MikroOrmModule.forFeature([ServiceEntity])],
  controllers: [ServiceController],
  providers: [
    ServiceService,
    {
      provide: getRepositoryToken(ServiceEntity),
      useClass: ServiceRepository,
    },
  ],
  exports: [ServiceService],
})
export class ServiceModule {}

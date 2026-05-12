// apps/api/src/modules/schedule/schedule.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';
import { ScheduleEntity } from '@repo/database';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleRepository } from './schedule.repository';

@Module({
  imports: [MikroOrmModule.forFeature([ScheduleEntity])],
  controllers: [ScheduleController],
  providers: [
    ScheduleService,
    {
      provide: getRepositoryToken(ScheduleEntity),
      useClass: ScheduleRepository,
    },
  ],
  exports: [ScheduleService],
})
export class ScheduleModule {}

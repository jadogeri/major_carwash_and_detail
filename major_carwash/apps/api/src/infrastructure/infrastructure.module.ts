// src/infrastructure/infrastructure.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [DatabaseModule],
  exports: [DatabaseModule], // Exporting them makes them available to AppModule
})
export class InfrastructureModule {}

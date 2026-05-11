// src/infrastructure/infrastructure.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  // No need to export anything; DatabaseModule is already Global
})
export class InfrastructureModule {}

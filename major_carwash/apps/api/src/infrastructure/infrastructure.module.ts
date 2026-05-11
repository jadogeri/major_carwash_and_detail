// src/infrastructure/infrastructure.module.ts
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [DatabaseModule, TokenModule, CacheModule],
  exports: [DatabaseModule, TokenModule, CacheModule], // Exporting them makes them available to AppModule
})
export class InfrastructureModule {}

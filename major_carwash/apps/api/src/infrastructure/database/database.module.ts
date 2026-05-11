// src/infrastructure/database/database.module.ts
import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { microOrmConfig } from '@repo/database';
@Global()
@Module({
  imports: [
    // Calling it here lets NestJS handle the promise resolution internally
    MikroOrmModule.forRoot(microOrmConfig),
  ],
  // Do NOT export MikroOrmModule here. 
  // It causes conflicts in NestJS 11 if not handled correctly.
  // The @Global() tag already makes the EntityManager available everywhere.
  exports: [], 
})
export class DatabaseModule {}

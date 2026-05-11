// src/infrastructure/database/database.module.ts
import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { microOrmConfig } from '@repo/database';

@Global() // <--- This makes it global once imported anywhere
@Module({
  imports: [MikroOrmModule.forRoot(microOrmConfig)],
  exports: [MikroOrmModule], 
})
export class DatabaseModule {}

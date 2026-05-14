// apps/api/src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { UserEntity } from '@repo/database';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

@Module({
  imports: [
    MikroOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    UserService,
    // Explicit Custom Provider mapping
    {
      provide: getRepositoryToken(UserEntity),
      useClass: UserRepository,
    },
  ],
  exports: [UserService, getRepositoryToken(UserEntity)],
})
export class UserModule {}

// apps/api/src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { User } from '@repo/database';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
  ],
  providers: [
    UserService,
    // Explicit Custom Provider mapping
    {
      provide: getRepositoryToken(User),
      useClass: UserRepository,
    },
  ],
  exports: [UserService, getRepositoryToken(User)],
})
export class UserModule {}

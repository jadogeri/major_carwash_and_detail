// apps/api/src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule, getRepositoryToken } from '@mikro-orm/nestjs';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User } from '@repo/database';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    // THIS IS THE CRITICAL FIX:
    // It tells Nest: "When @InjectRepository(User) is requested, 
    // use the UserRepository class instead of the default one."
    {
      provide: getRepositoryToken(User),
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}

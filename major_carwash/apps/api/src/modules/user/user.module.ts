import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User } from '@repo/database';

@Module({
  imports: [MikroOrmModule.forFeature([User])], // Tells MikroORM to manage the User entity
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository], // Exporting the service and repository for use in other modules
})
export class UserModule {}

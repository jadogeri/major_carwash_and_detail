// src/modules/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity'; // Adjust path to your entity
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {}

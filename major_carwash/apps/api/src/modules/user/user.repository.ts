// src/modules/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@repo/database'
import { BaseRepository } from '../../common/repositories/base.repository.js'; // Adjust path to your base repository'
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(em: EntityManager) {
        super(em, UserEntity);
    }    
}

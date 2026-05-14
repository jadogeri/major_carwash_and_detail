// src/modules/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { BaseRepository, UserEntity } from '@repo/database'
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(em: EntityManager) {
        super(em, UserEntity);
    }    
}

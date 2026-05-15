// src/modules/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { BaseRepository, User } from '@repo/database'
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(em: EntityManager) {
        super(em, User);
    }    
}

// src/modules/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { BaseRepository, BookingEntity } from '@repo/database'
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class BookingRepository extends BaseRepository<BookingEntity> {
    constructor(em: EntityManager) {
        super(em, BookingEntity);
    }    
}

// src/modules/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { BaseRepository, ScheduleEntity } from '@repo/database'
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class ScheduleRepository extends BaseRepository<ScheduleEntity> {
    constructor(em: EntityManager) {
        super(em, ScheduleEntity);
    }    
}

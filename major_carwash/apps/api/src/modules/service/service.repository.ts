// src/modules/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { BaseRepository, ServiceEntity } from '@repo/database'
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class ServiceRepository extends BaseRepository<ServiceEntity> {
    constructor(em: EntityManager) {
        super(em, ServiceEntity);
    }    
}

// src/modules/user/user.repository.ts
import { Injectable } from '@nestjs/common';
import { BaseRepository, LocationEntity } from '@repo/database'
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class LocationRepository extends BaseRepository<LocationEntity> {
    constructor(em: EntityManager) {
        super(em, LocationEntity);
    }    
}

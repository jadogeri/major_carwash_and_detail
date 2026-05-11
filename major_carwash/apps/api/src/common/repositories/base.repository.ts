// src/core/repositories/base.repository.ts
import { 
  EntityRepository, 
  FilterQuery, 
  FindOptions, 
  RequiredEntityData, 
  EntityManager 
} from '@mikro-orm/core';

export abstract class BaseRepository<T extends object> extends EntityRepository<T> {
  // Use the core EntityManager which is driver-agnostic
  declare readonly em: EntityManager;

  async search(where: FilterQuery<T> = {}, options?: FindOptions<T, any>): Promise<T[]> {
    return await this.find(where, options);
  }

  // Manually persist then flush to replace persistAndFlush
  async save(data: RequiredEntityData<T>): Promise<T> {
    const entity = this.create(data);
    this.em.persist(entity);
    await this.em.flush();
    return entity;
  }

  async update(id: any, data: any): Promise<T | null> {
    const entity = await this.findOne(id);
    if (!entity) return null;
    
    this.em.assign(entity, data);
    await this.em.flush();
    return entity;
  }

  async findById(id: any): Promise<T | null> {
    return await this.findOne(id);
  }

  async createEntity(data: any): Promise<T> {
    const entity = this.create(data);
    this.em.persist(entity);
    await this.em.flush();
    return entity;
  }

  async deleteEntity(id: any): Promise<void> {
    // Better to use ref(id) to avoid an extra SELECT query if possible
    const entity = await this.findOne(id);
    if (entity) {
      this.em.remove(entity);
      await this.em.flush();
    }
  }
}

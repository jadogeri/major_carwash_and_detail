// // src/core/repositories/base.repository.ts
// import { 
//   EntityRepository, 
//   FilterQuery, 
//   FindOptions, 
//   RequiredEntityData, 
//   EntityManager 
// } from '@mikro-orm/core';

// export abstract class BaseRepository<T extends object> extends EntityRepository<T> {
//   // Use the core EntityManager which is driver-agnostic
//   declare readonly em: EntityManager;

//   async search(where: FilterQuery<T> = {}, options?: FindOptions<T, any>): Promise<T[]> {
//     return await this.find(where, options);
//   }

//   // Manually persist then flush to replace persistAndFlush
//   async save(data: RequiredEntityData<T>): Promise<T> {
//     const entity = this.create(data);
//     this.em.persist(entity);
//     await this.em.flush();
//     return entity;
//   }

//   async update(id: any, data: any): Promise<T | null> {
//     const entity = await this.findOne(id);
//     if (!entity) return null;
    
//     this.em.assign(entity, data);
//     await this.em.flush();
//     return entity;
//   }

//   async findById(id: any): Promise<T | null> {
//     return await this.findOne(id);
//   }

//   async createEntity(data: any): Promise<T> {
//     const entity = this.create(data);
//     this.em.persist(entity);
//     await this.em.flush();
//     return entity;
//   }

//   async deleteEntity(id: any): Promise<void> {
//     // Better to use ref(id) to avoid an extra SELECT query if possible
//     const entity = await this.findOne(id);
//     if (entity) {
//       this.em.remove(entity);
//       await this.em.flush();
//     }
//   }
// }
// packages/database/src/core/repositories/base.repository.ts
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

  // Helper helper utility to ensure operations always use the active request thread context
  private getTargetEm(): EntityManager {
    return this.em.getContext() || this.em;
  }

  async search(where: FilterQuery<T> = {}, options?: FindOptions<T, any>): Promise<T[]> {
    // FIX: Typecast 'where' to FilterQuery<any> to bypass the strict v7 NoInfer type constraint
    return await this.getTargetEm().find(this.entityName, where as FilterQuery<any>, options);
  }

  async save(data: RequiredEntityData<T>): Promise<T> {
    const activeEm = this.getTargetEm();
    const entity = activeEm.create(this.entityName, data);
    activeEm.persist(entity);
    await activeEm.flush();
    return entity;
  }

  async update(id: any, data: any): Promise<T | null> {
    const activeEm = this.getTargetEm();
    const entity = await activeEm.findOne(this.entityName, id);
    if (!entity) return null;
    
    activeEm.assign(entity, data);
    await activeEm.flush();
    return entity;
  }

  async findById(id: any): Promise<T | null> {
    return await this.getTargetEm().findOne(this.entityName, id);
  }

  async createEntity(data: any): Promise<T> {
    const activeEm = this.getTargetEm();
    const entity = activeEm.create(this.entityName, data);
    activeEm.persist(entity);
    await activeEm.flush();
    return entity;
  }

  async deleteEntity(id: any): Promise<void> {
    const activeEm = this.getTargetEm();
    const entity = await activeEm.findOne(this.entityName, id);
    if (entity) {
      activeEm.remove(entity);
      await activeEm.flush();
    }
  }
}

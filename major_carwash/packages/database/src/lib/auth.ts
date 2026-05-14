// // packages/database/src/lib/auth.ts
// import { betterAuth } from "better-auth";
// import type { DBAdapter, Where } from "better-auth/types";
// import type { MikroORM, EntityManager } from "@mikro-orm/libsql";
// import { UserEntity } from "../entities/user.entity.js";
// import { SessionEntity } from "../entities/session.entity.js";
// import { AccountEntity } from "../entities/account.entity.js";
// import { VerificationEntity } from "../entities/verification.entity.js";
// import type { BaseRepository } from "../core/repositories/base.repository.js";

// type SupportModels = "user" | "session" | "account" | "verification";

// export const initAuth = (orm: MikroORM) => {
//   // Helper utility mapping entities to custom BaseRepository instances dynamically
//   // FIXED: No longer caches a global stale baseEm fork to prevent memory leaks
//   const getRepo = (em: EntityManager, model: SupportModels): BaseRepository<any> => {
//     const map: Record<SupportModels, any> = {
//       user: UserEntity,
//       session: SessionEntity,
//       account: AccountEntity,
//       verification: VerificationEntity,
//     };
//     return em.getRepository(map[model]) as unknown as BaseRepository<any>;
//   };

//   const customAdapter: DBAdapter = {
//     id: "mikro-orm-custom-adapter",

//     options: {
//       adapterConfig: {
//         adapterId: "mikro-orm-custom-adapter"
//       }
//     },

//     // FIXED: Added mandatory schema initialization method required by Better Auth
//     async createSchema() {
//       return {
//         code: "",
//         path: ""
//       };
//     },

//     // FIXED: Ensured context-isolated EntityManagers are fetched per-request lifecycle
//     async create({ model, data }) {
//       const em = orm.em.getContext() || orm.em.fork();
//       const repo = getRepo(em, model as SupportModels);
//       return await repo.save(data as any);
//     },

//     async findOne({ model, where }) {
//       const em = orm.em.getContext() || orm.em.fork();
//       const repo = getRepo(em, model as SupportModels);
//       const [entity] = await repo.search(parseWhere(where), { limit: 1 });
//       return (entity as any) || null;
//     },

//     async findMany({ model, where }) {
//       const em = orm.em.getContext() || orm.em.fork();
//       const repo = getRepo(em, model as SupportModels);
//       return await repo.search(where ? parseWhere(where) : {});
//     },

//     async update({ model, where, update }) {
//       const em = orm.em.getContext() || orm.em.fork();
//       const repo = getRepo(em, model as SupportModels);
//       const [entity] = await repo.search(parseWhere(where), { limit: 1 });
//       if (!entity) return null;
//       return await repo.update((entity as any).id, update);
//     },

//     async delete({ model, where }) {
//       const em = orm.em.getContext() || orm.em.fork();
//       const repo = getRepo(em, model as SupportModels);
//       const [entity] = await repo.search(parseWhere(where), { limit: 1 });
//       if (entity) {
//         await repo.deleteEntity((entity as any).id);
//       }
//     },

//     async updateMany({ model, where, update }) {
//       const em = orm.em.getContext() || orm.em.fork();
//       const repo = getRepo(em, model as SupportModels);
//       const entities = await repo.search(parseWhere(where));
//       let count = 0;
//       for (const entity of entities) {
//         await repo.update((entity as any).id, update);
//         count++;
//       }
//       return count;
//     },

//     async deleteMany({ model, where }) {
//       const em = orm.em.getContext() || orm.em.fork();
//       const repo = getRepo(em, model as SupportModels);
//       const entities = await repo.search(parseWhere(where));
//       let count = 0;
//       for (const entity of entities) {
//         await repo.deleteEntity((entity as any).id);
//         count++;
//       }
//       return count;
//     },

//     async count({ model, where }) {
//       const em = orm.em.getContext() || orm.em.fork();
//       const repo = getRepo(em, model as SupportModels);
//       return await repo.count(parseWhere(where || []));
//     },

//     async consumeOne({ model, where }) {
//       const em = orm.em.getContext() || orm.em.fork();
//       const repo = getRepo(em, model as SupportModels);
//       const [entity] = await repo.search(parseWhere(where), { limit: 1 });
//       if (!entity) return null;

//       const result = { ...entity } as any;
//       await repo.deleteEntity((entity as any).id);
//       return result;
//     },

//     async transaction(fn) {
//       if (!fn) return null as any;
//       const em = orm.em.getContext() || orm.em.fork();
//       return await em.transactional(async (transactionEm) => {
//         const txAdapter: any = {
//           ...customAdapter,
//           create: async ({ model, data }: any) => getRepo(transactionEm, model).save(data),
//           findOne: async ({ model, where }: any) => {
//             const [entity] = await getRepo(transactionEm, model).search(parseWhere(where), { limit: 1 });
//             return entity || null;
//           },
//           update: async ({ model, where, update }: any) => {
//             const [entity] = await getRepo(transactionEm, model).search(parseWhere(where), { limit: 1 });
//             if (!entity) return null;
//             return await getRepo(transactionEm, model).update((entity as any).id, update);
//           },
//           delete: async ({ model, where }: any) => {
//             const [entity] = await getRepo(transactionEm, model).search(parseWhere(where), { limit: 1 });
//             if (entity) await getRepo(transactionEm, model).deleteEntity((entity as any).id);
//           }
//         };
//         return await fn(txAdapter);
//       });
//     }
//   };

//   try {
//     return betterAuth({
//       secret: process.env.BETTER_AUTH_SECRET!,
//       database: customAdapter,
//       advanced: {
//         database: {
//           // FIXED: Forces Better Auth to let your BaseRepository manage IDs
//           generateId: false 
//         }
//       },
//       modelMapping: {
//         user: "users",
//         session: "sessions",
//         account: "accounts",
//         verification: "verifications"
//       }
//     });
//   } catch (error) {
//     console.error("=================================================");
//     console.error("🔴 CRITICAL BETTER AUTH INITIALIZATION ERROR TRACE:");
//     console.error(error);
//     console.error("=================================================");
//     throw error;
//   }
// };

// function parseWhere(where: Where[]): Record<string, any> {
//   const query: Record<string, any> = {};
//   for (const filter of where) {
//     if (filter.operator === "eq" || !filter.operator) {
//       query[filter.field] = filter.value;
//     } else {
//       query[filter.field] = { [`$${filter.operator}`]: filter.value };
//     }
//   }
//   return query;
// }
// packages/database/src/lib/auth.ts
// import { betterAuth } from "better-auth";
// import { mikroOrmAdapter } from "better-auth-mikro-orm";
// import type { MikroORM } from "@mikro-orm/libsql";

// export const initAuth = (orm: MikroORM) => {
//   try {
//     return betterAuth({
//       secret: process.env.BETTER_AUTH_SECRET!,
      
//       // Native, secure, and maintained directly by the community
//       database: mikroOrmAdapter(orm),

//       advanced: {
//         database: {
//           generateId: false // Crucial: Prevents Better Auth from overriding MikroORM ID managers
//         }
//       },
//       modelMapping: {
//         user: "users",
//         session: "sessions",
//         account: "accounts",
//         verification: "verifications"
//       }
//     });
//   } catch (error) {
//     console.error("=================================================");
//     console.error("🔴 CRITICAL BETTER AUTH INITIALIZATION ERROR:");
//     console.error(error);
//     console.error("=================================================");
//     throw error;
//   }
// };
// packages/database/src/lib/auth.ts
// import { betterAuth } from "better-auth";
// import { mikroOrmAdapter } from "better-auth-mikro-orm";
// import type { MikroORM } from "@mikro-orm/libsql";

// export const initAuth = (orm: MikroORM) => {
//   try {
//     return betterAuth({
//       secret: process.env.BETTER_AUTH_SECRET!,
      
//       // Native, secure, and reads the exact same configurations as your repositories
//       database: mikroOrmAdapter(orm),

//       advanced: {
//         database: {
//           generateId: false // Crucial: Prevents Better Auth from overriding MikroORM ID managers
//         }
//       },
//       modelMapping: {
//         user: "users",
//         session: "sessions",
//         account: "accounts",
//         verification: "verifications"
//       }
//     });
//   } catch (error) {
//     console.error("=================================================");
//     console.error("🔴 CRITICAL BETTER AUTH INITIALIZATION ERROR:");
//     console.error(error);
//     console.error("=================================================");
//     throw error;
//   }
// };
// packages/database/src/lib/auth.ts
import { betterAuth } from "better-auth";
import { mikroOrmAdapter } from "better-auth-mikro-orm";
import type { MikroORM } from "@mikro-orm/libsql";

export const initAuth = (orm: MikroORM) => {
  try {
    return betterAuth({
      secret: process.env.BETTER_AUTH_SECRET!,
      
      // FIX THE WARNING: Provide a fallback URL for development contexts
      baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
      
      // Native, secure, and maintained directly by the community
      database: mikroOrmAdapter(orm),

      advanced: {
        database: {
          generateId: false // Crucial: Prevents Better Auth from overriding MikroORM ID managers
        }
      },
      modelMapping: {
        user: "users",
        session: "sessions",
        account: "accounts",
        verification: "verifications"
      }
    });
  } catch (error) {
    console.error("=================================================");
    console.error("🔴 CRITICAL BETTER AUTH INITIALIZATION ERROR:");
    console.error(error);
    console.error("=================================================");
    throw error;
  }
};

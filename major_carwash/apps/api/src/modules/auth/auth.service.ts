// src/modules/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/libsql';
import { initAuth, type BetterAuthServerInstance } from '@repo/database';

@Injectable()
export class AuthService {
  public readonly auth: BetterAuthServerInstance;

  constructor(private readonly orm: MikroORM) {
    // ======================================================================
    // ✅ FIX: Proxy interceptor wrapping providing private field (.bind) passthroughs
    // ======================================================================
    const patchedEm = new Proxy(this.orm.em, {
      get(target, prop, receiver) {
        if (prop === 'persistAndFlush') {
          return async function (anyEntity: any) {
            target.persist(anyEntity);
            return target.flush();
          };
        }
        const value = Reflect.get(target, prop, receiver);
        // CRITICAL FIX: If property is a function, bind it back to target to permit private field access
        return typeof value === 'function' ? value.bind(target) : value;
      },
    });

    const patchedOrm = new Proxy(this.orm, {
      get(target, prop, receiver) {
        if (prop === 'em') {
          return patchedEm;
        }
        const value = Reflect.get(target, prop, receiver);
        // CRITICAL FIX: Bind functions back to main ORM instance context
        return typeof value === 'function' ? value.bind(target) : value;
      },
    });

    // Initialize using the bound, crash-proof proxy instance
    this.auth = initAuth(patchedOrm as any);
  }
}

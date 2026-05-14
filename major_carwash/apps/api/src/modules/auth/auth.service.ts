// apps/api/src/modules/auth/auth.service.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/libsql';
import { initAuth } from '@repo/database';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  // Strongly typed reference to the Better Auth instance
  public auth!: ReturnType<typeof initAuth>;

  constructor(private readonly orm: MikroORM) {}

  // FIX: Shift hook to OnApplicationBootstrap so connection pools are hot
  onApplicationBootstrap() {
    this.auth = initAuth(this.orm);
  }
}

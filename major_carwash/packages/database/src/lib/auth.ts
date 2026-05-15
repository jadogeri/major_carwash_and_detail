import { betterAuth } from "better-auth";
import { mikroOrmAdapter } from "better-auth-mikro-orm";
import { admin, twoFactor, bearer } from "better-auth/plugins";
import type { MikroORM } from "@mikro-orm/libsql";

// Import your physical class references natively into the engine file context
import { User } from '../entities/user.entity.js';
import { Session } from '../entities/session.entity.js';
import { Account } from '../entities/account.entity.js';
import { Verification } from '../entities/verification.entity.js';

export interface BetterAuthServerInstance {
  handler: (request: Request, response?: Response) => Promise<Response>;
  api: ReturnType<typeof betterAuth>['api'];
}

export const initAuth = (orm: MikroORM): BetterAuthServerInstance => {
  try {
    const authObject = betterAuth({
      secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-string-value",
      baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3002/api/auth",
      
      // Native clean instantiation mapping
      database: mikroOrmAdapter(orm),

      emailAndPassword: {
        enabled: true
      },

      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID || "stub_id",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || "stub_secret",
        }
      },

      advanced: {
        database: {
          generateId: "uuid" // ✅ CHANGE TO TRUE: Better Auth will handle ID generation
        },
        crossSubDomainCookies: {
          enabled: process.env.NODE_ENV === "production"
        },
        defaultCookieAttributes: {
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
        }
      },

      plugins: [
        admin(), 
        twoFactor({ issuer: "MajorCarwash" }), 
        bearer(),
        
        // ✅ THE FIX: Custom inline mapping forces the internal registry dictionary 
        // to couple directly with your imported monorepo Class symbols at boot time
        {
          id: "mikro-orm-metadata-force-sync",
          init: (ctx) => {
            const registry = (orm as any).getMetadata();
            // Forcefully populate short string metadata keys to clear lookups permanently
            registry.set("User", registry.get(User.name));
            registry.set("Session", registry.get(Session.name));
            registry.set("Account", registry.get(Account.name));
            registry.set("Verification", registry.get(Verification.name));
            return {};
          }
        }
      ]
    });

    return {
      handler: authObject.handler,
      api: authObject.api,
    };
  } catch (error) {
    console.error("=================================================");
    console.error("🔴 CRITICAL BETTER AUTH INITIALIZATION ERROR:");
    console.error(error);
    console.error("=================================================");
    throw error;
  }
};

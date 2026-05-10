import 'reflect-metadata'; 
import * as dotenv from 'dotenv';
import path from 'path';

// Load from the root of the database package (or adjust path to monorepo root)
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 
import { defineConfig, LibSqlDriver } from '@mikro-orm/libsql';

import { Migrator } from '@mikro-orm/migrations';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { User } from './entities/user.entity';

// Hard-coded for immediate testing
const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL || "file:./turso.db";
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN || "your-turso-auth-token";

console.log("Using Turso Database URL:", TURSO_DATABASE_URL);
console.log("Using Turso Auth Token:", TURSO_AUTH_TOKEN ? "Provided" : "Not Provided");
export default defineConfig({
  driver: LibSqlDriver,
  dbName: TURSO_DATABASE_URL,
  password: TURSO_AUTH_TOKEN, // Standardized for Turso in v7
  
  entities: [User], // Using classes directly prevents path discovery errors
  metadataProvider: ReflectMetadataProvider,
  
    // 3. Monorepo Discovery Fix
    discovery: {
        //disableDynamicFileAccess: true, // Prevents CLI from crashing on relative paths
        warnWhenNoEntities: true,
    },

    // 4. Extensions
    extensions: [Migrator],
    
    // 5. Migrations (Monorepo safe paths)
    migrations: {
        path: './src/migrations',
        pathTs: './src/migrations',
        glob: '!(*.d).{js,ts}',
        transactional: true,
        allOrNothing: true,
    },

    // 6. Logging
    debug: ['query', 'query-params'],
});
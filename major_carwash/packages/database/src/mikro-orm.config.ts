import 'reflect-metadata'; 
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') }); 
dotenv.config({ path: path.resolve(__dirname, '../.env') }); 
dotenv.config();

import { defineConfig, LibSqlDriver } from '@mikro-orm/libsql';
import { Migrator } from '@mikro-orm/migrations';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';

// Import Entities
import { User } from './entities/user.entity.js';
import { VehicleEntity } from './entities/vehicle.entity.js';
import { BookingEntity } from './entities/booking.entity.js';
import { ServiceEntity } from './entities/service.entity.js';
import { ScheduleEntity } from './entities/schedule.entity.js';
import { LocationEntity } from './entities/location.entity.js';
import { Verification } from './entities/verification.entity.js';
import { Session } from './entities/session.entity.js';
import { Account } from './entities/account.entity.js';

const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL || "file:./turso.db";
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN || "your-turso-auth-token";

export default defineConfig({
  driver: LibSqlDriver,
  dbName: TURSO_DATABASE_URL,
  password: TURSO_AUTH_TOKEN, 

  entities: [
    User, VehicleEntity, BookingEntity, ServiceEntity, ScheduleEntity, 
    LocationEntity, Account, Session, Verification   
  ],
  metadataProvider: ReflectMetadataProvider, // Standard framework default provider
  
  // ✅ FIX: Dynamically intercept discovery to map the clean strings Better Auth queries
  discovery: {
    warnWhenNoEntities: true,
    onMetadata: (meta) => {
      if (meta.className === 'User') meta.name = 'User';
      if (meta.className === 'Session') meta.name = 'Session';
      if (meta.className === 'Account') meta.name = 'Account';
      if (meta.className === 'Verification') meta.name = 'Verification';
    }
  },

  extensions: [Migrator],
    
  migrations: {
    path: './src/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    allOrNothing: true,
    snapshot: true,
    emit: 'ts',
  },

  debug: ['query', 'query-params'],
});

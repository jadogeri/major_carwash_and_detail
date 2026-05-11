import { MikroORM } from '@mikro-orm/libsql'; // Ensure this is from @mikro-orm/libsql
import config from './mikro-orm.config.js';

async function test() {
  try {
    const orm = await MikroORM.init(config);
    console.log("✅ MikroORM Initialized!");
    
    // Attempt a real operation
    const connection = orm.em.getConnection();
    await connection.execute('SELECT 1'); // Force a live round-trip to Turso
    
    console.log("🚀 Real connection verified with Turso!");

    await orm.close();
  } catch (error) {
    console.error("❌ Real connection failed:", error);
    process.exit(1);
  }
}
test();
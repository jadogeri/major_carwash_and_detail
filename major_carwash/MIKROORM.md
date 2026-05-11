# MIKROORM.md

This guide covers the database management workflow for the `@repo/database` package using **MikroORM v7** and **Turso**.

---

## 🛠 Command Usage

Run these commands from the **root** of the monorepo.

### 🔍 Debug Connection
Checks your configuration, entity discovery, and validates the connection to Turso.
```bash
npx turbo db:debug
```

### 📝 Create Migration
Compares your TypeScript entities to the current database schema and generates a new SQL migration file.
```bash
npx turbo db:create
```

### 🚀 Push Migrations
Applies all pending migration files to your remote Turso database.
```bash
npx turbo db:up
```

### ⏪ Undo Migration
Rolls back the very last migration that was executed.
```bash
npx turbo db:down
```

### 🧼 Fresh Install
Drops all existing tables and re-runs all migrations from the beginning. **Use with caution!**
```bash
npx turbo db:fresh
```

### ⚡ Schema Sync
Directly synchronizes the database schema with your entities without creating migration files. Recommended for rapid local development only.
```bash
npx turbo db:sync
```

---

## 💡 Quick Tips

*   **Authentication:** Ensure `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set in your root `.env`.
*   **Windows Fix:** All scripts are pre-configured with `cross-env` to ensure they work in Git Bash, CMD, and PowerShell.
*   **ESM Requirements:** Always import entities using the **.js** extension in your `mikro-orm.config.ts`:
    `import { User } from './entities/User.js';`

**Ready to start?** Confirm your connection is active by running:
```bash
npx turbo db:debug
```
---

## 📂 Git & Snapshots

When you generate a migration, MikroORM creates files in `packages/database/src/migrations`.

*   **Commit everything:** Always commit the `.ts` migration files AND the `.snapshot` JSON file.
*   **Why?** The snapshot allows MikroORM to detect future changes without needing a live connection to Turso.
# 🚀 Project Scripts & Commands

This monorepo uses **pnpm** and **Turborepo**. All commands below should be executed from the root of the project.

## 🛠 Database Management (MikroORM + Turso)
These scripts manage your schema and connectivity for the `@repo/database` package.


| Command | Action |
| :--- | :--- |
| `pnpm db:test` | Runs the connection test script to verify Turso reachability. |
| `pnpm db:debug` | Prints detailed MikroORM diagnostic and configuration info. |
| `pnpm db:push` | **Fast Sync:** Pushes current entity state directly to the database. |
| `pnpm db:sync` | Synchronizes the database schema with your TypeScript entities. |
| `pnpm db:create` | Creates a new migration file based on your schema changes. |
| `pnpm db:up` | Runs all pending migrations. |
| `pnpm db:down` | Undoes the last migration. |
| `pnpm db:fresh` | **Destructive:** Drops all tables and re-runs all migrations. |

## 💻 Development
Run the entire stack or pick specific applications to work on.

### Full Stack
Starts the API, Admin, and Web apps simultaneously:
```bash
pnpm dev
```

### Individual Apps
Use these to save system resources when focusing on one area:
```bash
pnpm api    # Starts only the NestJS API
pnpm admin  # Starts only the Vite Admin app
pnpm web    # Starts only the Next.js Web app
```

## 🏗 Build & Maintenance
Commands for production builds and code quality.


| Command | Action |
| :--- | :--- |
| `pnpm build` | Builds all apps and packages in the workspace. |
| `pnpm lint` | Runs ESLint across the entire monorepo. |
| `pnpm format` | Fixes code style issues using Prettier. |

### Targeted Build
Build a specific project using Turborepo filters:
```bash
turbo build --filter=api
```

---

### 💡 Quick Setup Note
If you are on Windows and haven't installed `cross-env` yet, run:
```bash
pnpm add -Dw cross-env --ignore-workspace-root-check
```

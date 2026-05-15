// packages/database/src/entities/session.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { User } from './user.entity.js';

@Entity({ tableName: 'sessions' })
export class Session {
  @PrimaryKey({ type: 'string' })
  id!: string;

  @Property({ type: 'string', unique: true })
  token!: string;

  @Property({ type: 'date', fieldName: 'expires_at' })
  expiresAt!: Date;

  @Property({ type: 'string', nullable: true, fieldName: 'ip_address' })
  ipAddress?: string;

  @Property({ type: 'string', nullable: true, fieldName: 'user_agent' })
  userAgent?: string;

  @Property({ type: 'date', fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ type: 'date', fieldName: 'updated_at' })
  updatedAt: Date = new Date();

  // Better Auth explicitly requires the foreign key column to be 'user_id' in the DB
  @ManyToOne(() => User as any, { fieldName: 'user_id', deleteRule: 'cascade' })
  user!: User;
}

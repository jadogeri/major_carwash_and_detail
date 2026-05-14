// packages/database/src/entities/session.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import type { UserEntity } from './user.entity.js';

@Entity({ tableName: 'sessions' })
export class SessionEntity {
  @PrimaryKey({ type: 'string' })
  id!: string;

  @Property({ type: 'string', unique: true })
  token!: string;

  @Property({ type: 'date' })
  expiresAt!: Date;

  @Property({ type: 'string', nullable: true })
  ipAddress?: string;

  @Property({ type: 'string', nullable: true })
  userAgent?: string;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date' })
  updatedAt: Date = new Date();

  @ManyToOne(() => 'UserEntity' as any, { fieldName: 'userId', deleteRule: 'cascade' })
  user!: UserEntity;
}

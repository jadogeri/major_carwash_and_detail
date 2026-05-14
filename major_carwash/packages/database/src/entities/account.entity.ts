// packages/database/src/entities/account.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import type { UserEntity } from './user.entity.js';

@Entity({ tableName: 'accounts' })
export class AccountEntity {
  @PrimaryKey({ type: 'string' })
  id!: string;

  @Property({ type: 'string' })
  accountId!: string;

  @Property({ type: 'string' })
  providerId!: string;

  @Property({ type: 'string', nullable: true })
  accessToken?: string;

  @Property({ type: 'string', nullable: true })
  refreshToken?: string;

  @Property({ type: 'date', nullable: true })
  accessTokenExpiresAt?: Date;

  @Property({ type: 'date', nullable: true })
  refreshTokenExpiresAt?: Date;

  @Property({ type: 'string', nullable: true })
  scope?: string;

  @Property({ type: 'string', nullable: true })
  idToken?: string;

  @Property({ type: 'string', nullable: true })
  password?: string;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date' })
  updatedAt: Date = new Date();

  @ManyToOne(() => 'UserEntity' as any, { fieldName: 'userId', deleteRule: 'cascade' })
  user!: UserEntity;
}

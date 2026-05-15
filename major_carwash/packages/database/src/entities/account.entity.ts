// packages/database/src/entities/account.entity.ts
import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { User } from './user.entity.js';

@Entity({ tableName: 'accounts' })
export class Account {
  @PrimaryKey({ type: 'string' })
  id!: string;

  @Property({ type: 'string', fieldName: 'account_id' })
  accountId!: string;

  @Property({ type: 'string', fieldName: 'provider_id' })
  providerId!: string;

  @Property({ type: 'string', nullable: true, fieldName: 'access_token' })
  accessToken?: string;

  @Property({ type: 'string', nullable: true, fieldName: 'refresh_token' })
  refreshToken?: string;

  @Property({ type: 'date', nullable: true, fieldName: 'access_token_expires_at' })
  accessTokenExpiresAt?: Date;

  @Property({ type: 'date', nullable: true, fieldName: 'refresh_token_expires_at' })
  refreshTokenExpiresAt?: Date;

  @Property({ type: 'string', nullable: true })
  scope?: string;

  @Property({ type: 'string', nullable: true, fieldName: 'id_token' })
  idToken?: string;

  @Property({ type: 'string', nullable: true })
  password?: string;

  @Property({ type: 'date', fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ type: 'date', fieldName: 'updated_at' })
  updatedAt: Date = new Date();

  // Better Auth explicitly requires the foreign key column to be 'user_id' in the DB
  @ManyToOne(() => User as any, { fieldName: 'user_id', deleteRule: 'cascade' })
  user!: User;
}

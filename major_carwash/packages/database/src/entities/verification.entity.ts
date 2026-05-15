// packages/database/src/entities/verification.entity.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

@Entity({ tableName: 'verifications' })
export class Verification {
  @PrimaryKey({ type: 'string' })
  id!: string;

  @Property({ type: 'string' })
  identifier!: string;

  @Property({ type: 'string' })
  value!: string;

  @Property({ type: 'date', fieldName: 'expires_at' })
  expiresAt!: Date;

  @Property({ type: 'date', fieldName: 'created_at' })
  createdAt: Date = new Date();

  @Property({ type: 'date', fieldName: 'updated_at' })
  updatedAt: Date = new Date();
}

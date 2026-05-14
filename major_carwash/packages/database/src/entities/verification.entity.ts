// packages/database/src/entities/verification.entity.ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

@Entity({ tableName: 'verifications' })
export class VerificationEntity {
  @PrimaryKey({ type: 'string' })
  id!: string;

  @Property({ type: 'string' })
  identifier!: string;

  @Property({ type: 'string' })
  value!: string;

  @Property({ type: 'date' })
  expiresAt!: Date;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date' })
  updatedAt: Date = new Date();
}

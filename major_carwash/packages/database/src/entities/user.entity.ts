import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

@Entity({ tableName: 'users' }) 
export class User {
  @PrimaryKey()
  id: number; // No ! and no declare

  @Property({ unique: true })
  email: string; // No ! and no declare

  @Property({ nullable: true })
  name?: string;

  @Property()
  createdAt: Date = new Date();
}

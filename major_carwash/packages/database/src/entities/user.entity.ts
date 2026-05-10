import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
@Entity({ tableName: 'users' }) 
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property({ nullable: true })
  name?: string;

  @Property()
  createdAt = new Date();
}

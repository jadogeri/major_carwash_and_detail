import { Migration } from '@mikro-orm/migrations';

export class Migration20260510134744 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table \`users\` (\`id\` integer not null primary key autoincrement, \`email\` text not null, \`name\` text null, \`created_at\` datetime not null);`);
    this.addSql(`create unique index \`users_email_unique\` on \`users\` (\`email\`);`);

    this.addSql(`drop table if exists \`user\`;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`create table \`user\` (\`email\` text not null, \`id\` integer not null primary key autoincrement, \`name\` text null);`);
    this.addSql(`create unique index \`user_email_unique\` on \`user\` (\`email\`);`);

    this.addSql(`drop table if exists \`users\`;`);
  }

}

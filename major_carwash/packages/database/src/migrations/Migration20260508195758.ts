import { Migration } from '@mikro-orm/migrations';

export class Migration20260508195758 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`email\` text not null, \`name\` text null);`);
    this.addSql(`create unique index \`user_email_unique\` on \`user\` (\`email\`);`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists \`user\`;`);
  }

}

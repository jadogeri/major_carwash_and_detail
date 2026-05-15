import { Migration } from '@mikro-orm/migrations';

export class Migration20260515031323 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`alter table \`users\` add column \`banned\` integer null default false;`);
    this.addSql(`alter table \`users\` add column \`ban_reason\` text null;`);
    this.addSql(`alter table \`users\` add column \`two_factor_enabled\` integer null default false;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`sessions__temp_alter\` (\`id\` text not null primary key, \`token\` text not null, \`expires_at\` date not null, \`ip_address\` text null, \`user_agent\` text null, \`created_at\` date not null, \`updated_at\` date not null, \`user_id\` text not null, constraint \`sessions_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on delete cascade);`);
    this.addSql(`insert into \`sessions__temp_alter\` select \`id\`, \`token\`, \`expires_at\`, \`ip_address\`, \`user_agent\`, \`created_at\`, \`updated_at\`, null as \`user_id\` from \`sessions\`;`);
    this.addSql(`drop table \`sessions\`;`);
    this.addSql(`alter table \`sessions__temp_alter\` rename to \`sessions\`;`);
    this.addSql(`create unique index \`sessions_token_unique\` on \`sessions\` (\`token\`);`);
    this.addSql(`create index \`sessions_user_id_index\` on \`sessions\` (\`user_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`accounts__temp_alter\` (\`id\` text not null primary key, \`account_id\` text not null, \`provider_id\` text not null, \`access_token\` text null, \`refresh_token\` text null, \`access_token_expires_at\` date null, \`refresh_token_expires_at\` date null, \`scope\` text null, \`id_token\` text null, \`password\` text null, \`created_at\` date not null, \`updated_at\` date not null, \`user_id\` text not null, constraint \`accounts_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on delete cascade);`);
    this.addSql(`insert into \`accounts__temp_alter\` select \`id\`, \`account_id\`, \`provider_id\`, \`access_token\`, \`refresh_token\`, \`access_token_expires_at\`, \`refresh_token_expires_at\`, \`scope\`, \`id_token\`, \`password\`, \`created_at\`, \`updated_at\`, null as \`user_id\` from \`accounts\`;`);
    this.addSql(`drop table \`accounts\`;`);
    this.addSql(`alter table \`accounts__temp_alter\` rename to \`accounts\`;`);
    this.addSql(`create index \`accounts_user_id_index\` on \`accounts\` (\`user_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`accounts__temp_alter\` (\`access_token\` text null, \`access_token_expires_at\` date null, \`account_id\` text not null, \`created_at\` date not null, \`id\` text not null primary key, \`id_token\` text null, \`password\` text null, \`provider_id\` text not null, \`refresh_token\` text null, \`refresh_token_expires_at\` date null, \`scope\` text null, \`updated_at\` date not null, \`userId\` text not null, constraint \`accounts_userId_foreign\` foreign key (\`userId\`) references \`users\` (\`id\`) on delete cascade);`);
    this.addSql(`insert into \`accounts__temp_alter\` select \`access_token\`, \`access_token_expires_at\`, \`account_id\`, \`created_at\`, \`id\`, \`id_token\`, \`password\`, \`provider_id\`, \`refresh_token\`, \`refresh_token_expires_at\`, \`scope\`, \`updated_at\`, null as \`userId\` from \`accounts\`;`);
    this.addSql(`drop table \`accounts\`;`);
    this.addSql(`alter table \`accounts__temp_alter\` rename to \`accounts\`;`);
    this.addSql(`create index \`accounts_userId_index\` on \`accounts\` (\`userId\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`sessions__temp_alter\` (\`created_at\` date not null, \`expires_at\` date not null, \`id\` text not null primary key, \`ip_address\` text null, \`token\` text not null, \`updated_at\` date not null, \`userId\` text not null, \`user_agent\` text null, constraint \`sessions_userId_foreign\` foreign key (\`userId\`) references \`users\` (\`id\`) on delete cascade);`);
    this.addSql(`insert into \`sessions__temp_alter\` select \`created_at\`, \`expires_at\`, \`id\`, \`ip_address\`, \`token\`, \`updated_at\`, null as \`userId\`, \`user_agent\` from \`sessions\`;`);
    this.addSql(`drop table \`sessions\`;`);
    this.addSql(`alter table \`sessions__temp_alter\` rename to \`sessions\`;`);
    this.addSql(`create unique index \`sessions_token_unique\` on \`sessions\` (\`token\`);`);
    this.addSql(`create index \`sessions_userId_index\` on \`sessions\` (\`userId\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`alter table \`users\` drop column \`banned\`;`);
    this.addSql(`alter table \`users\` drop column \`ban_reason\`;`);
    this.addSql(`alter table \`users\` drop column \`two_factor_enabled\`;`);
  }

}

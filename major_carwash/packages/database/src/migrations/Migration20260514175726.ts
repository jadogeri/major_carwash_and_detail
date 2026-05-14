import { Migration } from '@mikro-orm/migrations';

export class Migration20260514175726 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table \`sessions\` (\`id\` text not null primary key, \`token\` text not null, \`expires_at\` date not null, \`ip_address\` text null, \`user_agent\` text null, \`created_at\` date not null, \`updated_at\` date not null, \`userId\` text not null, constraint \`sessions_userId_foreign\` foreign key (\`userId\`) references \`users\` (\`id\`) on delete cascade);`);
    this.addSql(`create unique index \`sessions_token_unique\` on \`sessions\` (\`token\`);`);
    this.addSql(`create index \`sessions_userId_index\` on \`sessions\` (\`userId\`);`);

    this.addSql(`create table \`accounts\` (\`id\` text not null primary key, \`account_id\` text not null, \`provider_id\` text not null, \`access_token\` text null, \`refresh_token\` text null, \`access_token_expires_at\` date null, \`refresh_token_expires_at\` date null, \`scope\` text null, \`id_token\` text null, \`password\` text null, \`created_at\` date not null, \`updated_at\` date not null, \`userId\` text not null, constraint \`accounts_userId_foreign\` foreign key (\`userId\`) references \`users\` (\`id\`) on delete cascade);`);
    this.addSql(`create index \`accounts_userId_index\` on \`accounts\` (\`userId\`);`);

    this.addSql(`create table \`verifications\` (\`id\` text not null primary key, \`identifier\` text not null, \`value\` text not null, \`expires_at\` date not null, \`created_at\` date not null, \`updated_at\` date not null);`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`users__temp_alter\` (\`id\` text not null primary key, \`email\` text not null, \`name\` text not null, \`email_verified\` integer not null default false, \`image\` text null, \`created_at\` date not null, \`updated_at\` date not null, \`role\` text not null default 'user');`);
    this.addSql(`insert into \`users__temp_alter\` select \`id\`, \`email\`, \`name\`, null as \`email_verified\`, null as \`image\`, \`created_at\`, null as \`updated_at\`, null as \`role\` from \`users\`;`);
    this.addSql(`drop table \`users\`;`);
    this.addSql(`alter table \`users__temp_alter\` rename to \`users\`;`);
    this.addSql(`create unique index \`users_email_unique\` on \`users\` (\`email\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`bookings__temp_alter\` (\`id\` integer not null primary key autoincrement, \`booking_date\` date not null, \`user_id\` text not null, \`location_id\` integer not null, \`slot_id\` integer null, constraint \`bookings_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`), constraint \`bookings_location_id_foreign\` foreign key (\`location_id\`) references \`locations\` (\`id\`), constraint \`bookings_slot_id_foreign\` foreign key (\`slot_id\`) references \`schedules\` (\`id\`) on delete set null);`);
    this.addSql(`insert into \`bookings__temp_alter\` select \`id\`, \`booking_date\`, \`user_id\`, \`location_id\`, \`slot_id\` from \`bookings\`;`);
    this.addSql(`drop table \`bookings\`;`);
    this.addSql(`alter table \`bookings__temp_alter\` rename to \`bookings\`;`);
    this.addSql(`create index \`bookings_user_id_index\` on \`bookings\` (\`user_id\`);`);
    this.addSql(`create index \`bookings_location_id_index\` on \`bookings\` (\`location_id\`);`);
    this.addSql(`create index \`bookings_slot_id_index\` on \`bookings\` (\`slot_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`drop index \`bookings_services_booking_id_index\`;`);
    this.addSql(`drop index \`bookings_services_service_id_index\`;`);
    this.addSql(`drop index \`primary\`;`);
    this.addSql(`alter table \`bookings_services\` drop column \`booking_id\`;`);
    this.addSql(`alter table \`bookings_services\` drop column \`service_id\`;`);
    this.addSql(`alter table \`bookings_services\` add column \`booking_entity_id\` integer not null constraint \`bookings_services_booking_entity_id_foreign\` references \`bookings\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`bookings_services\` add column \`service_entity_id\` integer not null constraint \`bookings_services_service_entity_id_foreign\` references \`services\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`create index \`bookings_services_booking_entity_id_index\` on \`bookings_services\` (\`booking_entity_id\`);`);
    this.addSql(`create index \`bookings_services_service_entity_id_index\` on \`bookings_services\` (\`service_entity_id\`);`);
    this.addSql(`alter table \`bookings_services\` add primary key (\`booking_entity_id\`, \`service_entity_id\`);`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`vehicles__temp_alter\` (\`id\` integer not null primary key autoincrement, \`make\` text not null, \`model\` text not null, \`owner_id\` text not null, constraint \`vehicles_owner_id_foreign\` foreign key (\`owner_id\`) references \`users\` (\`id\`));`);
    this.addSql(`insert into \`vehicles__temp_alter\` select \`id\`, \`make\`, \`model\`, \`owner_id\` from \`vehicles\`;`);
    this.addSql(`drop table \`vehicles\`;`);
    this.addSql(`alter table \`vehicles__temp_alter\` rename to \`vehicles\`;`);
    this.addSql(`create index \`vehicles_owner_id_index\` on \`vehicles\` (\`owner_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`drop index \`bookings_vehicles_booking_id_index\`;`);
    this.addSql(`drop index \`bookings_vehicles_vehicle_id_index\`;`);
    this.addSql(`drop index \`primary\`;`);
    this.addSql(`alter table \`bookings_vehicles\` drop column \`booking_id\`;`);
    this.addSql(`alter table \`bookings_vehicles\` drop column \`vehicle_id\`;`);
    this.addSql(`alter table \`bookings_vehicles\` add column \`booking_entity_id\` integer not null constraint \`bookings_vehicles_booking_entity_id_foreign\` references \`bookings\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`bookings_vehicles\` add column \`vehicle_entity_id\` integer not null constraint \`bookings_vehicles_vehicle_entity_id_foreign\` references \`vehicles\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`create index \`bookings_vehicles_booking_entity_id_index\` on \`bookings_vehicles\` (\`booking_entity_id\`);`);
    this.addSql(`create index \`bookings_vehicles_vehicle_entity_id_index\` on \`bookings_vehicles\` (\`vehicle_entity_id\`);`);
    this.addSql(`alter table \`bookings_vehicles\` add primary key (\`booking_entity_id\`, \`vehicle_entity_id\`);`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists \`sessions\`;`);
    this.addSql(`drop table if exists \`accounts\`;`);
    this.addSql(`drop table if exists \`verifications\`;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`bookings__temp_alter\` (\`booking_date\` date not null, \`id\` integer not null primary key autoincrement, \`location_id\` integer not null, \`slot_id\` integer null, \`user_id\` integer not null, constraint \`bookings_location_id_foreign\` foreign key (\`location_id\`) references \`locations\` (\`id\`), constraint \`bookings_slot_id_foreign\` foreign key (\`slot_id\`) references \`schedules\` (\`id\`) on delete set null, constraint \`bookings_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`));`);
    this.addSql(`insert into \`bookings__temp_alter\` select \`booking_date\`, \`id\`, \`location_id\`, \`slot_id\`, \`user_id\` from \`bookings\`;`);
    this.addSql(`drop table \`bookings\`;`);
    this.addSql(`alter table \`bookings__temp_alter\` rename to \`bookings\`;`);
    this.addSql(`create index \`bookings_location_id_index\` on \`bookings\` (\`location_id\`);`);
    this.addSql(`create index \`bookings_slot_id_index\` on \`bookings\` (\`slot_id\`);`);
    this.addSql(`create index \`bookings_user_id_index\` on \`bookings\` (\`user_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`drop index \`bookings_services_booking_entity_id_index\`;`);
    this.addSql(`drop index \`bookings_services_service_entity_id_index\`;`);
    this.addSql(`drop index \`primary\`;`);
    this.addSql(`alter table \`bookings_services\` drop column \`booking_entity_id\`;`);
    this.addSql(`alter table \`bookings_services\` drop column \`service_entity_id\`;`);
    this.addSql(`alter table \`bookings_services\` add column \`booking_id\` integer not null primary key constraint \`bookings_services_booking_id_foreign\` references \`bookings\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`bookings_services\` add column \`service_id\` integer not null primary key constraint \`bookings_services_service_id_foreign\` references \`services\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`create index \`bookings_services_booking_id_index\` on \`bookings_services\` (\`booking_id\`);`);
    this.addSql(`create index \`bookings_services_service_id_index\` on \`bookings_services\` (\`service_id\`);`);
    this.addSql(`alter table \`bookings_services\` add primary key (\`booking_id\`, \`service_id\`);`);

    this.addSql(`drop index \`bookings_vehicles_booking_entity_id_index\`;`);
    this.addSql(`drop index \`bookings_vehicles_vehicle_entity_id_index\`;`);
    this.addSql(`drop index \`primary\`;`);
    this.addSql(`alter table \`bookings_vehicles\` drop column \`booking_entity_id\`;`);
    this.addSql(`alter table \`bookings_vehicles\` drop column \`vehicle_entity_id\`;`);
    this.addSql(`alter table \`bookings_vehicles\` add column \`booking_id\` integer not null primary key constraint \`bookings_vehicles_booking_id_foreign\` references \`bookings\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`bookings_vehicles\` add column \`vehicle_id\` integer not null primary key constraint \`bookings_vehicles_vehicle_id_foreign\` references \`vehicles\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`create index \`bookings_vehicles_booking_id_index\` on \`bookings_vehicles\` (\`booking_id\`);`);
    this.addSql(`create index \`bookings_vehicles_vehicle_id_index\` on \`bookings_vehicles\` (\`vehicle_id\`);`);
    this.addSql(`alter table \`bookings_vehicles\` add primary key (\`booking_id\`, \`vehicle_id\`);`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`users__temp_alter\` (\`created_at\` date not null, \`email\` text not null, \`id\` integer not null primary key autoincrement, \`name\` text null);`);
    this.addSql(`insert into \`users__temp_alter\` select \`created_at\`, \`email\`, \`id\`, \`name\` from \`users\`;`);
    this.addSql(`drop table \`users\`;`);
    this.addSql(`alter table \`users__temp_alter\` rename to \`users\`;`);
    this.addSql(`create unique index \`users_email_unique\` on \`users\` (\`email\`);`);
    this.addSql(`pragma foreign_keys = on;`);

    this.addSql(`pragma foreign_keys = off;`);
    this.addSql(`create table \`vehicles__temp_alter\` (\`id\` integer not null primary key autoincrement, \`make\` text not null, \`model\` text not null, \`owner_id\` integer not null, constraint \`vehicles_owner_id_foreign\` foreign key (\`owner_id\`) references \`users\` (\`id\`));`);
    this.addSql(`insert into \`vehicles__temp_alter\` select \`id\`, \`make\`, \`model\`, \`owner_id\` from \`vehicles\`;`);
    this.addSql(`drop table \`vehicles\`;`);
    this.addSql(`alter table \`vehicles__temp_alter\` rename to \`vehicles\`;`);
    this.addSql(`create index \`vehicles_owner_id_index\` on \`vehicles\` (\`owner_id\`);`);
    this.addSql(`pragma foreign_keys = on;`);
  }

}

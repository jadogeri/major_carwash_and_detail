import { Migration } from '@mikro-orm/migrations';

export class Migration20260511193947 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table \`locations\` (\`id\` integer not null primary key autoincrement, \`name\` text not null, \`address\` text not null);`);

    this.addSql(`create table \`schedules\` (\`id\` integer not null primary key autoincrement, \`start_time\` date not null, \`end_time\` date not null, \`location_id\` integer not null, constraint \`schedules_location_id_foreign\` foreign key (\`location_id\`) references \`locations\` (\`id\`));`);
    this.addSql(`create index \`schedules_location_id_index\` on \`schedules\` (\`location_id\`);`);

    this.addSql(`create table \`services\` (\`id\` integer not null primary key autoincrement, \`name\` text not null, \`price\` integer not null);`);

    this.addSql(`create table \`users\` (\`id\` integer not null primary key autoincrement, \`email\` text not null, \`name\` text null, \`created_at\` date not null);`);
    this.addSql(`create unique index \`users_email_unique\` on \`users\` (\`email\`);`);

    this.addSql(`create table \`bookings\` (\`id\` integer not null primary key autoincrement, \`booking_date\` date not null, \`user_id\` integer not null, \`location_id\` integer not null, \`slot_id\` integer null, constraint \`bookings_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`), constraint \`bookings_location_id_foreign\` foreign key (\`location_id\`) references \`locations\` (\`id\`), constraint \`bookings_slot_id_foreign\` foreign key (\`slot_id\`) references \`schedules\` (\`id\`) on delete set null);`);
    this.addSql(`create index \`bookings_user_id_index\` on \`bookings\` (\`user_id\`);`);
    this.addSql(`create index \`bookings_location_id_index\` on \`bookings\` (\`location_id\`);`);
    this.addSql(`create index \`bookings_slot_id_index\` on \`bookings\` (\`slot_id\`);`);

    this.addSql(`create table \`bookings_services\` (\`booking_id\` integer not null, \`service_id\` integer not null, primary key (\`booking_id\`, \`service_id\`), constraint \`bookings_services_booking_id_foreign\` foreign key (\`booking_id\`) references \`bookings\` (\`id\`) on update cascade on delete cascade, constraint \`bookings_services_service_id_foreign\` foreign key (\`service_id\`) references \`services\` (\`id\`) on update cascade on delete cascade);`);
    this.addSql(`create index \`bookings_services_booking_id_index\` on \`bookings_services\` (\`booking_id\`);`);
    this.addSql(`create index \`bookings_services_service_id_index\` on \`bookings_services\` (\`service_id\`);`);

    this.addSql(`create table \`vehicles\` (\`id\` integer not null primary key autoincrement, \`make\` text not null, \`model\` text not null, \`owner_id\` integer not null, constraint \`vehicles_owner_id_foreign\` foreign key (\`owner_id\`) references \`users\` (\`id\`));`);
    this.addSql(`create index \`vehicles_owner_id_index\` on \`vehicles\` (\`owner_id\`);`);

    this.addSql(`create table \`bookings_vehicles\` (\`booking_id\` integer not null, \`vehicle_id\` integer not null, primary key (\`booking_id\`, \`vehicle_id\`), constraint \`bookings_vehicles_booking_id_foreign\` foreign key (\`booking_id\`) references \`bookings\` (\`id\`) on update cascade on delete cascade, constraint \`bookings_vehicles_vehicle_id_foreign\` foreign key (\`vehicle_id\`) references \`vehicles\` (\`id\`) on update cascade on delete cascade);`);
    this.addSql(`create index \`bookings_vehicles_booking_id_index\` on \`bookings_vehicles\` (\`booking_id\`);`);
    this.addSql(`create index \`bookings_vehicles_vehicle_id_index\` on \`bookings_vehicles\` (\`vehicle_id\`);`);
  }

  override down(): void | Promise<void> {

    this.addSql(`drop table if exists \`locations\`;`);
    this.addSql(`drop table if exists \`schedules\`;`);
    this.addSql(`drop table if exists \`services\`;`);
    this.addSql(`drop table if exists \`users\`;`);
    this.addSql(`drop table if exists \`bookings\`;`);
    this.addSql(`drop table if exists \`bookings_services\`;`);
    this.addSql(`drop table if exists \`vehicles\`;`);
    this.addSql(`drop table if exists \`bookings_vehicles\`;`);
  }

}

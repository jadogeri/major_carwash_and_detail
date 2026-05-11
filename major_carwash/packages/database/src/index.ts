import 'reflect-metadata';

export * from './entities/user.entity.js';
export * from './entities/vehicle.entity.js';
export * from './entities/booking.entity.js';
export * from './entities/location.entity.js';
export * from './entities/service.entity.js';
export * from './entities/schedule.entity.js';// ... rest of your exports
export { default as microOrmConfig } from './mikro-orm.config.js';
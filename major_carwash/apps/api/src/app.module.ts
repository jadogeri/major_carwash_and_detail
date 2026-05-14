import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BookingModule } from './modules/booking/booking.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { LocationModule } from './modules/location/location.module';
import { ServiceModule } from './modules/service/service.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
// 1. Remove MikroOrmModule and microOrmConfig imports here
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // 2. ONLY import InfrastructureModule. 
    // It already contains DatabaseModule which calls forRoot().
    InfrastructureModule, 
    
    UserModule, 
    BookingModule, 
    VehicleModule, 
    LocationModule, 
    ServiceModule, 
    ScheduleModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

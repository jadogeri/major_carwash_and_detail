import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { LocationModule } from './location/location.module';
import { ServiceModule } from './service/service.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [UserModule, BookingModule, VehicleModule, LocationModule, ServiceModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

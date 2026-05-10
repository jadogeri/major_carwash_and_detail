import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { BookingModule } from './booking/booking.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [UserModule, OrderModule, BookingModule, VehicleModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

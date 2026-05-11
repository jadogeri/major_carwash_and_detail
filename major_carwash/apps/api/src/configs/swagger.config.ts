import { DocumentBuilder } from '@nestjs/swagger';
import dotenv from 'dotenv';

dotenv.config();

const REFRESH_TOKEN_COOKIE_NAME = process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Major Carwash API')
  .setDescription('Comprehensive API for managing carwash services, bookings, and fleet operations.')
  .setVersion('1.0')
  .setLicense('MIT', 'https://opensource.org/licenses/MIT')
  .setContact('Carwash Support', 'https://majorcarwash.com', 'support@majorcarwash.com')
  .setTermsOfService('https://majorcarwash.com')
  .setExternalDoc('Technical Documentation', 'https://majorcarwash.com')
  .addServer('http://localhost:3000/api', "Local development server")
  .addServer('https://majorcarwash.com', "Production server")
  // Resource Tags
  .addTag('User', 'User accounts and profile management')
  .addTag('Auth', 'Authentication and authorization')
  .addTag('Booking', 'Scheduling and managing wash appointments')
  .addTag('Service', 'Carwash service types and pricing')
  .addTag('Vehicle', 'Customer vehicle management and details')
  .addTag('Location', 'Branch locations and service areas')
  .addTag('Schedule', 'Availability and time slot management')
  // Security definitions (Uncomment if needed)
  .addBearerAuth()
  .addCookieAuth('refresh-token', {
    type: 'apiKey',
    in: 'cookie',
    name: REFRESH_TOKEN_COOKIE_NAME,
  })
  .build();

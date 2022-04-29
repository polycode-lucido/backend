import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SesModule } from '@nextnm/nestjs-ses';
import { EmailService } from './email.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SesModule.forRoot({
      SECRET: process.env['AWS_SECRET'],
      REGION: process.env['AWS_REGION'],
      AKI_KEY: process.env['AWS_AKI'],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

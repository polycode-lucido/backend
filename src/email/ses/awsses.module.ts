import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SesModule } from '@nextnm/nestjs-ses';
import { AWSSesService } from './awsses.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SesModule.forRoot({
      SECRET: process.env['AWS_SECRET'],
      REGION: process.env['AWS_REGION'],
      AKI_KEY: process.env['AWS_AKI'],
    }),
  ],
  exports: [AWSSesService],
  providers: [AWSSesService],
})
export class AWSSesModule {}

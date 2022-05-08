import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SesModule } from '@nextnm/nestjs-ses';
import { AWSSesService } from './awsses.service';

export interface AWSSesOptions {
  secret: string;
  region: string;
  accessKeyId: string;
}

@Module({})
export class AWSSesModule {
  static forRoot(): DynamicModule {
    const awsSecret = process.env['EMAIL_SES_SECRET'];
    const awsRegion = process.env['EMAIL_SES_REGION'];
    const awsId = process.env['EMAIL_SES_AKI'];

    return {
      imports: [
        ConfigModule.forRoot(),
        SesModule.forRoot({
          SECRET: awsSecret,
          REGION: awsRegion,
          AKI_KEY: awsId,
        }),
      ],
      exports: [AWSSesService],
      providers: [AWSSesService],
      module: AWSSesModule,
    };
  }
}

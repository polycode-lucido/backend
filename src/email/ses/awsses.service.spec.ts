import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SesModule } from '@nextnm/nestjs-ses';
import { AWSSesService } from './awsses.service';

describe('SesService', () => {
  let service: AWSSesService;

  beforeEach(async () => {
    const awsSecret = process.env['EMAIL_SES_SECRET'] || 'secret';
    const awsRegion = process.env['EMAIL_SES_REGION'] || 'region';
    const awsId = process.env['EMAIL_SES_AKI'] || 'aki';

    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    service = module.get<AWSSesService>(AWSSesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { ConfigModule } from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { AWSSesModule } from 'src/email/ses/awsses.module';
import { AWSSesService } from 'src/email/ses/awsses.service';
import { InvalidArgumentError } from 'src/errors';
import { EmailProviderType, EMAIL_PROVIDER_SERVICE } from './email.model';
import { EmailService } from './email.service';
import { registerer, validationSchema } from './ses/awsses.config';

@Module({})
export class EmailModule {
  static forRoot(options: { emailProvider: EmailProviderType }): DynamicModule {
    const emailProvider = process.env['EMAIL_PROVIDER'];
    if (!emailProvider || emailProvider !== EmailProviderType.SES) {
      throw new InvalidArgumentError(
        'EMAIL_PROVIDER is not defined or invalid ( must be SES )',
      );
    }

    switch (options.emailProvider) {
      case EmailProviderType.SES:
        return {
          imports: [
            ConfigModule.forRoot({ load: [registerer], validationSchema }),
            AWSSesModule.forRoot(),
          ],
          providers: [
            EmailService,
            {
              provide: EMAIL_PROVIDER_SERVICE,
              useExisting: AWSSesService,
            },
          ],
          module: EmailModule,
          exports: [EmailService],
        };
    }
  }
}

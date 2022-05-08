import { FakeEmailService } from './fake-email/fake-email.service';
import { ConfigModule } from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { AWSSesModule } from 'src/email/ses/awsses.module';
import { AWSSesService } from 'src/email/ses/awsses.service';
import { InvalidArgumentError } from 'src/errors';
import { EmailProviderType, EMAIL_PROVIDER_SERVICE } from './email.model';
import { EmailService } from './email.service';
import { registerer, validationSchema } from './ses/awsses.config';
import { FakeEmailModule } from './fake-email/fake-email.module';

@Module({})
export class EmailModule {
  static forRoot(): DynamicModule {
    const emailProvider = process.env['EMAIL_PROVIDER'];
    if (
      !emailProvider ||
      (emailProvider !== EmailProviderType.SES &&
        emailProvider !== EmailProviderType.FAKE)
    ) {
      throw new InvalidArgumentError(
        'EMAIL_PROVIDER is not defined or invalid ( must be SES or fake )',
      );
    }

    switch (emailProvider) {
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
      case EmailProviderType.FAKE:
        return {
          imports: [FakeEmailModule],
          providers: [
            EmailService,
            {
              provide: EMAIL_PROVIDER_SERVICE,
              useExisting: FakeEmailService,
            },
          ],
          module: EmailModule,
          exports: [EmailService],
        };
    }
  }
}

import { DynamicModule, Module } from '@nestjs/common';
import { AWSSesModule } from 'src/email/ses/awsses.module';
import { AWSSesService } from 'src/email/ses/awsses.service';
import { EmailService } from './email.service';

export enum EmailProviderType {
  SES = 'SES',
}
export interface EmailProvider {
  sendMail(to: string, subject: string, text: string);
}

@Module({})
export class EmailModule {
  static forRoot(options: { emailProvider: EmailProviderType }): DynamicModule {
    switch (options.emailProvider) {
      case EmailProviderType.SES:
        return {
          imports: [AWSSesModule],
          providers: [
            EmailService,
            {
              provide: 'EmailProviderService',
              useExisting: AWSSesService,
            },
          ],
          module: EmailModule,
          exports: [EmailService],
        };
    }
  }
}

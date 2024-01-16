import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { EmailUtils } from './email.utils';
import { Queue } from 'bullmq';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  emailFrom = this.configService.get<string>('EMAIL_FROM');
  emailTo = this.configService.get<string>('EMAIL_TO');

  constructor(
    private readonly configService: ConfigService,
    private readonly emailUtils: EmailUtils,
    @InjectQueue('emailQueue') private readonly emailQueue: Queue,
  ) {}

  async sendEmail(name: string, message: string, emailTo: string) {
    try {
      const emailData = await this.emailUtils.createEmail(
        this.emailFrom,
        emailTo,
        name,
        message,
      );
      await this.emailQueue.add('@email', emailData);

      return {
        message: 'O email foi adicionado à fila com sucesso.',
      };
    } catch {
      console.log('Não foi possível adicionar email na fila');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { EmailService } from './emailservice.abstract.';

@Injectable()
export class EmailSenderService implements EmailService {
  private readonly transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_FROM'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
      secure: true,
    });
  }

  async sendMail(data: any) {
    const info = await this.transporter.sendMail(data);
    return info.response;
  }
}

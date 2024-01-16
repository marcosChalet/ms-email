import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';

type BodyType = {
  name: string;
  emailTo: string;
  message: string;
};

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('ok')
  getOk() {
    return 'ok';
  }

  @Post('send')
  sendEmail(@Body() { name, emailTo, message }: BodyType) {
    // console.log('body', name, emailTo, message);
    return this.emailService.sendEmail(name, message, emailTo);
  }
}

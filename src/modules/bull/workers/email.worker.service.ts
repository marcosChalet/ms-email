import { Job } from 'bullmq';
import { Injectable, Logger } from '@nestjs/common';
// import { EmailService } from './email.service.interface';
import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { EmailSenderService } from './email.sender.service';

@Injectable()
@Processor('emailQueue')
export class EmailWorkerService {
  private readonly logger = new Logger(EmailWorkerService.name);

  constructor(private readonly emailService: EmailSenderService) {}

  @Process('@email')
  async sendEmailJob(job: { data: any }): Promise<void> {
    this.logger.debug('Enviando email...');
    const emailResponse = await this.emailService.sendMail(job.data);
    this.logger.debug(emailResponse);
    return emailResponse;
  }

  @OnQueueError()
  onError(job: Job) {
    this.logger.error(`Erro na fila ${job.name}`, job.isFailed);
  }
}

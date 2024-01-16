import { Module } from '@nestjs/common';
import { EmailWorkerService } from './workers/email.worker.service';
import { bullQueueConfig } from './bull.queue.config';
import { EmailSenderService } from './workers/email.sender.service';
import { EmailService } from './workers/emailservice.abstract.';

@Module({
  imports: [...bullQueueConfig],
  providers: [
    EmailWorkerService,
    EmailSenderService,
    {
      provide: EmailService,
      useClass: EmailSenderService,
    },
  ],
  exports: [EmailWorkerService, EmailService],
})
export class BullQueueModule {}

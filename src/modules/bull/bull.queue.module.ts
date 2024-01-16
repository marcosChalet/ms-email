import { Module } from '@nestjs/common';
import { EmailWorkerService } from './workers/email.worker.service';
import { bullQueueConfig } from './bull.queue.config';
import { EmailSenderService } from './workers/email.sender.service';

@Module({
  imports: [...bullQueueConfig],
  providers: [EmailWorkerService, EmailSenderService],
  exports: [EmailWorkerService],
})
export class BullQueueModule {}

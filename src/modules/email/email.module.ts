import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EmailUtils } from './email.utils';
import { BullQueueModule } from '../bull/bull.queue.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullQueueModule,
    BullModule.registerQueue({
      name: 'emailQueue',
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService, EmailUtils],
})
export class EmailModule {}

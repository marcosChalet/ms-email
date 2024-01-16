import { BullQueueModule } from './bull/bull.queue.module';
import { EmailModule } from './email/email.module';

export const featureModules = [EmailModule, BullQueueModule];

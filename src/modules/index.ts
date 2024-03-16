import { BullQueueModule } from './bull/bull.queue.module';
import { EmailModule } from './email/email.module';
import { RabbitMQModule } from './rabbitMQ/rabbitMQ.module';

export const featureModules = [EmailModule, BullQueueModule, RabbitMQModule];

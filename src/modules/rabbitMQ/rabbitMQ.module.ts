import { Global, Module } from '@nestjs/common';
import { rabbitMQController } from './rabbitMQ.controller';
import { EmailModule } from '../email/email.module';

@Global()
@Module({
  imports: [EmailModule],
  controllers: [rabbitMQController],
})
export class RabbitMQModule {}

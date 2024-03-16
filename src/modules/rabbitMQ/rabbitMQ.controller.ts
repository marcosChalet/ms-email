import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { EmailService } from '../email/email.service';

@Controller()
export class rabbitMQController {
  private readonly logger;

  constructor(private readonly emailService: EmailService) {
    this.logger = new Logger(rabbitMQController.name);
  }

  @MessagePattern('orders_created')
  async recivingOrder(@Payload() data, @Ctx() context: RmqContext) {
    try {
      this.logger.log(`data: ${JSON.stringify(data)}`);

      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();

      this.emailService.sendEmail(
        'Marcos',
        'Seu pedido foi efetuado com sucesso! Aguarde o processamento do pagamento.',
        'chaletmarcos@gmail.com',
      );

      channel.ack(originalMsg);
      return data;
    } catch (error) {
      this.logger.log(`Error > showCat error: ${error}`);
    }
  }
}

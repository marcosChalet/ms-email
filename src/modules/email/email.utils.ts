import { Injectable, Logger } from '@nestjs/common';
import { promisify } from 'util';
import { readFile } from 'fs';
import { render } from 'mustache';

const readFileAsync = promisify(readFile);

@Injectable()
export class EmailUtils {
  private template: string;
  private readonly logger = new Logger(EmailUtils.name);

  constructor() {
    this.loadTemplate();
  }

  private async loadTemplate(): Promise<void> {
    try {
      this.template = await readFileAsync(
        'src/modules/email/templates/order-confirmed.html',
        'utf8',
      );
      this.logger.debug('Template carregado com sucesso.');
    } catch (error) {
      this.logger.error(`Erro ao carregar o template: ${error.message}`);
      throw new Error('Não foi possível carregar o template de e-mail.');
    }
  }

  async createEmail(
    from: string,
    to: string,
    name: string,
    message: string,
  ): Promise<any> {
    if (!this.template) {
      throw new Error('O template não foi carregado corretamente.');
    }

    const html = render(this.template, {
      name,
      message,
      emailRemetente: from,
    });

    return {
      from,
      to,
      subject: 'Confirmação do pedido | Chalet Shoes',
      text: `${message} | Sent by ${from}`,
      html,
    };
  }
}

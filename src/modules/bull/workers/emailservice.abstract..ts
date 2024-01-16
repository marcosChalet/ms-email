export abstract class EmailService {
  abstract sendMail(data: any): Promise<any>;
}

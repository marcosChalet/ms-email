export interface EmailService {
  sendMail(data: any): Promise<any>;
}

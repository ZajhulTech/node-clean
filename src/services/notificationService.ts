export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

class EmailService {
  sendEmail(payload: EmailPayload) {
    // Simulación de envío de email
    console.log('--- Enviando email ---');
    console.log(`Para: ${payload.to}`);
    console.log(`Asunto: ${payload.subject}`);
    console.log(`Cuerpo: ${payload.body}`);
    console.log('--- Email enviado (demo) ---');
  }
}

export default new EmailService();
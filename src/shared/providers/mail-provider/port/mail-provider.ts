interface MailParams {
  to: string;
  subject: string;
  templatePath: string;
  templateVars: { [key: string]: string | number };
}

interface MailProvider {
  sendMail(params: MailParams): Promise<void>;
}

export { MailParams };
export default MailProvider;

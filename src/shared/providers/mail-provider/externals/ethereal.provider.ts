import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import MailProvider, { MailParams } from "../port/mail-provider";

class EtherealMailProvider implements MailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.log(err));
  }

  async sendMail({ to, subject, templatePath, templateVars }: MailParams): Promise<void> {
    const templateFileContent = fs.readFileSync(templatePath).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(templateVars);

    const message = await this.client.sendMail({
      to,
      from: `Rentalx <${process.env.APP_EMAIL}>`,
      subject,
      html: templateHTML,
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export default EtherealMailProvider;

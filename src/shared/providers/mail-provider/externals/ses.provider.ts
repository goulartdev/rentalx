import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import env from "@config/env";

import MailProvider, { MailParams } from "../port/mail-provider";

class SESMailProvider implements MailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: env.aws.ses.apiVersion,
        region: env.aws.region,
      }),
    });
  }

  async sendMail({ to, subject, templatePath, templateVars }: MailParams): Promise<void> {
    const templateFileContent = fs.readFileSync(templatePath).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(templateVars);

    await this.client.sendMail({
      to,
      from: `Rentalx <${env.app.email}>`,
      subject,
      html: templateHTML,
    });
  }
}

export default SESMailProvider;

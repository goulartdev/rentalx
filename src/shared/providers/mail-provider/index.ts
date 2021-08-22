import env from "@config/env";

import EtherealMailProvider from "./externals/ethereal.provider";
import SESMailProvider from "./externals/ses.provider";
import MailProvider from "./port/mail-provider";

const storage = env.provider.mail;

type optionsType = {
  // eslint-disable-next-line prettier/prettier
  [key: string]: { new(): MailProvider };
};

const options: optionsType = {
  ethereal: EtherealMailProvider,
  ses: SESMailProvider,
};

const instance = new options[storage]();

const getMailProvider = (): MailProvider => {
  return instance;
};

export default getMailProvider;

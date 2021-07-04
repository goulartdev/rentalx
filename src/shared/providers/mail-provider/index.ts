import EtherealMailProvider from "./externals/ethereal.provider";
import MailProvider from "./port/mail-provider";

const instance = new EtherealMailProvider();

const getMailProvider = (): MailProvider => {
  return instance;
};

export default getMailProvider;

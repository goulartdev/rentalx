import { container } from "tsyringe";

import getDateProvider from "./date-provider";
import DateProvider from "./date-provider/port/DateProvider";
import getMailProvider from "./mail-provider";
import MailProvider from "./mail-provider/port/mail-provider";

container.registerInstance<DateProvider>("DateProvider", getDateProvider());
container.registerInstance<MailProvider>("MailProvider", getMailProvider());

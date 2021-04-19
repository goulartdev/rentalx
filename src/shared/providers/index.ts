import { container } from "tsyringe";

import getDateProvider from "./date-provider";
import DateProvider from "./date-provider/port/DateProvider";

container.registerInstance<DateProvider>("DateProvider", getDateProvider());

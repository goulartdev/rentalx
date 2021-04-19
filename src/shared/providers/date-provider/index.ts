import DayJSDateProvider from "./externals/dayjs.provider";
import DateProvider from "./port/DateProvider";

const instance = new DayJSDateProvider();

const getDateProvider = (): DateProvider => {
  return instance;
};

export default getDateProvider;

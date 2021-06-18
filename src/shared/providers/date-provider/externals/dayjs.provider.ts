import dayjs from "dayjs";

import DateProvider from "../port/DateProvider";

class DayJSDateProvider implements DateProvider {
  diffInHours(date1: Date, date2: Date): number {
    return dayjs(date1).diff(date2, "hours");
  }

  diffInDays(date1: Date, date2: Date): number {
    return dayjs(date1).diff(date2, "days");
  }

  addHours(date: Date, hours: number): Date {
    return dayjs(date).add(hours, "hours").toDate();
  }

  addSeconds(date: Date, seconds: number): Date {
    return dayjs(date).add(seconds, "seconds").toDate();
  }

  isBefore(date1: Date, date2: Date): boolean {
    return dayjs(date1).isBefore(date2);
  }

  isPast(date: Date): boolean {
    return dayjs(date).isBefore(new Date());
  }

  now(): Date {
    return dayjs().toDate();
  }
}

export default DayJSDateProvider;

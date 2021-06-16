interface DateProvider {
  diffInHours(date1: Date, date2: Date): number;
  diffInDays(date1: Date, date2: Date): number;
  addHours(date: Date, hours: number): Date;
  isBefore(date1: Date, date2: Date): boolean;
  isPast(date: Date): boolean;
  now(): Date;
}

export default DateProvider;

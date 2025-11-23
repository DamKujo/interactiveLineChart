import dayjs from "dayjs";

export function getWeeks(
  startDate: Date,
  endDate: Date
): { startDate: Date; endDate: Date }[] {
  const weeks: { startDate: Date; endDate: Date }[] = [];

  const currentDate = dayjs(endDate);
  let monday = dayjs(getMonday(startDate));

  while (monday <= currentDate) {
    const sunday = monday.add(7, "day").subtract(1, "millisecond");

    weeks.push({ startDate: monday.toDate(), endDate: sunday.toDate() });

    monday = monday.add(7, "day");
  }

  return weeks;
}

function getMonday(date: Date): Date {
  const currentDay = dayjs(date);
  const dayOfWeek = currentDay.day();
  const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  return currentDay.add(diff, "day").toDate();
}

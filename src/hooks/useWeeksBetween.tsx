import dayjs from "dayjs";
import type { IDateStats, IVariations } from "./../types/index.type";
import { calculateAndModifyObj, getWeeks } from "../services";

export default function useWeeksBetween(
  chartData: IDateStats[],
  variations: IVariations[]
) {
  const minTimestamp = Math.min(
    ...chartData.map((item) => dayjs(item.date).valueOf())
  );
  const maxTimestamp = Math.max(
    ...chartData.map((item) => dayjs(item.date).valueOf())
  );

  const startDate = dayjs(minTimestamp);
  const endDate = dayjs(maxTimestamp);

  const weeks = getWeeks(startDate.toDate(), endDate.toDate());

  const resArrWeeksWithoutFormat: Record<string, any>[] = [];

  const uniqKeys = [
    ...new Set(
      chartData.flatMap((item) => [
        ...Object.keys(item.visits),
        ...Object.keys(item.conversions),
      ])
    ),
  ];

  let weeklyDataCharts: Record<string, any> = {};

  weeks.forEach((week) => {
    const weekResults = chartData.filter(
      (item) =>
        week.startDate <= new Date(item.date) &&
        new Date(item.date) <= week.endDate
    );

    uniqKeys.forEach((key) => {
      let visitsWeekResult = 0;
      let conversionsWeekResult = 0;

      for (const item of weekResults) {
        const visits = item.visits[key];
        const conv = item.conversions[key];

        visitsWeekResult += Number(visits) || 0;
        conversionsWeekResult += Number(conv) || 0;
        weeklyDataCharts = {
          ...weeklyDataCharts,
          name: `${dayjs(week.startDate).format("DD.MM.YYYY")} - ${dayjs(
            week.endDate
          ).format("DD.MM.YYYY")}`,
        };
        calculateAndModifyObj(variations, key, weeklyDataCharts, item);
      }
    });
    resArrWeeksWithoutFormat.push(weeklyDataCharts);
  });
  return resArrWeeksWithoutFormat;
}

import { calculateAndModifyObj } from "../services";
import type { IDateStats, IVariations } from "./../types/index.type";

export default function useDaysBetween(
  chartData: IDateStats[],
  variations: IVariations[]
) {
  const resArrDayFormat: Record<string, number>[] = [];

  for (let i = 0; i < chartData.length; i++) {
    const item = chartData[i];
    const uniqKeys = [
      ...new Set(
        chartData.flatMap((item) => [
          ...Object.keys(item.visits),
          ...Object.keys(item.conversions),
        ])
      ),
    ];

    const dailyDataCharts: Record<string, any> = {
      name: item.date.split("-").reverse().join("."),
    };
    uniqKeys.forEach((key) => {
      calculateAndModifyObj(variations, key, dailyDataCharts, item);
    });

    resArrDayFormat.push(dailyDataCharts);
  }
  return resArrDayFormat;
}

import type { IDateStats, IVariations } from "./../types/index.type";

export function calculateAndModifyObj(
  variationsArr: IVariations[],
  key: string,
  obj: Record<string, any>,
  item: IDateStats
) {
  const variation = variationsArr.find((v) => v.id == Number(key));
  if (variation) {
    obj[variation.name] = (
      (item.conversions[key] / item.visits[key]) * 100 || 0
    ).toFixed(2);
  }
}

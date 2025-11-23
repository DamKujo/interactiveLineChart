import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartProps } from "./../../types/index.type";

const ChartArea = ({
  data,
  variations,
  colors,
  style,
  margin,
  customTooltip,
  ref,
  isAnimationActive = true,
}: ChartProps) => {
  return (
    <AreaChart style={style} responsive data={data} margin={margin} ref={ref}>
      <CartesianGrid strokeDasharray="11 8" opacity={0.6} />
      <XAxis dataKey="name" />
      <YAxis width={40} unit={"%"} />
      <Tooltip content={customTooltip as any} />
      <Legend />
      {variations.map((v) => (
        <Area
          key={v.id}
          type="monotone"
          dataKey={v.name}
          stroke={colors[v.name]}
          fill={colors[v.name]}
          fillOpacity={0.3}
          isAnimationActive={isAnimationActive}
        />
      ))}
    </AreaChart>
  );
};

export default ChartArea;

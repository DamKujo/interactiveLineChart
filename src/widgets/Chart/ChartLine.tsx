import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartProps } from "./../../types/index.type";

const ChartLine = ({
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
    <LineChart style={style} responsive data={data} margin={margin} ref={ref}>
      <CartesianGrid strokeDasharray="11 8" opacity={0.6} />
      <XAxis dataKey="name" />
      <YAxis width={40} unit={"%"} />
      <Tooltip content={customTooltip as any} />
      <Legend />
      {variations.map((v) => (
        <Line
          key={v.id}
          type="monotone"
          dataKey={v.name}
          stroke={colors[v.name]}
          dot={false}
          isAnimationActive={isAnimationActive}
        />
      ))}
    </LineChart>
  );
};

export default ChartLine;

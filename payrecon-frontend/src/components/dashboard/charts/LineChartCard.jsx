import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { trendData } from "../../../constants/chart";
import CustomTooltip from "./CustomTooltip";

function LineChartCard() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-3 h-[340px] w-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold mb-2 ml-2">Reconciliation Trend</h2>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        {/* Use ComposedChart so we can combine Area + Line */}
        <ComposedChart data={trendData}>
          {/* Define the blue gradient */}
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              {/* Darker at the top */}
              <stop offset="0%" stopColor="#4F6BFF" stopOpacity={0.35} />

              {/* Fade out toward the bottom */}
              <stop offset="100%" stopColor="#4F6BFF" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          <CartesianGrid
            stroke="#243041"
            strokeDasharray="3 3"
            vertical={false}
          />

          {/* X-axis */}
          <XAxis
            dataKey="day"
            stroke="#94A3B8"
            tickLine={false}
            axisLine={{ stroke: "#475569" }}
          />

          {/* Y-axis */}
          <YAxis
            stroke="#94A3B8"
            tickLine={false}
            axisLine={{ stroke: "#475569" }}
              width={55}
          />

          {/* Tooltip on hover */}
<Tooltip
  content={<CustomTooltip />}
  cursor={{
    stroke: "#94A3B8",
    strokeWidth: 1,
    strokeDasharray: "4 4",
  }}
/>

          {/* Blue area under the line */}
          <Area
            // type="monotone"
            dataKey="value"
            fill="url(#blueGradient)"
            stroke="none"
          />

          {/* Line graph */}
          <Line
            // type="monotone"
            dataKey="value"
            stroke="#4F6BFF"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#4F6BFF",
              stroke: "#BFCBFF",
              strokeWidth: 2,
            }}
            activeDot={{ r: 7 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartCard;
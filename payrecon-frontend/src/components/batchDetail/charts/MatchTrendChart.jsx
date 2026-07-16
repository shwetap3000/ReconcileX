import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { day: "May 6", value: 70 },
  { day: "May 7", value: 76 },
  { day: "May 8", value: 69 },
  { day: "May 9", value: 86 },
  { day: "May 10", value: 80 },
  { day: "May 11", value: 93 },
  { day: "May 12", value: 79 },
];

function MatchTrendChart() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-6 h-full">
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Match Trend</h2>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#243041] bg-[#111827] hover:bg-[#182233] text-sm">
          Last 7 Days
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Chart */}

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="matchGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity={0.35} />

                <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#243041" vertical={false} />

            <XAxis
              dataKey="day"
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(value) => `${value}%`}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#22C55E"
              strokeWidth={3}
              fill="url(#matchGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MatchTrendChart;

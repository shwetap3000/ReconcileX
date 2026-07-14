import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { trendData } from "../../../constants/chart";

function LineChartCard() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-6 h-[380px]">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Reconciliation Trend
        </h2>

        <button className="text-sm border border-[#243041] rounded-lg px-3 py-2">
          Last 7 Days
        </button>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={trendData}>
          <XAxis
            dataKey="day"
            stroke="#94A3B8"
          />

          <YAxis
            stroke="#94A3B8"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#4F6BFF"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default LineChartCard;
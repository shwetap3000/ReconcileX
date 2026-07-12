import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { day: "13 May", Matched: 2500, Unmatched: 1100, Duplicates: 650 },
  { day: "14 May", Matched: 2000, Unmatched: 700, Duplicates: 350 },
  { day: "15 May", Matched: 2900, Unmatched: 1050, Duplicates: 650 },
  { day: "16 May", Matched: 2350, Unmatched: 600, Duplicates: 500 },
  { day: "17 May", Matched: 2400, Unmatched: 650, Duplicates: 550 },
  { day: "18 May", Matched: 3400, Unmatched: 1100, Duplicates: 700 },
  { day: "19 May", Matched: 2800, Unmatched: 700, Duplicates: 600 },
  { day: "20 May", Matched: 3600, Unmatched: 1150, Duplicates: 650 },
];

const TransactionTrendChart = () => {
  return (
    <div className="bg-[#0c1221] border border-[#151b2a] rounded-xl p-3 h-80">
      {/* Header */}
      <div className="flex justify-between items-center mb-0">
        <h3 className="text-white text-lg font-semibold">
          Transaction Trend
        </h3>

        <button className="bg-[#1d263b] border border-[#2d3955] rounded-md px-3 py-1 text-sm text-slate-300">
          Daily
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-62.5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="#2a3448"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#141c2f",
                border: "1px solid #2d3955",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Legend
              verticalAlign="top"
              align="center"
              height={35}
              wrapperStyle={{
                color: "#cbd5e1",
                fontSize: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="Matched"
              stroke="#22C55E"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="Unmatched"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="Duplicates"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TransactionTrendChart;
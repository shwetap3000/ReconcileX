import { useEffect, useState } from "react";
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

import { getMonthlyTrend } from "../../../api/dashboardApi";
import CustomTooltip from "./CustomTooltip";

function LineChartCard() {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const response = await getMonthlyTrend();

        const months = [
          "",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const formattedData = response.trend.map((item) => ({
          month: months[item._id.month],
          value: item.totalBatches,
        }));

        setTrendData(formattedData);
      } catch (error) {
        console.error("Failed to fetch monthly trend:", error);
      }
    };

    fetchTrend();
  }, []);

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-3 h-[340px] w-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold mb-2 ml-2">
          Reconciliation Trend
        </h2>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <ComposedChart data={trendData}>
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F6BFF" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#4F6BFF" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#243041"
            strokeDasharray="3 3"
            vertical={true}
          />

          <XAxis
            dataKey="month"
            stroke="#94A3B8"
            tickLine={false}
            axisLine={{ stroke: "#475569" }}
          />

          <YAxis
            stroke="#94A3B8"
            tickLine={false}
            axisLine={{ stroke: "#475569" }}
            width={55}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#94A3B8",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />

          <Area
            dataKey="value"
            fill="url(#blueGradient)"
            stroke="none"
          />

          <Line
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
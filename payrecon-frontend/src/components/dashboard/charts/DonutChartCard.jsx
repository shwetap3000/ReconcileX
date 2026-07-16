import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { statusData } from "../../../constants/chart";
import CustomPieTooltip from "./CustomPieTooltp";

function DonutChartCard() {
  const total = statusData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-3 h-[340px] w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl ml-2 font-semibold">Transaction Status</h2>
      </div>

      <div className="flex h-[280px] gap-4">
        {/* Chart */}

        <div className="w-1/2 relative">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {statusData.map((item, index) => (
                  <Cell key={index} fill={item.color} />
                ))}
              </Pie>

                <Tooltip content={<CustomPieTooltip />}
                  allowEscapeViewBox={{ x: true, y: true }}
 />

            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}

          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none">
            <h2 className="text-3xl font-bold">{total.toLocaleString()}</h2>

            <p className="text-gray-400 text-sm mt-1">Total</p>
          </div>
        </div>

        {/* Legend */}

        <div className="w-50 flex flex-col justify-center gap-4">
          {statusData.map((item) => (
            <div key={item.name} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                <span className="text-gray-300">{item.name}</span>
              </div>

              <div className="text-right">
                <p className="text-white">{item.value.toLocaleString()}</p>

                <p className="text-gray-500 text-sm">{item.percentage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DonutChartCard;

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { statusData } from "../../../constants/chart";

function DonutChartCard() {
  const total = statusData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl p-6 h-[380px]">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-semibold">
          Transaction Status
        </h2>

        <button className="border border-[#243041] rounded-lg px-3 py-2 text-sm">
          This Week
        </button>

      </div>

      <div className="flex h-[290px]">

        {/* Chart */}

        <div className="w-1/2 relative">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={statusData}
                dataKey="value"
                innerRadius={65}
                outerRadius={95}
                stroke="none"
              >

                {statusData.map((item, index) => (

                  <Cell
                    key={index}
                    fill={item.color}
                  />

                ))}

              </Pie>

            </PieChart>

          </ResponsiveContainer>

          {/* Center Text */}

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

            <h2 className="text-3xl font-bold">

              {total.toLocaleString()}

            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Total
            </p>

          </div>

        </div>

        {/* Legend */}

        <div className="w-1/2 flex flex-col justify-center gap-5">

          {statusData.map((item) => (

            <div
              key={item.name}
              className="flex justify-between items-center"
            >

              <div className="flex items-center gap-3">

                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                <span className="text-gray-300">

                  {item.name}

                </span>

              </div>

              <div className="text-right">

                <p className="text-white">

                  {item.value.toLocaleString()}

                </p>

                <p className="text-gray-500 text-sm">

                  {item.percentage}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default DonutChartCard;
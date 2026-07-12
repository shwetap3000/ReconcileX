import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Label,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Matched",
    value: 9450,
  },
  {
    name: "Unmatched",
    value: 850,
  },
  {
    name: "Duplicates",
    value: 530,
  },
  {
    name: "Others",
    value: 410,
  },
];

const COLORS = ["#22C55E", "#EF4444", "#F59E0B", "#8B5CF6"];

const ReconciliationChart = () => {
  return (
    <div className="bg-[#0c1221] border border-[#151b2a] rounded-xl p-3 h-80">
      <h3 className="text-white text-lg font-semibold">
        Reconciliation Percentage
      </h3>

      <div className="flex items-center h-55">
        {/* Chart */}
        <div className="w-[50%] h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#141c2f",
                  border: "1px solid #2d3955",
                  borderRadius: "10px",
                  color: "#fff",
                }}
                labelStyle={{
                  color: "#94a3b8",
                }}
                formatter={(value) => [value.toLocaleString(), "Transactions"]}
              />
              <Pie
                data={data}
                dataKey="value"
                innerRadius={68}
                outerRadius={90}
                paddingAngle={1}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}

                <Label
                  content={({ viewBox }) => {
                    const { cx, cy } = viewBox;

                    return (
                      <g>
                        <text
                          x={cx}
                          y={cy - 2}
                          textAnchor="middle"
                          fill="white"
                          fontSize="26"
                          fontWeight="700"
                        >
                          91.3%
                        </text>

                        <text
                          x={cx}
                          y={cy + 22}
                          textAnchor="middle"
                          fill="#94A3B8"
                          fontSize="13"
                        >
                          Reconciled
                        </text>
                      </g>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-[30%] space-y-3">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index],
                  }}
                />

                <span className="text-slate-300 text-sm">{item.name}</span>
              </div>

              <span className="text-white font-medium text-sm">
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReconciliationChart;
import { PieChart, Pie, Cell } from "recharts";

const data = [
  {
    name: "Matched",
    value: 11234,
    color: "#22C55E",
  },
  {
    name: "Unmatched",
    value: 1120,
    color: "#F59E0B",
  },
  {
    name: "Exceptions",
    value: 300,
    color: "#EF4444",
  },
];

function MatchingStatusChart() {
  return (
    <div className="bg-[#141C28] border border-[#243041] rounded-2xl pt-4 p-6 h-80">
      <h2 className="text-xl font-semibold mb-7">Matching Status</h2>

      <div className="flex items-center justify-between">
        {/* Donut */}

        <div className="relative">
          <PieChart width={200} height={200}>
            <Pie data={data} innerRadius={65} outerRadius={95} dataKey="value">
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold">12,654</h2>

            <p className="text-gray-400">Total</p>
          </div>
        </div>

        {/* Legend */}

        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-5"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: item.color,
                  }}
                />

                <span>{item.name}</span>
              </div>

              <span className="text-gray-400">
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchingStatusChart;

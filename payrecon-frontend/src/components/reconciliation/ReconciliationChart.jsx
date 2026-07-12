import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22C55E", // Matched
  "#F59E0B", // Unmatched
  "#EF4444", // Duplicate
  "#8B5CF6", // Missing
];

const ReconciliationChart = ({ data, total }) => {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <text
            x="50%"
            y="47%"
            textAnchor="middle"
            fill="white"
            fontSize="28"
            fontWeight="700"
          >
            {total.toLocaleString()}
          </text>

          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="14"
          >
            Total
          </text>

          <text
            x="50%"
            y="67%"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="14"
          >
            Transactions
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReconciliationChart;
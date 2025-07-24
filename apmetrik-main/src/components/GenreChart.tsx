import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "Electronic", value: 35, color: "#8B5CF6" },
  { name: "Rock", value: 25, color: "#06B6D4" },
  { name: "Hip Hop", value: 20, color: "#10B981" },
  { name: "Jazz", value: 12, color: "#F59E0B" },
  { name: "Classical", value: 8, color: "#EF4444" }
];

interface GenreChartProps {
  detailed?: boolean;
}

export function GenreChart({ detailed = false }: GenreChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={detailed ? 60 : 40}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}%`, "Listening Time"]}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px"
            }}
          />
          {detailed && <Legend />}
        </PieChart>
      </ResponsiveContainer>
      
      {!detailed && (
        <div className="mt-4 space-y-2">
          {data.map((genre) => (
            <div key={genre.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: genre.color }}
                />
                <span>{genre.name}</span>
              </div>
              <span className="text-muted-foreground">{genre.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Label } from "recharts";

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

// Custom label function for segments - shows percentage only
const renderLabel = (entry: any) => {
  // Only show label if segment is large enough (>10%) and position it nicely
  if (entry.value > 10) {
    return `${entry.value}%`;
  }
  return null;
};

export function GenreChart({ detailed = false }: GenreChartProps) {
  return (
    <div className={`w-full ${detailed ? 'h-[500px]' : 'h-80'} flex flex-col`}>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy={detailed ? "40%" : "42%"}
              innerRadius={detailed ? 60 : 40}
              outerRadius={detailed ? 100 : 80}
              paddingAngle={2}
              dataKey="value"
              label={!detailed ? renderLabel : false}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string, props: any) => [
                `${value}%`, 
                props.payload.name || "Listening Time"
              ]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px"
              }}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.name || ''}
            />
            {detailed && (
              <Legend 
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Compact inline legend for non-detailed mode - fits within container */}
      {!detailed && (
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-2 pt-2 pb-1 shrink-0">
          {data.map((genre) => (
            <div key={genre.name} className="flex items-center gap-1 text-xs whitespace-nowrap">
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0" 
                style={{ backgroundColor: genre.color }}
              />
              <span className="text-foreground">{genre.name}</span>
              <span className="text-muted-foreground">{genre.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const data = [
  { name: "Mon", hours: 4.2, songs: 28 },
  { name: "Tue", hours: 6.8, songs: 45 },
  { name: "Wed", hours: 5.1, songs: 34 },
  { name: "Thu", hours: 7.3, songs: 52 },
  { name: "Fri", hours: 8.9, songs: 63 },
  { name: "Sat", hours: 6.2, songs: 41 },
  { name: "Sun", hours: 5.7, songs: 38 }
];

const hourlyData = [
  { hour: "00", listening: 0.2 },
  { hour: "01", listening: 0.1 },
  { hour: "02", listening: 0.0 },
  { hour: "03", listening: 0.0 },
  { hour: "04", listening: 0.0 },
  { hour: "05", listening: 0.0 },
  { hour: "06", listening: 0.3 },
  { hour: "07", listening: 1.2 },
  { hour: "08", listening: 2.1 },
  { hour: "09", listening: 3.4 },
  { hour: "10", listening: 4.2 },
  { hour: "11", listening: 3.8 },
  { hour: "12", listening: 2.9 },
  { hour: "13", listening: 3.1 },
  { hour: "14", listening: 4.5 },
  { hour: "15", listening: 5.2 },
  { hour: "16", listening: 4.8 },
  { hour: "17", listening: 3.9 },
  { hour: "18", listening: 2.7 },
  { hour: "19", listening: 1.8 },
  { hour: "20", listening: 1.2 },
  { hour: "21", listening: 0.9 },
  { hour: "22", listening: 0.6 },
  { hour: "23", listening: 0.4 }
];

interface ListeningTimeChartProps {
  detailed?: boolean;
}

export function ListeningTimeChart({ detailed = false }: ListeningTimeChartProps) {
  if (detailed) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Daily Listening Patterns</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="hour" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                  formatter={(value: number) => [`${value} hours`, "Listening Time"]}
                  labelFormatter={(label) => `${label}:00`}
                />
                <Area 
                  type="monotone" 
                  dataKey="listening" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Weekly Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="songs" 
                  stroke="#06B6D4" 
                  strokeWidth={2}
                  dot={{ fill: "#06B6D4", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px"
            }}
            formatter={(value: number) => [`${value} hours`, "Listening Time"]}
          />
          <Line 
            type="monotone" 
            dataKey="hours" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
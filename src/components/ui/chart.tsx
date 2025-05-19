
import * as React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ChartProps {
  data: Array<Record<string, any>>
  categories: string[]
  index: string
  className?: string
  colors?: string[]
}

export function Chart({
  data,
  categories,
  index,
  colors = ["#2563eb", "#8b5cf6", "#10b981", "#ef4444", "#f59e0b"],
  className,
}: ChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey={index}
            tick={{ fill: "hsl(var(--foreground))" }}
            tickLine={{ stroke: "hsl(var(--foreground))" }}
            axisLine={{ stroke: "hsl(var(--foreground))" }}
          />
          <YAxis
            tick={{ fill: "hsl(var(--foreground))" }}
            tickLine={{ stroke: "hsl(var(--foreground))" }}
            axisLine={{ stroke: "hsl(var(--foreground))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "4px",
            }}
          />
          <Legend />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={true}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

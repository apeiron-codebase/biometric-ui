"use client"

import * as React from "react"
import { Pie, PieChart, Label } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface Props {
  inOffice: number
  late: number
  absent: number
  className?: string
}

export function ChartPieDonutText({
  inOffice,
  late,
  absent,
  className,
}: Props) {

  const chartData = [
    { status: "In Office", count: inOffice, fill: "var(--chart-1)" },
    { status: "Late", count: late, fill: "var(--chart-2)" },
    { status: "Absent", count: absent, fill: "var(--chart-3)" },
  ]

  const totalEmployees = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.count, 0),
    [inOffice, late, absent]
  )

  const chartConfig = {
    count: {
      label: "Employees",
    },
    "In Office": {
      label: "In Office",
      color: "var(--chart-1)",
    },
    Late: {
      label: "Late",
      color: "var(--chart-2)",
    },
    Absent: {
      label: "Absent",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig

  return (
     <Card className={`flex flex-col p-4 ${className ?? ""}`}>

      {/* Header */}
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Today Status
        </CardTitle>
        <CardDescription>
          Employee attendance distribution
        </CardDescription>
      </CardHeader>

      {/* Chart */}
      <CardContent className="flex flex-col items-center">
        <ChartContainer
          config={chartConfig}
          className="w-55 aspect-square"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={3}
              stroke="#fff"
              strokeWidth={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalEmployees}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-xs"
                        >
                          Employees
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="mt-4 flex gap-6">
          {chartData.map((item) => (
            <div key={item.status} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-muted-foreground">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
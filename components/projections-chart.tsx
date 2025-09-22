"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { memo, useMemo, useState, useEffect } from "react"

const data = [
  { month: "Jan", actuals: 22, projections: 18 },
  { month: "Feb", actuals: 25, projections: 20 },
  { month: "Mar", actuals: 21, projections: 18 },
  { month: "Apr", actuals: 27, projections: 22 },
  { month: "May", actuals: 18, projections: 15 },
  { month: "Jun", actuals: 24, projections: 20 },
]

export const ProjectionsChart = memo(function ProjectionsChart() {
  const [isLoading, setIsLoading] = useState(true)
  
  const transformed = useMemo(() => 
    data.map((d) => ({
      ...d,
      diff: Math.max(d.actuals - d.projections, 0),
    })), []
  )

  useEffect(() => {
    // Simulate chart loading time
    const timer = setTimeout(() => setIsLoading(false), 100)
    return () => clearTimeout(timer)
  }, [])
  return (
    <Card className="w-full bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-card-foreground">Projections vs Actuals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40">
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted/30 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-muted/30 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-muted/30 rounded animate-pulse" />
              <div className="h-20 w-full bg-muted/30 rounded animate-pulse" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transformed}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                barCategoryGap="30%"
                barGap={0}
              >
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 30]}
                  tickFormatter={(v) => `${v}M`}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />
                <Bar dataKey="projections" stackId="a" fill="#A8C5DA" barSize={30} />
                <Bar dataKey="diff" stackId="a" fill="#B6D0E2" barSize={30} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  )
})

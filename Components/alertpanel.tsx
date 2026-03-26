"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CalendarDays, BarChart3, Globe, PartyPopper } from "lucide-react"

export function EventsPanel({ className }: { className?: string }) {
  const events = [
    {
      title: "Attendance Cutoff",
      date: "Mar 31",
      icon: CalendarDays,
      color: "text-blue-500",
    },
    {
      title: "Payroll Processing",
      date: "Apr 2",
      icon: BarChart3,
      color: "text-green-500",
    },
    {
      title: "Chennai Client Visit",
      date: "Tomorrow",
      icon: Globe,
      color: "text-purple-500",
    },
    {
      title: "Good Friday",
      date: "Mar 29",
      icon: PartyPopper,
      color: "text-pink-500",
    },
  ]

  return (
    <Card className={`p-4 ${className ?? ""} shadow-sm border`}>
      <CardHeader className="pb-2">
        <h2 className="text-lg font-semibold">Upcoming Events</h2>
      </CardHeader>

      <CardContent className="divide-y">
        {events.map((event, index) => {
          const Icon = event.icon
          return (
            <div
              key={index}
              className="flex items-center justify-between py-3.5"
            >
              <div className="flex items-center gap-3 text-sm">
                <Icon className={`w-4 h-4 ${event.color}`} />
                <span className="text-muted-foreground">
                  {event.title}
                </span>
              </div>

              <span className="text-xs text-gray-500 font-medium">
                {event.date}
              </span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
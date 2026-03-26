"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, UserX, Clock } from "lucide-react"

export default function StatCard({
  title,
  value,
  type,
}: {
  title: string
  value: number
  type: "office" | "absent" | "late"
}) {
  const config = {
    office: {
      icon: Building2,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    absent: {
      icon: UserX,
      bg: "bg-red-100",
      color: "text-red-600",
    },
    late: {
      icon: Clock,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
  }

  const item = config[type]
  const Icon = item.icon

  return (
    <Card className="w-full transition hover:shadow-md">
      <CardContent className="p-4 flex items-center justify-between">
        
        {/* Text */}
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h2 className="text-3xl font-semibold mt-1">{value}</h2>
        </div>

        {/* Icon */}
        <div className={`${item.bg} p-2 rounded-full`}>
          <Icon className={`w-5 h-5 ${item.color}`} />
        </div>

      </CardContent>
    </Card>
  )
}
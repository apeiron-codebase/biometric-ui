// "use client"

// import { Card, CardContent } from "@/components/ui/card"
// import { Building2, UserX, Clock, LucideIcon } from "lucide-react"

// type StatType = "office" | "absent" | "late"

// type StatCardProps = {
//   title: string
//   value: number
//   type: StatType
// }

// const config: Record<
//   StatType,
//   { icon: LucideIcon; bg: string; color: string }
// > = {
//   office: {
//     icon: Building2,
//     bg: "bg-green-100",
//     color: "text-green-600",
//   },
//   absent: {
//     icon: UserX,
//     bg: "bg-red-100",
//     color: "text-red-600",
//   },
//   late: {
//     icon: Clock,
//     bg: "bg-yellow-100",
//     color: "text-yellow-600",
//   },
// }

// export default function StatCard({
//   title,
//   value,
//   type,
// }: StatCardProps) {
//   const item = config[type]
//   const Icon = item.icon

//   return (
//     <Card className="w-full transition hover:shadow-md">
//       <CardContent className="p-4 flex items-center justify-between">
        
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <h2 className="text-3xl font-semibold mt-1">{value}</h2>
//         </div>

//         <div className={`${item.bg} p-2 rounded-full flex items-center justify-center`}>
//           <Icon className={`w-6 h-6 ${item.color}`} />
//         </div>

//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Building2, UserX, Clock, LucideIcon } from "lucide-react"

type StatType = "office" | "absent" | "late"

type StatCardProps = {
  title: string
  value: number
  type: StatType
}

const config: Record<
  StatType,
  { icon: LucideIcon; bg: string; color: string }
> = {
  office: {
    icon: Building2,
    bg: "bg-green-100/60",
    color: "text-green-600",
  },
  absent: {
    icon: UserX,
    bg: "bg-red-100/60",
    color: "text-red-600",
  },
  late: {
    icon: Clock,
    bg: "bg-yellow-100/60",
    color: "text-yellow-600",
  },
}

export default function StatCard({
  title,
  value,
  type,
}: StatCardProps) {
  const item = config[type]
  const Icon = item.icon

  return (
    <Card className="w-full rounded-2xl border transition-all hover:shadow-lg hover:-translate-y-[2px]">
      <CardContent className="p-5 flex items-center justify-between">
        
        {/* Left Content */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">
            {title}
          </p>
          <h2 className="text-4xl font-bold tracking-tight">
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div
          className={`${item.bg} p-3 rounded-xl flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${item.color}`} />
        </div>

      </CardContent>
    </Card>
  )
}
import { Card, CardContent } from "@/components/ui/card"

export default function StatCard({
  title,
  value,
}: {
  title: string
  value: number
}) {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-3xl font-bold mt-2">{value}</h2>
      </CardContent>
    </Card>
  )
}
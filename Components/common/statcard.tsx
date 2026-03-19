interface StatCardProps {
  title: string
  value: number
}

export default function StatCard({ title, value }: StatCardProps) {

  const colorStyles = {
    "In Office": "bg-green-50 text-green-600",
    "Not Checked-in": "bg-red-50 text-red-600",
    "Late": "bg-yellow-50 text-yellow-600"
  }

  const badgeStyle =
    colorStyles[title as keyof typeof colorStyles] || "bg-blue-50 text-blue-600"

  return (
    <div className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100">

      {/* Top Row */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-gray-500 font-medium">
          {title}
        </h2>

        {/* Small colored badge */}
        <span className={`text-xs px-2 py-1 rounded-full ${badgeStyle}`}>
          ●
        </span>
      </div>

      {/* Value */}
      <p className="text-3xl font-semibold text-gray-800 mt-4">
        {value}
      </p>

    </div>
  )
}
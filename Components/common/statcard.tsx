interface StatCardProps {
  title: string
  value: number
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
      
      {/* Title */}
      <h2 className="text-sm text-gray-500 font-medium">
        {title}
      </h2>

      {/* Value */}
      <p className="text-3xl font-bold text-gray-800 mt-2">
        {value}
      </p>

    </div>
  )
}
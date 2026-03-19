//homepage/dashboard page showing employee attendance stats

"use client"  

import React, { useEffect, useState } from "react"
import StatCard from "@/components/common/statcard"

interface Employee {
  id: number
  name: string
  status: string
}

export default function DashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch(
          "https://mocki.io/v1/903e8cfd-7b58-48b1-b2ac-950bb4682863"
        )
        const data = await res.json()
        setEmployees(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>

  const inOffice = employees.filter(
    e => e.status === "Present" || e.status === "In Office"
  ).length
  const notCheckedIn = employees.filter(e => e.status === "Absent").length
  const late = employees.filter(e => e.status === "Late").length

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="In Office" value={inOffice} />
        <StatCard title="Not Checked-in" value={notCheckedIn} />
        <StatCard title="Late" value={late} />
      </div>
    </div>
  )
}
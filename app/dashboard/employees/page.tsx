"use client"

import { EmployeeRegistrationForm } from "@/components/emp-reg"
import CustomBreadcrumb from "@/components/common/breadcrumb"

export default function EmployeeRegistrationpage() {
  return (
    <div className="p-6 space-y-6">

      {/* ✅ Top */}
      <CustomBreadcrumb page="Employee Registration" />

      {/* ✅ Center only the form */}
      <div className="flex w-full justify-center">
        <div className="w-full max-w-md">
          <EmployeeRegistrationForm />
        </div>
      </div>

    </div>
  )
}
"use client"

import { EmployeeRegistrationForm } from "@/components/emp-reg"

export default function EmployeeRegistrationpage() {
  return (
    <div className="h-full flex items-center justify-center">

      <div className="w-full max-w-md max-h-[85vh] overflow-y-auto">
        <EmployeeRegistrationForm />
      </div>

    </div>
  )
}
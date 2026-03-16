"use client"

import { EmployeeRegistrationForm } from "@/components/emp-reg"

export default function EmployeeRegistrationPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-md">
        <EmployeeRegistrationForm />
      </div>
    </div>
  )
}
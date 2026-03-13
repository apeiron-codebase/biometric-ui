"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function ChangePasswordForm({
  className,
  onPasswordSubmit,
  ...props
}: React.ComponentProps<"div"> & {
  onPasswordSubmit?: (values: {
    newPassword: string
    confirmPassword: string
  }) => void
}) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const passwordsMatch =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword === confirmPassword

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordsMatch) return

    onPasswordSubmit?.({
      newPassword,
      confirmPassword,
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>

          {/* Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-6" />
            </div>

            <h1 className="text-xl font-bold">Change password</h1>

            <FieldDescription>
              Choose a strong password to secure your account
            </FieldDescription>
          </div>

          {/* New Password */}
          <Field>
            <FieldLabel htmlFor="newPassword">New password</FieldLabel>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Field>

          {/* Confirm Password */}
          <Field>
            <FieldLabel htmlFor="confirmPassword">
              Confirm new password
            </FieldLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Field>

          {!passwordsMatch && confirmPassword.length > 0 && (
            <FieldDescription className="text-center text-destructive">
              Passwords do not match
            </FieldDescription>
          )}

          {/* Submit */}
          <Field>
            <Button
              type="submit"
              className="w-full"
              disabled={!passwordsMatch}
            >
              Update password
            </Button>
          </Field>

        </FieldGroup>
      </form>

      {/* Footer */}
      <FieldDescription className="px-6 text-center">
        By continuing, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  )
}

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

export function EmailEntryForm({
  className,
  onEmailSubmit,
  ...props
}: React.ComponentProps<"div"> & {
  onEmailSubmit?: (email: string) => void
}) {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()            // ✅ PREVENTS PAGE REFRESH
    onEmailSubmit?.(email)        // ✅ CALL MUTATION / API
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

            <h1 className="text-xl font-bold">Enter your email</h1>

            <FieldDescription>
              We will send a 6-digit verification code to your email address
            </FieldDescription>
          </div>

          {/* Email Field */}
          <Field>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          {/* Submit */}
          <Field>
            <Button
              type="submit"
              className="w-full"
              disabled={!email}
            >
              Send verification code
            </Button>
          </Field>

        </FieldGroup>
      </form>

      {/* Footer */}
      {/* <FieldDescription className="px-6 text-center">
        By continuing, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </FieldDescription> */}
    </div>
  )
}

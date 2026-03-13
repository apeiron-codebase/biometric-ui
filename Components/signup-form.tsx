import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast } from "sonner"
import logo from "@/public/images/apeiron_pte_ltd_logo.jpg"
import Image from "next/image"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
  onSubmit={(e) => {
    e.preventDefault()

    toast.success("Registered successfully!", {
      position: "bottom-right",
    })
  }}
  className={cn(
    "flex flex-col gap-6 rounded-xl bg-background p-6 shadow-md",
    className
  )}
  {...props}
>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
           <div className="flex justify-center mb-4">
        <Image
          src={logo}
          alt="Logo"
          width={70}
          height={10}
        />
      </div>
          <h1 className="text-2xl font-bold">Create your account</h1>
          {/* <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p> */}
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
          />
          {/* <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription> */}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            className="bg-background"
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            required
            className="bg-background"
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
       
       
         
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/login"
            
            >Sign in</Link>
          </FieldDescription>
       
      </FieldGroup>
    </form>
  )
}

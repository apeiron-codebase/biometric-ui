'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import collab from "@/public/images/collab.png"
import logo from "@/public/images/apeiron_pte_ltd_logo.jpg"
import { useState } from "react"
import { useRouter } from "next/navigation"



export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
const onSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setErrorMessage("");

  const formData = new FormData(event.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());

  console.log("Form Data:", data);

  if (!data.user_id || !data.password) {
    setErrorMessage("Please fill all fields");
    return;
  }

  try {
    const response = await fetch('/api/admin-login', { // Replace with your actual endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        admin_id: data.user_id,
        password: data.password
      }),
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      setErrorMessage(result.error || "Login failed");
      return;
    }

    // On success
    router.push("/dashboard");
  } catch (err) {
    setErrorMessage("Server error. Please try again.");
    console.error(err);
  }
};


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={onSubmit} className="p-4 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <Image
                  src={logo}
                  alt="Collaboration"
                  className="w-16 h-16 mb-4"
                  priority
                />
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Apeiron account
                </p>
              </div>
              {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
              <Field>
                <FieldLabel htmlFor="user_id">Admin ID</FieldLabel>
                <Input
                  id="user_id"
                  name="user_id"         
                  type="text"
                  placeholder="001"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="hidden"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit" >Login</Button>
              </Field>
              {/* <FieldDescription className="text-center">
                Don&apos;t have an account?
                <Link
                  href="/signup"
                  className="text-green-600 hover:text-green-800"
                >
                  Sign up
                </Link>
              </FieldDescription> */}
            </FieldGroup>
          </form>
          <div className="relative hidden md:flex items-center justify-center border-l border-border p-4">
          <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-100 lg:h-100">
            <Image
              src={collab}
              alt="Collaboration"
              fill
              className="object-contain dark:brightness-[0.2] dark:grayscale"
              priority
            />
          </div>
        </div>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  )
}
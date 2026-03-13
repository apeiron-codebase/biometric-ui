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
import { useLoginMutation } from "@/store/api/authApi"
import Cookies from "js-cookie"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const [login, { isLoading }] = useLoginMutation();

const onSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setErrorMessage("");

  const formData = new FormData(event.target as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());

  try {
    const result = await login({
      email: data.email as string,
      password: data.password as string,
    })

    // // ✅ Access token (short-lived)
    // document.cookie = `accessToken=${result.accessToken}; path=/; max-age=900`;

    // // ✅ Refresh token (long-lived)
    // document.cookie = `refreshToken=${result.refreshToken}; path=/; max-age=604800`;
    Cookies.set("token", result.token, { path: "/", });
    

    console.log("Tokens set in cookies");
    console.log("tokens in cookies", Cookies.get("accessToken"), Cookies.get("refreshToken"));
    router.push("/dashboard");
  } catch {
    setErrorMessage("Invalid username or password");
  }
};


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={onSubmit} className="p-6 md:p-8">
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
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"         
                  type="email"
                  placeholder="johndoe@apeironengg.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>Login</Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account?
                <Link
                  href="/signup"
                  className="text-green-600 hover:text-green-800"
                >
                  Sign up
                </Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden md:flex items-center justify-center border-l border-border p-6">
          <div className="relative w-55 h-55 md:w-65 md:h-65 lg:w-130 lg:h-130">
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
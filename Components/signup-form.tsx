// // // import { cn } from "@/lib/utils"
// // // import { Button } from "@/components/ui/button"
// // // import {
// // //   Field,
// // //   FieldDescription,
// // //   FieldGroup,
// // //   FieldLabel,
  
// // // } from "@/components/ui/field"
// // // import { Input } from "@/components/ui/input"
// // // import Link from "next/link"
// // // import { toast } from "sonner"
// // // import logo from "@/public/images/apeiron_pte_ltd_logo.jpg"
// // // import Image from "next/image"

// // // export function SignupForm({
// // //   className,
// // //   ...props
// // // }: React.ComponentProps<"form">) {
// // //   return (
// // //     <form
// // //   onSubmit={(e) => {
// // //     e.preventDefault()

// // //     toast.success("Registered successfully!", {
// // //       position: "bottom-right",
// // //     })
// // //   }}
// // //   className={cn(
// // //     "flex flex-col gap-6 rounded-xl bg-background p-6 shadow-md",
// // //     className
// // //   )}
// // //   {...props}
// // // >
// // //       <FieldGroup>
// // //         <div className="flex flex-col items-center gap-1 text-center">
// // //            <div className="flex justify-center mb-4">
// // //         <Image
// // //           src={logo}
// // //           alt="Logo"
// // //           width={70}
// // //           height={10}
// // //         />
// // //       </div>
// // //           <h1 className="text-2xl font-bold">Create your account</h1>
// // //           {/* <p className="text-sm text-balance text-muted-foreground">
// // //             Fill in the form below to create your account
// // //           </p> */}
// // //         </div>
// // //         <Field>
// // //           <FieldLabel htmlFor="name">Full Name</FieldLabel>
// // //           <Input
// // //             id="name"
// // //             type="text"
// // //             placeholder="John Doe"
// // //             required
// // //             className="bg-background"
// // //           />
// // //         </Field>
// // //         <Field>
// // //           <FieldLabel htmlFor="email">Email</FieldLabel>
// // //           <Input
// // //             id="email"
// // //             type="email"
// // //             placeholder="m@example.com"
// // //             required
// // //             className="bg-background"
// // //           />
// // //           {/* <FieldDescription>
// // //             We&apos;ll use this to contact you. We will not share your email
// // //             with anyone else.
// // //           </FieldDescription> */}
// // //         </Field>
// // //         <Field>
// // //           <FieldLabel htmlFor="password">Password</FieldLabel>
// // //           <Input
// // //             id="password"
// // //             type="password"
// // //             required
// // //             className="bg-background"
// // //           />
// // //           <FieldDescription>
// // //             Must be at least 8 characters long.
// // //           </FieldDescription>
// // //         </Field>
// // //         <Field>
// // //           <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
// // //           <Input
// // //             id="confirm-password"
// // //             type="password"
// // //             required
// // //             className="bg-background"
// // //           />
// // //           <FieldDescription>Please confirm your password.</FieldDescription>
// // //         </Field>
// // //         <Field>
// // //           <Button type="submit">Create Account</Button>
// // //         </Field>
       
       
         
// // //           <FieldDescription className="px-6 text-center">
// // //             Already have an account? <Link href="/login"
            
// // //             >Sign in</Link>
// // //           </FieldDescription>
       
// // //       </FieldGroup>
// // //     </form>
// // //   )
// // // }

// // "use client";

// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Field,
// //   FieldDescription,
// //   FieldGroup,
// //   FieldLabel,
// // } from "@/components/ui/field";
// // import { Input } from "@/components/ui/input";
// // import Link from "next/link";
// // import { toast } from "sonner";
// // import Image from "next/image";
// // import logo from "@/public/images/apeiron_pte_ltd_logo.jpg";
// // import { useState } from "react";
// // import { registerAdmin, type AdminRegisterPayload } from "@/app/api/services/auth";

// // export function SignupForm({
// //   className,
// //   ...props
// // }: React.ComponentProps<"form">) {
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsLoading(true);

// //     const formData = new FormData(e.currentTarget);

// //     const payload: AdminRegisterPayload = {
// //       admin_name: formData.get("name") as string,
// //       admin_email: formData.get("email") as string,
// //       admin_id: formData.get("admin_id") as string,
// //       password: formData.get("password") as string,
// //       confirm_password: formData.get("confirm-password") as string,
// //     };

// //     try {
// //       const result = await registerAdmin(payload);

// //       toast.success(result.message || "Registered successfully!", {
// //         position: "bottom-right",
// //       });

// //       // TODO: Redirect to login or dashboard after success
// //       // router.push("/login");

// //     } catch (error) {
// //       // Fixed: Removed :any
// //       const message = error instanceof Error ? error.message : "Registration failed. Please try again.";
// //       toast.error(message, {
// //         position: "bottom-right",
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className={cn(
// //         "flex flex-col gap-6 rounded-xl bg-background p-6 shadow-md",
// //         className
// //       )}
// //       {...props}
// //     >
// //       <FieldGroup>
// //         <div className="flex flex-col items-center gap-1 text-center">
// //           <div className="flex justify-center mb-4">
// //             <Image src={logo} alt="Logo" width={70} height={70} />
// //           </div>
// //           <h1 className="text-2xl font-bold">Create your account</h1>
// //         </div>

// //         <Field>
// //           <FieldLabel htmlFor="name">Full Name</FieldLabel>
// //           <Input id="name" name="name" type="text" placeholder="John Doe" required />
// //         </Field>

// //         <Field>
// //           <FieldLabel htmlFor="email">Email</FieldLabel>
// //           <Input
// //             id="email"
// //             name="email"
// //             type="email"
// //             placeholder="m@example.com"
// //             required
// //           />
// //         </Field>

// //         <Field>
// //           <FieldLabel htmlFor="admin_id">Admin ID</FieldLabel>
// //           <Input
// //             id="admin_id"
// //             name="admin_id"
// //             type="text"
// //             placeholder="001"
// //             required
// //           />
// //         </Field>

// //         <Field>
// //           <FieldLabel htmlFor="password">Password</FieldLabel>
// //           <Input id="password" name="password" type="password" required />
// //           <FieldDescription>Must be at least 8 characters long.</FieldDescription>
// //         </Field>

// //         <Field>
// //           <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
// //           <Input
// //             id="confirm-password"
// //             name="confirm-password"
// //             type="password"
// //             required
// //           />
// //           <FieldDescription>Please confirm your password.</FieldDescription>
// //         </Field>

// //         <Field>
// //           <Button type="submit" disabled={isLoading}>
// //             {isLoading ? "Creating Account..." : "Create Account"}
// //           </Button>
// //         </Field>

// //         <FieldDescription className="px-6 text-center">
// //           Already have an account?{" "}
// //           <Link href="/login" className="text-primary hover:underline">
// //             Sign in
// //           </Link>
// //         </FieldDescription>
// //       </FieldGroup>
// //     </form>
// //   );
// // }
// // "use client";

// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Field,
// //   FieldDescription,
// //   FieldGroup,
// //   FieldLabel,
// // } from "@/components/ui/field";
// // import { Input } from "@/components/ui/input";
// // import Link from "next/link";
// // import { toast } from "sonner";
// // import Image from "next/image";
// // import logo from "@/public/images/apeiron_pte_ltd_logo.jpg";
// // import { useState } from "react";
// // import { registerAdmin, type AdminRegisterPayload } from "@/app/api/services/auth";

// // export function SignupForm({
// //   className,
// //   ...props
// // }: React.ComponentProps<"form">) {
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsLoading(true);

// //     const formData = new FormData(e.currentTarget);

// //     const payload: AdminRegisterPayload = {
// //       admin_name: formData.get("name") as string,
// //       admin_email: formData.get("email") as string,
// //       admin_id: formData.get("admin_id") as string,
// //       password: formData.get("password") as string,
// //       confirm_password: formData.get("confirm-password") as string,
// //     };

// //     try {
// //       const result = await registerAdmin(payload);

// //       toast.success(result.message || "Registered successfully!", {
// //         position: "bottom-right",
// //       });

// //       // Clear form after successful registration
// //       e.currentTarget.reset();

// //       // Optional: Redirect to login page after success
// //       // setTimeout(() => router.push("/login"), 1500);

// //     } catch (error) {
// //       const message =
// //         error instanceof Error
// //           ? error.message
// //           : "Registration failed. Please try again.";

// //       toast.error(message, {
// //         position: "bottom-right",
// //       });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className={cn(
// //         "flex flex-col gap-6 rounded-xl bg-background p-6 shadow-md",
// //         className
// //       )}
// //       {...props}
// //     >
// //       <FieldGroup>
// //         <div className="flex flex-col items-center gap-1 text-center">
// //           <div className="flex justify-center mb-4">
// //             <Image
// //               src={logo}
// //               alt="Logo"
// //               width={70}
// //               height={70}
// //               className="object-contain"
// //             />
// //           </div>
// //           <h1 className="text-2xl font-bold">Create your account</h1>
// //         </div>

// //         <Field>
// //           <FieldLabel htmlFor="name">Full Name</FieldLabel>
// //           <Input
// //             id="name"
// //             name="name"
// //             type="text"
// //             placeholder="John Doe"
// //             required
// //             className="bg-background"
// //           />
// //         </Field>

// //         <Field>
// //           <FieldLabel htmlFor="email">Email</FieldLabel>
// //           <Input
// //             id="email"
// //             name="email"
// //             type="email"
// //             placeholder="m@example.com"
// //             required
// //             className="bg-background"
// //           />
// //         </Field>

// //         <Field>
// //           <FieldLabel htmlFor="admin_id">Admin ID</FieldLabel>
// //           <Input
// //             id="admin_id"
// //             name="admin_id"
// //             type="text"
// //             placeholder="008"
// //             required
// //             className="bg-background"
// //           />
// //         </Field>

// //         <Field>
// //           <FieldLabel htmlFor="password">Password</FieldLabel>
// //           <Input
// //             id="password"
// //             name="password"
// //             type="password"
// //             required
// //             className="bg-background"
// //           />
// //           <FieldDescription>
// //             Must be at least 8 characters long.
// //           </FieldDescription>
// //         </Field>

// //         <Field>
// //           <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
// //           <Input
// //             id="confirm-password"
// //             name="confirm-password"
// //             type="password"
// //             required
// //             className="bg-background"
// //           />
// //           <FieldDescription>Please confirm your password.</FieldDescription>
// //         </Field>

// //         <Field>
// //           <Button type="submit" disabled={isLoading} className="w-full">
// //             {isLoading ? "Creating Account..." : "Create Account"}
// //           </Button>
// //         </Field>

// //         <FieldDescription className="px-6 text-center text-sm">
// //           Already have an account?{" "}
// //           <Link
// //             href="/login"
// //             className="text-primary hover:underline font-medium"
// //           >
// //             Sign in
// //           </Link>
// //         </FieldDescription>
// //       </FieldGroup>
// //     </form>
// //   );
// // }

// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { toast } from "sonner";
// import Image from "next/image";
// import logo from "@/public/images/apeiron_pte_ltd_logo.jpg";
// import { useState } from "react";
// import { registerAdmin, type AdminRegisterPayload } from "@/app/api/services/auth";

// export function SignupForm({
//   className,
//   ...props
// }: React.ComponentProps<"form">) {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const formData = new FormData(e.currentTarget);

//     const payload: AdminRegisterPayload = {
//       admin_name: formData.get("name") as string,
//       admin_email: formData.get("email") as string,
//       admin_id: formData.get("admin_id") as string,
//       password: formData.get("password") as string,
//       confirm_password: formData.get("confirm-password") as string,
//     };

//     try {
//       const result = await registerAdmin(payload);

//       // Fixed: Safe access to message without red line
//       toast.success(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         (result as any)?.message || "Registered successfully!",
//         {
//           position: "bottom-right",
//         }
//       );

//       e.currentTarget.reset();   // Clear the form after success

//     } catch (error: unknown) {
//       let errorMessage = "Registration failed. Please try again.";

//       if (error instanceof Error) {
//         errorMessage = error.message;
//       } else if (typeof error === "string") {
//         errorMessage = error;
//       } else if (error && typeof error === "object" && "message" in error) {
//         errorMessage = String((error as { message?: string }).message);
//       }

//       toast.error(errorMessage, {
//         position: "bottom-right",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className={cn(
//         "flex flex-col gap-6 rounded-xl bg-background p-6 shadow-md",
//         className
//       )}
//       {...props}
//     >
//       <FieldGroup>
//         <div className="flex flex-col items-center gap-1 text-center">
//           <div className="flex justify-center mb-4">
//             <Image
//               src={logo}
//               alt="Logo"
//               width={70}
//               height={70}
//               className="object-contain"
//             />
//           </div>
//           <h1 className="text-2xl font-bold">Create your account</h1>
//         </div>

//         <Field>
//           <FieldLabel htmlFor="name">Full Name</FieldLabel>
//           <Input id="name" name="name" type="text" placeholder="John Doe" required className="bg-background" />
//         </Field>

//         <Field>
//           <FieldLabel htmlFor="email">Email</FieldLabel>
//           <Input id="email" name="email" type="email" placeholder="m@example.com" required className="bg-background" />
//         </Field>

//         <Field>
//           <FieldLabel htmlFor="admin_id">Admin ID</FieldLabel>
//           <Input id="admin_id" name="admin_id" type="text" placeholder="008" required className="bg-background" />
//         </Field>

//         <Field>
//           <FieldLabel htmlFor="password">Password</FieldLabel>
//           <Input id="password" name="password" type="password" required className="bg-background" />
//           <FieldDescription>Must be at least 8 characters long.</FieldDescription>
//         </Field>

//         <Field>
//           <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
//           <Input id="confirm-password" name="confirm-password" type="password" required className="bg-background" />
//           <FieldDescription>Please confirm your password.</FieldDescription>
//         </Field>

//         <Field>
//           <Button type="submit" disabled={isLoading} className="w-full">
//             {isLoading ? "Creating Account..." : "Create Account"}
//           </Button>
//         </Field>

//         <FieldDescription className="px-6 text-center text-sm">
//           Already have an account?{" "}
//           <Link href="/login" className="text-primary hover:underline font-medium">
//             Sign in
//           </Link>
//         </FieldDescription>
//       </FieldGroup>
//     </form>
//   );
// }

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import logo from "@/public/images/apeiron_pte_ltd_logo.jpg";
import { useState } from "react";
import { registerAdmin, type AdminRegisterPayload } from "@/app/api/services/auth";
import { useRouter } from "next/navigation";   // ← Added this

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();   // ← Added this

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent multiple clicks
    if (isLoading) return;

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload: AdminRegisterPayload = {
      admin_name: formData.get("name") as string,
      admin_email: formData.get("email") as string,
      admin_id: formData.get("admin_id") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirm-password") as string,
    };

    try {
      const result = await registerAdmin(payload);

      // Success Case
      toast.success(result?.message || "Registered successfully!", {
        position: "bottom-right",
      });

      // Clear form
      e.currentTarget.reset();

      // Auto redirect to login after success
      setTimeout(() => {
        router.push("/login");
      }, 1200);

    } catch (error: unknown) {
      let errorMessage = "Registration failed. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String((error as { message?: string }).message);
      }

      // Show proper backend error like "Admin ID already exists"
      toast.error(errorMessage, {
        position: "bottom-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
              height={70}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold">Create your account</h1>
        </div>

        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" name="name" type="text" placeholder="John Doe" required className="bg-background" />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required className="bg-background" />
        </Field>

        <Field>
          <FieldLabel htmlFor="admin_id">Admin ID</FieldLabel>
          <Input id="admin_id" name="admin_id" type="text" placeholder="008" required className="bg-background" />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" required className="bg-background" />
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input id="confirm-password" name="confirm-password" type="password" required className="bg-background" />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>

        <Field>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="w-full"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </Field>

        <FieldDescription className="px-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
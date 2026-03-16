import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/public/images/apeiron_pte_ltd_logo.jpg";
import Image from "next/image";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function EmployeeRegistrationForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        toast.success("Employee registered successfully!", {
          position: "bottom-right",
        });
      }}
      className={cn(
        "flex flex-col gap-6 rounded-xl bg-background p-6 shadow-[0_-2px_10px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.08)]",
        className,
      )}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          {/* <div className="flex justify-center mb-4">
            <Image
              src={logo}
              alt="Logo"
              width={70}
              height={10}
            />
          </div> */}

          <h1 className="text-2xl font-bold">Employee Registration</h1>
        </div>

        {/* Employee ID */}
        <Field>
          <FieldLabel htmlFor="empid">Employee ID</FieldLabel>
          <Input
            id="empid"
            type="text"
            placeholder="EMP001"
            required
            className="bg-background"
          />
        </Field>

        {/* Employee Name */}
        <Field>
          <FieldLabel htmlFor="empname">Employee Name</FieldLabel>
          <Input
            id="empname"
            type="text"
            placeholder="Employee Name"
            required
            className="bg-background"
          />
        </Field>

        {/* Profile Image */}
        <Field>
          <FieldLabel htmlFor="image1">Image 1</FieldLabel>

          <div className="relative">
            <Input
              id="image1"
              type="file"
              accept="image/*"
              className="
    h-10
    bg-background
    cursor-pointer
    file:h-full
    file:px-4
    file:mr-3
    file:border-0
    file:border-r
    file:border-border
    file:bg-muted
    file:text-sm
    file:font-medium
    file:rounded-none
    file:cursor-pointer
    hover:file:bg-muted/80
  "
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                </TooltipTrigger>

                <TooltipContent>
                  <p className="text-sm">
                    Upload 3 images of the employee:
                    <br />
                    • Front view
                    <br />
                    • Left side
                    <br />
                    • Right side
                    <br />
                    Ensure good lighting and clear face visibility.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="image2">Image 2</FieldLabel>

          <div className="relative">
            <Input
              id="image2"
              type="file"
              accept="image/*"
              className="
    h-10
    bg-background
    cursor-pointer
    file:h-full
    file:px-4
    file:mr-3
    file:border-0
    file:border-r
    file:border-border
    file:bg-muted
    file:text-sm
    file:font-medium
    file:rounded-none
    file:cursor-pointer
    hover:file:bg-muted/80
  "
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                </TooltipTrigger>

                <TooltipContent>
                  <p className="text-sm">
                    Upload 3 images of the employee:
                    <br />
                    • Front view
                    <br />
                    • Left side
                    <br />
                    • Right side
                    <br />
                    Ensure good lighting and clear face visibility.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Field>
        <Field>
          <FieldLabel htmlFor="image3">Image 3</FieldLabel>

          <div className="relative">
            <Input
              id="image3"
              type="file"
              accept="image/*"
              className="
    h-10
    bg-background
    cursor-pointer
    file:h-full
    file:px-4
    file:mr-3
    file:border-0
    file:border-r
    file:border-border
    file:bg-muted
    file:text-sm
    file:font-medium
    file:rounded-none
    file:cursor-pointer
    hover:file:bg-muted/80
  "
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                </TooltipTrigger>

                <TooltipContent>
                  <p className="text-sm">
                    Upload 3 images of the employee:
                    <br />
                    • Front view
                    <br />
                    • Left side
                    <br />
                    • Right side
                    <br />
                    Ensure good lighting and clear face visibility.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Field>

        <Field>
          <Button type="submit">Register Employee</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}

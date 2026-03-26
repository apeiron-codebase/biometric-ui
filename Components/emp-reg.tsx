import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { registerEmployee } from "@/app/api/admin";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export function EmployeeRegistrationForm({
  className,
}: React.ComponentProps<"form">) {

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // ✅ validation
    if (
      !formData.get("image1") ||
      !formData.get("image2") ||
      !formData.get("image3")
    ) {
      toast.error("Please upload all 3 images");
      setLoading(false);
      return;
    }

    const { ok, data, error } = await registerEmployee(formData);

    if (ok && data) {
      toast.success(data.message || "Employee registered successfully");
      e.currentTarget.reset(); // ✅ clear form
    } else {
      toast.error(data?.message || "Server error");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-6 rounded-xl bg-background p-6 border shadow-md",
        className
      )}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Employee Registration</h1>
        </div>

        {/* Employee ID */}
        <Field>
          <FieldLabel htmlFor="empid">Employee ID</FieldLabel>
          <Input
            id="empid"
            name="employee_code"   // ✅ FIXED
            type="text"
            placeholder="EMP001"
            required
          />
        </Field>

        {/* Employee Name */}
        <Field>
          <FieldLabel htmlFor="empname">Employee Name</FieldLabel>
          <Input
            id="empname"
            name="employee_name"   // ✅ FIXED
            type="text"
            placeholder="Employee Name"
            required
          />
        </Field>

        {/* Image Input UI */}
        {["image1", "image2", "image3"].map((img, index) => (
          <Field key={img}>
            <FieldLabel htmlFor={img}>Image {index + 1}</FieldLabel>

            <div className="relative">
              <Input
                id={img}
                name={img}
                type="file"
                accept="image/*"
                required
                className="h-10 bg-background cursor-pointer file:h-full file:px-4 file:mr-3 file:border-0 file:border-r file:border-border file:bg-muted file:text-sm file:font-medium file:rounded-none file:cursor-pointer hover:file:bg-muted/80"
              />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                  </TooltipTrigger>

                  <TooltipContent>
                    <p className="text-sm">
                      Upload:
                      <br />• Front view
                      <br />• Left side
                      <br />• Right side
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Field>
        ))}

        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register Employee"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
"use client"

import { ChangePasswordForm } from "@/components/change-password";
import { EmailEntryForm } from "@/components/email-entry-form"
import { OTPForm } from "@/components/otp-form"
import { useForgotPasswordMutation, useOtpVerificationMutation, useResetPasswordMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
export default function OTPPage() {

  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const [
    forgotPassword,
    {
      isLoading,
      isSuccess,
      isError,
      error,
      data,
    }
  ] = useForgotPasswordMutation();

  const [
    otpVerification,
    {
      isLoading: isOtpLoading,
      isSuccess: isOtpSuccess,
      isError: isOtpError,
      error: otpError,
      data: otpData,
    }
  ] = useOtpVerificationMutation();

  const [
    resetPassword,
    {
      isLoading: isResetLoading,
      isSuccess: isResetSuccess,
      isError: isResetError,
      error: resetError,
      data: resetData,
    }
  ] = useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log("Forgot password request successful:", data);
      setCurrentStep(1); // Move to OTP step
    } else if (isError) { 
      console.error("Forgot password request failed:", error);
    }
  }, [isSuccess, isError, data, error]);

  useEffect(() => {
    if (isOtpSuccess) {
      console.log("OTP verification successful:", otpData);
      setCurrentStep(2);
      // Proceed to next step, e.g., reset password
    }
    else if (isOtpError) {
      console.error("OTP verification failed:", otpError);
    }
  }, [isOtpSuccess, isOtpError, otpData, otpError]);

  useEffect(() => {
    if (isResetSuccess) {
      console.log("Password reset successful:", resetData);
      router.push("/login");
      // Possibly redirect to login page
    } else if (isResetError) {
      console.error("Password reset failed:", resetError);
    } 
  }, [isResetSuccess, isResetError, resetData, resetError]);

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* <OTPForm /> */}
        {
          currentStep === 0 ? (
            <EmailEntryForm
              onEmailSubmit={(email:string) => {
                console.log("Clicked", email);
                setEmail(email);
                forgotPassword({ email });
              }}
            />
            ) : currentStep === 1 ? (
            <OTPForm
              onOTPSubmit={(otp:string) => {
                console.log("OTP Submitted:", otp);
                setOtp(otp);
                otpVerification({ email, otp });
              }}
            />
          ) : currentStep === 2 ? (
            <ChangePasswordForm
              onPasswordSubmit={(password: {
                newPassword: string
                confirmPassword: string
              }) => {
                resetPassword({ email, otp, ...password });
                console.log("Password Changed:", password);
              }}
            />
          ) : null
        }

      </div>
    </div>
  )
}
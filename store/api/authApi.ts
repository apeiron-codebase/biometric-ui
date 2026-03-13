// store/api/employeeApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryPublic } from "./baseQuery";
const baseUrl = "http://localhost:3001";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryPublic,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `${baseUrl}/api/auth/forgot-password`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    otpVerification: builder.mutation({
      query: (body) => ({
        url: "/auth/otp-verification",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useOtpVerificationMutation,
  useLogoutMutation,
} = authApi;

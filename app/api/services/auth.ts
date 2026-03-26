// // // app/api/services/auth.ts

// // const API_BASE = "https://seamus-choosey-overcarelessly.ngrok-free.dev";

// // export interface AdminRegisterPayload {
// //   admin_name: string;
// //   admin_email: string;
// //   admin_id: string;
// //   password: string;
// //   confirm_password: string;
// // }

// // export interface AdminLoginPayload {
// //   admin_email: string;
// //   password: string;
// // }

// // export interface ApiResponse<T = unknown> {
// //   success: boolean;
// //   message?: string;
// //   data?: T;
// //   error?: string;
// // }

// // // ====================== HELPER FUNCTION ======================
// // async function apiRequest<T>(
// //   endpoint: string,
// //   options: RequestInit = {}
// // ): Promise<T> {
// //   const response = await fetch(`${API_BASE}${endpoint}`, {
// //     ...options,
// //     headers: {
// //       "Content-Type": "application/json",
// //       "ngrok-skip-browser-warning": "true",   // Important for free ngrok
// //       ...options.headers,
// //     },
// //   });

// //   if (!response.ok) {
// //     const errorData = await response.json().catch(() => ({}));
// //     throw new Error(errorData.message || errorData.error || "Something went wrong");
// //   }

// //   return response.json();
// // }

// // // ====================== REGISTER ADMIN ======================
// // export async function registerAdmin(payload: AdminRegisterPayload) {
// //   return apiRequest<ApiResponse>("/admin-register", {
// //     method: "POST",
// //     body: JSON.stringify(payload),
// //   });
// // }

// // // ====================== LOGIN ADMIN ======================
// // export async function loginAdmin(payload: AdminLoginPayload) {
// //   return apiRequest<ApiResponse>("/admin-login", {
// //     method: "POST",
// //     body: JSON.stringify(payload),
// //   });
// // }
// // app/api/services/auth.ts

// const NEXT_API_BASE = "/api";   // Next.js proxy use pannum

// export interface AdminRegisterPayload {
//   admin_name: string;
//   admin_email: string;
//   admin_id: string;
//   password: string;
//   confirm_password: string;
// }

// async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
//   const response = await fetch(`${NEXT_API_BASE}${endpoint}`, options);

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || errorData.error || "Something went wrong");
//   }

//   return response.json();
// }

// export async function registerAdmin(payload: AdminRegisterPayload) {
//   return apiRequest("/admin-register", {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
// }

// app/api/services/auth.ts

// const NEXT_API_BASE = "/api";

// export interface AdminRegisterPayload {
//   admin_name: string;
//   admin_email: string;
//   admin_id: string;
//   password: string;
//   confirm_password: string;
// }

// export interface ApiResponse {
//   success?: boolean;
//   message?: string;
//   error?: string;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   data?: any;
// }

// // Reusable API helper
// async function apiRequest<T = ApiResponse>(
//   endpoint: string,
//   options: RequestInit = {}
// ): Promise<T> {
//   const response = await fetch(`${NEXT_API_BASE}${endpoint}`, options);

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(errorData.message || errorData.error || "Something went wrong");
//   }

//   return response.json();
// }

// // Register Admin
// export async function registerAdmin(payload: AdminRegisterPayload) {
//   return apiRequest<ApiResponse>("/admin-register", {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
// }

const NEXT_API_BASE = "/api";

export interface AdminRegisterPayload {
  admin_name: string;
  admin_email: string;
  admin_id: string;
  password: string;
  confirm_password: string;
}

export interface ApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

// ✅ Reusable API helper (UPDATED)
async function apiRequest<T = ApiResponse>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${NEXT_API_BASE}${endpoint}`, options);

  const data = await response.json().catch(() => ({}));

  // 🔥 Handle BOTH cases:
  // 1. Real HTTP errors (status != 2xx)
  // 2. Fake success (200 but backend sends error)
  if (!response.ok || data.error) {
    throw new Error(data.message || data.error || "Something went wrong");
  }

  return data;
}

// Register Admin (UNCHANGED ✅)
export async function registerAdmin(payload: AdminRegisterPayload) {
  return apiRequest<ApiResponse>("/admin-register", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
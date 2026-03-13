import {
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

interface RefreshTokenResponse {
  accessToken: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Base query for authenticated requests
 */
const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { endpoint }) => {
    // ❌ Do NOT attach Authorization for refresh endpoint
    if (endpoint === "refreshToken") {
      headers.set("Content-Type", "application/json");
      return headers;
    }

    const token = Cookies.get("accessToken");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");
    return headers;
  },
});

/**
 * BaseQuery with automatic refresh handling
 */
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // Access token expired
  if (result.error?.status === 401) {
    // Prevent infinite loop
    if (
      typeof args !== "string" &&
      args.url.includes("/auth/refresh-token")
    ) {
      forceLogout();
      return result;
    }

    // Attempt refresh
    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: {
          refreshToken: Cookies.get("refreshToken"),
        },
      },
      {
        ...api,
        endpoint: "refreshToken", // 👈 important
      },
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken } =
        refreshResult.data as RefreshTokenResponse;

      if (accessToken) {
        Cookies.set("accessToken", accessToken, { path: "/" });
      }

      // Retry original request (headers rebuilt)
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      forceLogout();
    }
  }

  return result;
};

/**
 * Public (unauthenticated) base query
 */
export const baseQueryPublic = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Centralized logout handler
 */
function forceLogout() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

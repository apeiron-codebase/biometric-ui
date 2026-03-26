// // app/api/admin-register/route.ts
// import { NextRequest, NextResponse } from "next/server";

// const API_BASE = "https://seamus-choosey-overcarelessly.ngrok-free.dev";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const response = await fetch(`${API_BASE}/admin-register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "ngrok-skip-browser-warning": "true",
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(data, { status: response.status });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Proxy error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to connect to server" },
//       { status: 500 }
//     );
//   }
// }

// app/api/admin-register/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://seamus-choosey-overcarelessly.ngrok-free.dev";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE}/admin-register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to connect to server" },
      { status: 500 }
    );
  }
}
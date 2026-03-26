import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://seamus-choosey-overcarelessly.ngrok-free.dev";

export async function POST(request: NextRequest) {
  try {
    // ✅ IMPORTANT: use formData instead of json
    const formData = await request.formData();

    const response = await fetch(`${API_BASE}/register-employee`, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
        // ❌ DO NOT set Content-Type manually for FormData
      },
      body: formData, // ✅ send directly
    });

    // ✅ Safe response parsing
    let data;
    try {
      data = await response.json();
    } catch {
      const text = await response.text();
      console.error("Non-JSON response from backend:", text);

      return NextResponse.json(
        { error: "Invalid response from server" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Proxy error:", error);

    return NextResponse.json(
      { error: "Failed to connect to server" },
      { status: 500 }
    );
  }
}
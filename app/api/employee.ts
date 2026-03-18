export async function registerEmployee(formData: FormData) {
  try {
    // 🔥 simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 🔍 (optional) see what frontend sends
    for (const [key, value] of formData.entries()) {
  console.log(key, value);
}

    // ✅ fake success response
    return {
      ok: true,
      data: {
        message: "Employee registered successfully (mock)",
      },
    };
  } catch (error) {
    return { ok: false, error };
  }
}
const API_BASE_URL = "https://mind-club-backend.onrender.com/api" 
// || 'http://localhost:5000/api';

export async function loginApi(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return response.json();
  }
  
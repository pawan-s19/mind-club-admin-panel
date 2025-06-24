const API_BASE_URL =
// 'http://localhost:5000/api';

 "https://mind-club-backend-1.onrender.com/api" 

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

// Utility to handle fetch with token and expired token logic
export async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    ...(init.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const response = await fetch(input, { ...init, headers });
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/signin';
    throw new Error('Session expired. Redirecting to sign in.');
  }
  return response;
}
  
// Online Workshop API service

// const API_BASE_URL = "https://mind-club-backend-1.onrender.com/api";
//  ||
const API_BASE_URL =   'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

// Online Workshop API functions
export const onlineWorkshopApi = {
  // Create a new online workshop
  createOnlineWorkshop: async (workshopData: any) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }
    console.log(workshopData, "workshotpdata");
    const response = await fetch(`${API_BASE_URL}/online-workshops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workshopData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  },

  // Get all online workshops
  getOnlineWorkshops: async () => {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/online-workshops`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    // Return the data array from the response
    return result.data || [];
  },

  // Get a specific online workshop by ID
  getOnlineWorkshopById: async (id: string) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/online-workshops/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    // Return the data from the response
    return result.data || result;
  },

  // Update an online workshop
  updateOnlineWorkshop: async (id: string, workshopData: any) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    console.log(workshopData, 'workshopdata')

    const response = await fetch(`${API_BASE_URL}/online-workshops/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workshopData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    // Return the data from the response
    return result.data || result;
  },

  // Delete an online workshop
  deleteOnlineWorkshop: async (id: string) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/online-workshops/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  },
};

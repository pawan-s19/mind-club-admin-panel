const API_BASE_URL = 
// "https://mind-club-backend-1.onrender.com/api"
//  ||
 'http://localhost:5000/api';
const WORKSHOP_API_URL = `${API_BASE_URL}/workshops`;

import { fetchWithAuth } from './authApi';

// Workshop API functions
export const createWorkshopApi = async (workshopData: any) => {
  try {
    const response = await fetchWithAuth(WORKSHOP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workshopData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getWorkshopsApi = async () => {
  try {
    console.log(import.meta.env , "import.meta.env");
    const response = await fetchWithAuth(WORKSHOP_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    // Return the data array from the response structure
    return responseData.data || responseData;
  } catch (error) {
    throw error;
  }
};

export const getWorkshopByIdApi = async (id: string) => {
  try {
    const response = await fetchWithAuth(`${WORKSHOP_API_URL}/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateWorkshopApi = async (id: string, workshopData: any) => {
  try {
    const response = await fetchWithAuth(`${WORKSHOP_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workshopData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkshopApi = async (id: string) => {
  try {
    const response = await fetchWithAuth(`${WORKSHOP_API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}; 
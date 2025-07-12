const API_BASE_URL = 
"https://mind-club-backend-1df6.onrender.com/api"
//  ||
//  'http://localhost:5000/api';
const LANDING_API_URL = `${API_BASE_URL}/landing`;

import { fetchWithAuth } from './authApi';

// Landing API functions
export const createLandingApi = async (landingData: any) => {
  try {
    const response = await fetchWithAuth(LANDING_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(landingData)
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

export const getLandingApi = async () => {
  try {
    console.log('getLandingApi - Making request to:', LANDING_API_URL);
    const response = await fetchWithAuth(LANDING_API_URL, {
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
    console.log('getLandingApi - Response:', responseData);
    // Return the first landing page from the array, or null if no data
    const result = responseData.data && responseData.data.length > 0 ? responseData.data[0] : null;
    console.log('getLandingApi - Returning:', result);
    return result;
  } catch (error) {
    console.error('getLandingApi - Error:', error);
    throw error;
  }
};

export const getLandingByIdApi = async (id: string) => {
  try {
    console.log('getLandingByIdApi - Making request to:', `${LANDING_API_URL}/${id}`);
    const response = await fetchWithAuth(`${LANDING_API_URL}/${id}`, {
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
    console.log('getLandingByIdApi - Response:', responseData);
    // Return the data directly since it's a single item
    const result = responseData.data || responseData;
    console.log('getLandingByIdApi - Returning:', result);
    return result;
  } catch (error) {
    console.error('getLandingByIdApi - Error:', error);
    throw error;
  }
};

export const updateLandingApi = async (landingData: any, id?: string) => {
  try {
    const url = id ? `${LANDING_API_URL}/${id}` : LANDING_API_URL;
    const response = await fetchWithAuth(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(landingData)
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
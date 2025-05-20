import apiClient from './api';

interface TokenData {
  access_token: string;
  token_type: string;
}

// Login function
export const login = async (email: string, password: string, userType: string): Promise<TokenData> => {
  try {
    const response = await apiClient.post<TokenData>('http://127.0.0.1:8000/login', {
      email,
      password,
      userType,
    });
    localStorage.setItem('accessToken', response.data.access_token);
    localStorage.setItem('tokenType', response.data.token_type);
    localStorage.setItem('userType', userType);
    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error);
    throw error.response ? error.response.data : error;
  }
};

// Signup function
export const signup = async (name: string, email: string, password: string, userType: string) => {
  try {
    const response = await apiClient.post('http://127.0.0.1:8000/users', {
      email,
      password,
      userType,
      name,
    });
    return response.data;
  } catch (error: any) {
    console.error('Signup failed', error);
    throw error.response ? error.response.data : error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('tokenType');
  localStorage.removeItem('userType');
  localStorage.removeItem('user_profile'); // Also clear stored profile
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken');
};

// Get user type from localStorage
export const getUserType = (): "user" | "therapist" | null => {
  return localStorage.getItem("userType") as "user" | "therapist" | null;
};

// Get user profile from API
export const getUserProfile = async (): Promise<any> => {
  if (!isAuthenticated()) {
    return null;
  }

  try {
    const response = await apiClient.get('http://127.0.0.1:8000/users/me');
    const profile = response.data;

    // Optionally cache profile in localStorage
    localStorage.setItem("user_profile", JSON.stringify(profile));

    return profile;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
};



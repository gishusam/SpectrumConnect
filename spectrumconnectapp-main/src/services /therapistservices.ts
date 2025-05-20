import apiClient from './api';
import { Therapist } from '../lib/types';
import { TherapistProfileData } from '../lib/types'

export const getAllTherapists = async (): Promise<Therapist[]> => {
  const response = await apiClient.get('http://127.0.0.1:8000/therapists');
  return response.data;  
}

export const getTherapistById = async (id: number): Promise<Therapist> => {
  const response = await apiClient.get(`/therapists/${id}`);
  return response.data;
}

export const createTherapistProfile = async (profileData: TherapistProfileData) => {
  const response = await apiClient.post("/therapists", profileData);
  return response.data;
};


export const checkTherapistProfileStatus = async (token: string) => {
  try {
    const response = await apiClient.get('http://127.0.0.1:8000/therapists/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const therapist = response.data;
    const isProfileComplete = therapist.specialization && therapist.experience && therapist.bio;
    return !!isProfileComplete;
  } catch (error: any) {
    console.error("Error checking therapist profile:", error);
    return false;
  }
};
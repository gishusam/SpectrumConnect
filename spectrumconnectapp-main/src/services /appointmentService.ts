// src/services/appointmentService.ts
import apiClient from './api';
import { Appointment, AppointmentRequest } from '../lib/types';

// Create new appointment
export const bookAppointment = async (appointmentData: AppointmentRequest) => {
  const response = await apiClient.post('/appointments/', appointmentData);
  return response.data;
};

// Get appointments based on user type
export const getAppointments = async (userType: string): Promise<Appointment[]> => {
  if (userType === 'therapist') {
    const response = await apiClient.get('/appointments/pending');
    return response.data;
  } else if (userType === 'user') {
    const response = await apiClient.get('/appointments/confirmed');
    return response.data;
  } else {
    throw new Error('Unknown user type');
  }
};

// Confirm an appointment (for therapists)
export const confirmAppointments = async (appointmentId: number) => {
  const response = await apiClient.put(`/appointments/${appointmentId}/confirm`);
  return response.data;
};

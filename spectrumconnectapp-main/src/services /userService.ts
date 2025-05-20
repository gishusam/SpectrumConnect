import apiClient from './api';

export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await apiClient.post('/users/upload-profile-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.image_url;
}; 
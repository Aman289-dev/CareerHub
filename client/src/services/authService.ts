import apiClient from './apiClient';
import type { ApiResponse, AuthResponse, User } from '../types';

export async function registerRequest(data: {
  name: string;
  email: string;
  password: string;
  role: 'candidate' | 'employer';
}): Promise<ApiResponse<AuthResponse>> {
  const response = await apiClient.post('/auth/register', data);
  return response.data;
}

export async function loginRequest(data: {
  email: string;
  password: string;
}): Promise<ApiResponse<AuthResponse>> {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
}

export async function getProfileRequest(): Promise<ApiResponse<User>> {
  const response = await apiClient.get('/auth/profile');
  return response.data;
}

export async function updateProfileRequest(data: Partial<Pick<User, 'name' | 'phone' | 'avatar' | 'resumeUrl'>>): Promise<ApiResponse<User>> {
  const response = await apiClient.put('/auth/profile', data);
  return response.data;
}

export async function uploadResumeRequest(file: File): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData();
  formData.append('resume', file);
  const response = await apiClient.post('/auth/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function uploadAvatarRequest(file: File): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData();
  formData.append('avatar', file);
  const response = await apiClient.post('/auth/upload-avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

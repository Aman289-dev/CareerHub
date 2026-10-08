import apiClient from './apiClient';
import type { ApiResponse, SavedJob } from '../types';

export async function saveJobRequest(jobId: string): Promise<ApiResponse<SavedJob>> {
  const response = await apiClient.post('/saved-jobs', { jobId });
  return response.data;
}

export async function unsaveJobRequest(jobId: string): Promise<ApiResponse<void>> {
  const response = await apiClient.delete(`/saved-jobs/${jobId}`);
  return response.data;
}

export async function fetchSavedJobsRequest(): Promise<ApiResponse<SavedJob[]>> {
  const response = await apiClient.get('/saved-jobs');
  return response.data;
}

export async function checkIfJobSavedRequest(jobId: string): Promise<ApiResponse<{ isSaved: boolean }>> {
  const response = await apiClient.get(`/saved-jobs/check/${jobId}`);
  return response.data;
}

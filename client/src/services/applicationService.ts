import apiClient from './apiClient';
import type { ApiResponse, Application, ApplicationStatus } from '../types';

export async function applyToJobRequest(data: {
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
}): Promise<ApiResponse<Application>> {
  const response = await apiClient.post('/applications/apply', data);
  return response.data;
}

export async function fetchMyApplicationsRequest(): Promise<ApiResponse<Application[]>> {
  const response = await apiClient.get('/applications/my-applications');
  return response.data;
}

export async function fetchJobApplicantsRequest(jobId: string): Promise<ApiResponse<Application[]>> {
  const response = await apiClient.get(`/applications/job/${jobId}/applicants`);
  return response.data;
}

export async function updateApplicationStatusRequest(
  applicationId: string,
  status: ApplicationStatus
): Promise<ApiResponse<Application>> {
  const response = await apiClient.put(`/applications/${applicationId}/status`, { status });
  return response.data;
}

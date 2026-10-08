import apiClient from './apiClient';
import type { ApiResponse, Job, JobFilters, JobListResponse } from '../types';

export async function fetchJobsRequest(filters?: JobFilters): Promise<ApiResponse<JobListResponse>> {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });
  }
  const response = await apiClient.get(`/jobs?${params.toString()}`);
  return response.data;
}

export async function fetchFeaturedJobsRequest(limit?: number): Promise<ApiResponse<Job[]>> {
  const response = await apiClient.get(`/jobs/featured${limit ? `?limit=${limit}` : ''}`);
  return response.data;
}

export async function fetchJobByIdRequest(jobId: string): Promise<ApiResponse<Job>> {
  const response = await apiClient.get(`/jobs/${jobId}`);
  return response.data;
}

export async function createJobRequest(data: Partial<Job>): Promise<ApiResponse<Job>> {
  const response = await apiClient.post('/jobs', data);
  return response.data;
}

export async function updateJobRequest(jobId: string, data: Partial<Job>): Promise<ApiResponse<Job>> {
  const response = await apiClient.put(`/jobs/${jobId}`, data);
  return response.data;
}

export async function deleteJobRequest(jobId: string): Promise<ApiResponse<void>> {
  const response = await apiClient.delete(`/jobs/${jobId}`);
  return response.data;
}

export async function fetchJobsByCompanyRequest(companyId: string): Promise<ApiResponse<Job[]>> {
  const response = await apiClient.get(`/jobs/company/${companyId}`);
  return response.data;
}

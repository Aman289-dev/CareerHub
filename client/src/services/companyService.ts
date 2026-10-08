import apiClient from './apiClient';
import type { ApiResponse, Company } from '../types';

export async function fetchCompaniesRequest(): Promise<ApiResponse<Company[]>> {
  const response = await apiClient.get('/companies');
  return response.data;
}

export async function fetchCompanyByIdRequest(companyId: string): Promise<ApiResponse<Company>> {
  const response = await apiClient.get(`/companies/${companyId}`);
  return response.data;
}

export async function createCompanyRequest(data: Partial<Company>): Promise<ApiResponse<Company>> {
  const response = await apiClient.post('/companies', data);
  return response.data;
}

export async function updateCompanyRequest(companyId: string, data: Partial<Company>): Promise<ApiResponse<Company>> {
  const response = await apiClient.put(`/companies/${companyId}`, data);
  return response.data;
}

export async function deleteCompanyRequest(companyId: string): Promise<ApiResponse<void>> {
  const response = await apiClient.delete(`/companies/${companyId}`);
  return response.data;
}

export async function fetchMyCompaniesRequest(): Promise<ApiResponse<Company[]>> {
  const response = await apiClient.get('/companies/my-companies');
  return response.data;
}

export async function uploadLogoRequest(file: File): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData();
  formData.append('logo', file);
  const response = await apiClient.post('/companies/upload-logo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

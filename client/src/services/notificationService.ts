import apiClient from './apiClient';
import type { ApiResponse, Notification } from '../types';

export async function fetchNotificationsRequest(): Promise<ApiResponse<Notification[]>> {
  const response = await apiClient.get('/notifications');
  return response.data;
}

export async function markNotificationAsReadRequest(notificationId: string): Promise<ApiResponse<Notification>> {
  const response = await apiClient.put(`/notifications/${notificationId}/read`);
  return response.data;
}

export async function markAllNotificationsAsReadRequest(): Promise<ApiResponse<void>> {
  const response = await apiClient.put('/notifications/mark-all-read');
  return response.data;
}

export async function fetchUnreadCountRequest(): Promise<ApiResponse<{ count: number }>> {
  const response = await apiClient.get('/notifications/unread-count');
  return response.data;
}

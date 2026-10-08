import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNotificationsRequest, fetchUnreadCountRequest } from '../../services/notificationService';
import type { Notification } from '../../types';

interface NotificationsState {
  items: Notification[];
  unreadCount: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NotificationsState = {
  items: [],
  unreadCount: 0,
  status: 'idle',
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchNotificationsRequest();
      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch notifications');
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch notifications');
    }
  }
);

export const fetchUnreadCount = createAsyncThunk(
  'notifications/fetchUnreadCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUnreadCountRequest();
      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch unread count');
      }
      return response.data.count;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch unread count');
    }
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsReadLocal(state, action) {
      const notification = state.items.find((n) => n._id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsReadLocal(state) {
      state.items.forEach((n) => (n.read = true));
      state.unreadCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      });
  },
});

export const { markAsReadLocal, markAllAsReadLocal } = notificationsSlice.actions;
export default notificationsSlice.reducer;

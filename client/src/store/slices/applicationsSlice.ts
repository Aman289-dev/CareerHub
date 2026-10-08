import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMyApplicationsRequest } from '../../services/applicationService';
import type { Application } from '../../types';

interface ApplicationsState {
  items: Application[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ApplicationsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchMyApplications = createAsyncThunk(
  'applications/fetchMyApplications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchMyApplicationsRequest();
      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch applications');
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch applications');
    }
  }
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyApplications.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default applicationsSlice.reducer;

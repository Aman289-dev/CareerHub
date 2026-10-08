import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSavedJobsRequest } from '../../services/savedJobService';
import type { SavedJob } from '../../types';

interface SavedJobsState {
  items: SavedJob[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SavedJobsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchSavedJobs = createAsyncThunk(
  'savedJobs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchSavedJobsRequest();
      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch saved jobs');
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch saved jobs');
    }
  }
);

const savedJobsSlice = createSlice({
  name: 'savedJobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedJobs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSavedJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default savedJobsSlice.reducer;

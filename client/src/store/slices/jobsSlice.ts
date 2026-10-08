import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchJobsRequest, fetchFeaturedJobsRequest } from '../../services/jobService';
import type { Job, JobFilters, JobListResponse } from '../../types';

interface JobsState {
  items: Job[];
  featuredItems: Job[];
  filters: JobFilters;
  total: number;
  page: number;
  totalPages: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  featuredStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: JobsState = {
  items: [],
  featuredItems: [],
  filters: {},
  total: 0,
  page: 1,
  totalPages: 0,
  status: 'idle',
  featuredStatus: 'idle',
  error: null,
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchAll',
  async (filters: JobFilters | undefined, { rejectWithValue }) => {
    try {
      const response = await fetchJobsRequest(filters);
      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch jobs');
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch jobs');
    }
  }
);

export const fetchFeaturedJobs = createAsyncThunk(
  'jobs/fetchFeatured',
  async (limit: number | undefined, { rejectWithValue }) => {
    try {
      const response = await fetchFeaturedJobsRequest(limit);
      if (!response.success || !response.data) {
        return rejectWithValue(response.error || 'Failed to fetch featured jobs');
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch featured jobs');
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearJobs(state) {
      state.items = [];
      state.total = 0;
      state.page = 1;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.jobs;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Fetch Featured Jobs
      .addCase(fetchFeaturedJobs.pending, (state) => {
        state.featuredStatus = 'loading';
      })
      .addCase(fetchFeaturedJobs.fulfilled, (state, action) => {
        state.featuredStatus = 'succeeded';
        state.featuredItems = action.payload;
      })
      .addCase(fetchFeaturedJobs.rejected, (state) => {
        state.featuredStatus = 'failed';
      });
  },
});

export const { setFilters, setPage, clearJobs } = jobsSlice.actions;
export default jobsSlice.reducer;

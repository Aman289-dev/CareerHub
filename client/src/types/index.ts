// Standard response envelope returned by the Express backend.
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer';
  avatar?: string;
  resumeUrl?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Company {
  _id: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  location?: string;
  industry?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type RemoteType = 'remote' | 'on-site' | 'hybrid';
export type JobStatus = 'open' | 'closed';

export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements?: string[];
  company: Company | string;
  postedBy: User | string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  experienceLevel?: string;
  jobType: JobType;
  remoteType: RemoteType;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export type ApplicationStatus = 'applied' | 'reviewed' | 'interview' | 'rejected' | 'hired';

export interface Application {
  _id: string;
  job: Job | string;
  candidate: User | string;
  resumeUrl?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedJob {
  _id: string;
  user: string;
  job: Job;
  createdAt: string;
  updatedAt: string;
}

export type NotificationType = 'application_update' | 'new_application' | 'job_update' | 'system';

export interface Notification {
  _id: string;
  user: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobFilters {
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  experienceLevel?: string;
  jobType?: JobType;
  remoteType?: RemoteType;
  search?: string;
  sortBy?: 'newest' | 'salary';
  page?: number;
  limit?: number;
}

export interface JobListResponse {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
}

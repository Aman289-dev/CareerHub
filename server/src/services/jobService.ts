import Job, { IJob } from '../models/Job';
import Company from '../models/Company';

interface JobFilterInput {
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  experienceLevel?: string;
  jobType?: string;
  remoteType?: string;
  status?: string;
  search?: string;
  sortBy?: 'newest' | 'salary';
  page?: number;
  limit?: number;
}

interface JobListResult {
  jobs: IJob[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getJobs(filter: JobFilterInput): Promise<JobListResult> {
  const {
    location,
    salaryMin,
    salaryMax,
    experienceLevel,
    jobType,
    remoteType,
    status = 'open',
    search,
    sortBy = 'newest',
    page = 1,
    limit = 10,
  } = filter;

  const query: any = {};

  if (status) query.status = status;
  if (location) query.location = { $regex: location, $options: 'i' };
  if (experienceLevel) query.experienceLevel = experienceLevel;
  if (jobType) query.jobType = jobType;
  if (remoteType) query.remoteType = remoteType;

  if (salaryMin !== undefined || salaryMax !== undefined) {
    query.$and = [];
    if (salaryMin !== undefined) {
      query.$and.push({ $or: [{ salaryMax: { $gte: salaryMin } }, { salaryMax: null }] });
    }
    if (salaryMax !== undefined) {
      query.$and.push({ $or: [{ salaryMin: { $lte: salaryMax } }, { salaryMin: null }] });
    }
    if (query.$and.length === 0) delete query.$and;
  }

  if (search) {
    query.$text = { $search: search };
  }

  const sortOptions: any = {};
  if (sortBy === 'newest') {
    sortOptions.createdAt = -1;
  } else if (sortBy === 'salary') {
    sortOptions.salaryMax = -1;
  }
  if (search) {
    sortOptions.score = { $meta: 'textScore' };
  }

  const skip = (page - 1) * limit;

  const [jobs, total] = await Promise.all([
    Job.find(query)
      .populate('company', 'name logo location industry')
      .populate('postedBy', 'name')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit),
    Job.countDocuments(query),
  ]);

  return {
    jobs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getJobById(jobId: string): Promise<IJob | null> {
  return Job.findById(jobId)
    .populate('company')
    .populate('postedBy', 'name email');
}

export async function createJob(input: Partial<IJob>): Promise<IJob> {
  return Job.create(input);
}

export async function updateJob(jobId: string, updates: Partial<IJob>): Promise<IJob | null> {
  return Job.findByIdAndUpdate(jobId, updates, { new: true })
    .populate('company', 'name logo location industry');
}

export async function deleteJob(jobId: string): Promise<boolean> {
  const result = await Job.findByIdAndDelete(jobId);
  return !!result;
}

export async function getJobsByCompany(companyId: string): Promise<IJob[]> {
  return Job.find({ company: companyId })
    .populate('company', 'name logo')
    .sort({ createdAt: -1 });
}

export async function getFeaturedJobs(limit: number = 6): Promise<IJob[]> {
  return Job.find({ status: 'open' })
    .populate('company', 'name logo location industry')
    .sort({ createdAt: -1 })
    .limit(limit);
}

import SavedJob, { ISavedJob } from '../models/SavedJob';

export async function saveJob(userId: string, jobId: string): Promise<ISavedJob> {
  const existing = await SavedJob.findOne({ user: userId, job: jobId });
  if (existing) {
    return existing.populate('job', 'title company location jobType salaryMin salaryMax');
  }

  const saved = await SavedJob.create({ user: userId, job: jobId });
  return saved.populate('job', 'title company location jobType salaryMin salaryMax');
}

export async function unsaveJob(userId: string, jobId: string): Promise<boolean> {
  const result = await SavedJob.findOneAndDelete({ user: userId, job: jobId });
  return !!result;
}

export async function getSavedJobs(userId: string): Promise<ISavedJob[]> {
  return SavedJob.find({ user: userId })
    .populate({
      path: 'job',
      populate: { path: 'company', select: 'name logo location industry' },
    })
    .sort({ createdAt: -1 });
}

export async function isJobSaved(userId: string, jobId: string): Promise<boolean> {
  const saved = await SavedJob.findOne({ user: userId, job: jobId });
  return !!saved;
}

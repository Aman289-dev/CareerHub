import Application, { IApplication } from '../models/Application';
import Job from '../models/Job';
import Notification from '../models/Notification';

interface CreateApplicationInput {
  job: string;
  candidate: string;
  resumeUrl?: string;
  coverLetter?: string;
}

export async function createApplication(input: CreateApplicationInput): Promise<IApplication> {
  // Check if job exists and is open
  const job = await Job.findById(input.job);
  if (!job) {
    const err = new Error('Job not found');
    (err as any).statusCode = 404;
    throw err;
  }
  if (job.status !== 'open') {
    const err = new Error('This job is no longer accepting applications');
    (err as any).statusCode = 400;
    throw err;
  }

  // Check for duplicate application
  const existing = await Application.findOne({ job: input.job, candidate: input.candidate });
  if (existing) {
    const err = new Error('You have already applied to this job');
    (err as any).statusCode = 400;
    throw err;
  }

  const application = await Application.create(input);

  // Notify employer about new application
  await Notification.create({
    user: job.postedBy,
    message: `New application received for "${job.title}"`,
    type: 'new_application',
  });

  return application.populate('job', 'title company').populate('candidate', 'name email');
}

export async function getCandidateApplications(candidateId: string): Promise<IApplication[]> {
  return Application.find({ candidate: candidateId })
    .populate('job', 'title company location jobType status')
    .populate({ path: 'job', populate: { path: 'company', select: 'name logo' } })
    .sort({ appliedAt: -1 });
}

export async function getJobApplications(jobId: string): Promise<IApplication[]> {
  return Application.find({ job: jobId })
    .populate('candidate', 'name email avatar phone resumeUrl')
    .sort({ appliedAt: -1 });
}

export async function updateApplicationStatus(
  applicationId: string,
  status: IApplication['status'],
  employerId: string
): Promise<IApplication | null> {
  const application = await Application.findById(applicationId).populate('job');
  if (!application) {
    const err = new Error('Application not found');
    (err as any).statusCode = 404;
    throw err;
  }

  // Verify the employer owns the job
  const job = application.job as any;
  if (job.postedBy.toString() !== employerId) {
    const err = new Error('Not authorized to update this application');
    (err as any).statusCode = 403;
    throw err;
  }

  application.status = status;
  await application.save();

  // Notify candidate about status change
  const statusMessages: Record<string, string> = {
    reviewed: 'Your application has been reviewed',
    interview: 'You have been invited for an interview',
    rejected: 'Your application was not successful',
    hired: 'Congratulations! You have been hired',
  };

  if (statusMessages[status]) {
    await Notification.create({
      user: application.candidate,
      message: `${statusMessages[status]} for "${job.title}"`,
      type: 'application_update',
    });
  }

  return application.populate('job', 'title company').populate('candidate', 'name email');
}

export async function getApplicationById(applicationId: string): Promise<IApplication | null> {
  return Application.findById(applicationId)
    .populate('job')
    .populate('candidate', 'name email avatar phone resumeUrl');
}

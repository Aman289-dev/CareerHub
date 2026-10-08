import type { Request, Response, NextFunction } from 'express';
import * as jobService from '../services/jobService';

export async function getJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const {
      location,
      salaryMin,
      salaryMax,
      experienceLevel,
      jobType,
      remoteType,
      status,
      search,
      sortBy,
      page,
      limit,
    } = req.query;

    const result = await jobService.getJobs({
      location: location as string,
      salaryMin: salaryMin ? Number(salaryMin) : undefined,
      salaryMax: salaryMax ? Number(salaryMax) : undefined,
      experienceLevel: experienceLevel as string,
      jobType: jobType as string,
      remoteType: remoteType as string,
      status: status as string,
      search: search as string,
      sortBy: sortBy as 'newest' | 'salary',
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    });

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function getJobById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) {
      res.status(404).json({ success: false, error: 'Job not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
}

export async function createJob(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req as any).userId;
    const jobData = {
      ...req.body,
      postedBy: userId,
    };
    const job = await jobService.createJob(jobData);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
}

export async function updateJob(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const job = await jobService.updateJob(req.params.id, req.body);
    if (!job) {
      res.status(404).json({ success: false, error: 'Job not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
}

export async function deleteJob(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await jobService.deleteJob(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Job not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (err) {
    next(err);
  }
}

export async function getFeaturedJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 6;
    const jobs = await jobService.getFeaturedJobs(limit);
    res.json({ success: true, data: jobs });
  } catch (err) {
    next(err);
  }
}

export async function getJobsByCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const jobs = await jobService.getJobsByCompany(req.params.companyId);
    res.json({ success: true, data: jobs });
  } catch (err) {
    next(err);
  }
}

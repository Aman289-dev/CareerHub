import type { Request, Response, NextFunction } from 'express';
import * as applicationService from '../services/applicationService';

export async function applyToJob(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { jobId, coverLetter, resumeUrl } = req.body;

    if (!jobId) {
      res.status(400).json({ success: false, error: 'Job ID is required', statusCode: 400 });
      return;
    }

    const application = await applicationService.createApplication({
      job: jobId,
      candidate: userId,
      coverLetter,
      resumeUrl,
    });

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
}

export async function getMyApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req as any).userId;
    const applications = await applicationService.getCandidateApplications(userId);
    res.json({ success: true, data: applications });
  } catch (err) {
    next(err);
  }
}

export async function getJobApplicants(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const applications = await applicationService.getJobApplications(req.params.jobId);
    res.json({ success: true, data: applications });
  } catch (err) {
    next(err);
  }
}

export async function updateApplicationStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const employerId = (req as any).userId;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({ success: false, error: 'Status is required', statusCode: 400 });
      return;
    }

    const validStatuses = ['applied', 'reviewed', 'interview', 'rejected', 'hired'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ success: false, error: 'Invalid status', statusCode: 400 });
      return;
    }

    const application = await applicationService.updateApplicationStatus(
      req.params.id,
      status,
      employerId
    );

    if (!application) {
      res.status(404).json({ success: false, error: 'Application not found', statusCode: 404 });
      return;
    }

    res.json({ success: true, data: application });
  } catch (err) {
    next(err);
  }
}

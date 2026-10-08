import type { Request, Response, NextFunction } from 'express';
import * as savedJobService from '../services/savedJobService';

export async function saveJob(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { jobId } = req.body;

    if (!jobId) {
      res.status(400).json({ success: false, error: 'Job ID is required', statusCode: 400 });
      return;
    }

    const saved = await savedJobService.saveJob(userId, jobId);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    next(err);
  }
}

export async function unsaveJob(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { jobId } = req.params;

    const deleted = await savedJobService.unsaveJob(userId, jobId);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Saved job not found', statusCode: 404 });
      return;
    }

    res.json({ success: true, message: 'Job removed from saved' });
  } catch (err) {
    next(err);
  }
}

export async function getSavedJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req as any).userId;
    const savedJobs = await savedJobService.getSavedJobs(userId);
    res.json({ success: true, data: savedJobs });
  } catch (err) {
    next(err);
  }
}

export async function checkIfSaved(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { jobId } = req.params;
    const isSaved = await savedJobService.isJobSaved(userId, jobId);
    res.json({ success: true, data: { isSaved } });
  } catch (err) {
    next(err);
  }
}

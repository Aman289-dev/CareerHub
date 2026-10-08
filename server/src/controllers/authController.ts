import type { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400).json({ success: false, error: 'All fields are required', statusCode: 400 });
      return;
    }

    if (!['candidate', 'employer'].includes(role)) {
      res.status(400).json({ success: false, error: 'Invalid role', statusCode: 400 });
      return;
    }

    const result = await authService.registerUser({ name, email, password, role });
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password are required', statusCode: 400 });
      return;
    }

    const result = await authService.loginUser({ email, password });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await authService.getUserById((req as any).userId);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, phone, avatar, resumeUrl } = req.body;
    const user = await authService.updateUserProfile((req as any).userId, { name, phone, avatar, resumeUrl });
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

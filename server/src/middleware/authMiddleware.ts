import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, error: 'Authentication required', statusCode: 401 });
      return;
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET not configured');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ success: false, error: 'User not found', statusCode: 401 });
      return;
    }

    req.userId = user._id.toString();
    req.userRole = user.role;
    next();
  } catch (err) {
    if ((err as any).name === 'JsonWebTokenError' || (err as any).name === 'TokenExpiredError') {
      res.status(401).json({ success: false, error: 'Invalid or expired token', statusCode: 401 });
      return;
    }
    next(err);
  }
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      res.status(403).json({ success: false, error: 'Insufficient permissions', statusCode: 403 });
      return;
    }
    next();
  };
}

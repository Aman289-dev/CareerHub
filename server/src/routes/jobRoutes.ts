import { Router } from 'express';
import * as jobController from '../controllers/jobController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.get('/', jobController.getJobs);
router.get('/featured', jobController.getFeaturedJobs);
router.get('/:id', jobController.getJobById);
router.get('/company/:companyId', jobController.getJobsByCompany);

// Protected employer routes
router.post('/', authenticate, requireRole('employer'), jobController.createJob);
router.put('/:id', authenticate, requireRole('employer'), jobController.updateJob);
router.delete('/:id', authenticate, requireRole('employer'), jobController.deleteJob);

export default router;

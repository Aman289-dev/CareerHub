import { Router } from 'express';
import * as applicationController from '../controllers/applicationController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

// Candidate routes
router.post('/apply', authenticate, requireRole('candidate'), applicationController.applyToJob);
router.get('/my-applications', authenticate, requireRole('candidate'), applicationController.getMyApplications);

// Employer routes
router.get('/job/:jobId/applicants', authenticate, requireRole('employer'), applicationController.getJobApplicants);
router.put('/:id/status', authenticate, requireRole('employer'), applicationController.updateApplicationStatus);

export default router;

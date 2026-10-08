import { Router } from 'express';
import * as savedJobController from '../controllers/savedJobController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, savedJobController.getSavedJobs);
router.post('/', authenticate, savedJobController.saveJob);
router.delete('/:jobId', authenticate, savedJobController.unsaveJob);
router.get('/check/:jobId', authenticate, savedJobController.checkIfSaved);

export default router;

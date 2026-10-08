import { Router } from 'express';
import * as authController from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';
import { uploadResume, uploadAvatar } from '../middleware/uploadMiddleware';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);
router.post('/upload-resume', authenticate, uploadResume, (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, error: 'No file uploaded' });
    return;
  }
  const resumeUrl = `uploads/${req.file.filename}`;
  res.json({ success: true, data: { url: resumeUrl } });
});
router.post('/upload-avatar', authenticate, uploadAvatar, (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, error: 'No file uploaded' });
    return;
  }
  const avatarUrl = `uploads/${req.file.filename}`;
  res.json({ success: true, data: { url: avatarUrl } });
});

export default router;

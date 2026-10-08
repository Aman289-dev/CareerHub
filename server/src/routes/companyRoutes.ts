import { Router } from 'express';
import * as companyController from '../controllers/companyController';
import { authenticate, requireRole } from '../middleware/authMiddleware';
import { uploadLogo } from '../middleware/uploadMiddleware';

const router = Router();

// Public routes
router.get('/', companyController.getCompanies);
router.get('/:id', companyController.getCompanyById);

// Protected employer routes
router.get('/my-companies', authenticate, requireRole('employer'), companyController.getMyCompanies);
router.post('/', authenticate, requireRole('employer'), companyController.createCompany);
router.put('/:id', authenticate, requireRole('employer'), companyController.updateCompany);
router.delete('/:id', authenticate, requireRole('employer'), companyController.deleteCompany);
router.post('/upload-logo', authenticate, requireRole('employer'), uploadLogo, (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, error: 'No file uploaded' });
    return;
  }
  const logoUrl = `uploads/${req.file.filename}`;
  res.json({ success: true, data: { url: logoUrl } });
});

export default router;

import type { Request, Response, NextFunction } from 'express';
import * as companyService from '../services/companyService';

export async function getCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const companies = await companyService.getCompanies();
    res.json({ success: true, data: companies });
  } catch (err) {
    next(err);
  }
}

export async function getCompanyById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) {
      res.status(404).json({ success: false, error: 'Company not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
}

export async function createCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req as any).userId;
    const companyData = {
      ...req.body,
      createdBy: userId,
    };
    const company = await companyService.createCompany(companyData);
    res.status(201).json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
}

export async function updateCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const company = await companyService.updateCompany(req.params.id, req.body);
    if (!company) {
      res.status(404).json({ success: false, error: 'Company not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, data: company });
  } catch (err) {
    next(err);
  }
}

export async function deleteCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await companyService.deleteCompany(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Company not found', statusCode: 404 });
      return;
    }
    res.json({ success: true, message: 'Company deleted successfully' });
  } catch (err) {
    next(err);
  }
}

export async function getMyCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req as any).userId;
    const companies = await companyService.getCompaniesByCreator(userId);
    res.json({ success: true, data: companies });
  } catch (err) {
    next(err);
  }
}

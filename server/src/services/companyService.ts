import Company, { ICompany } from '../models/Company';

export async function getCompanies(): Promise<ICompany[]> {
  return Company.find().sort({ name: 1 });
}

export async function getCompanyById(companyId: string): Promise<ICompany | null> {
  return Company.findById(companyId);
}

export async function createCompany(input: Partial<ICompany>): Promise<ICompany> {
  return Company.create(input);
}

export async function updateCompany(
  companyId: string,
  updates: Partial<ICompany>
): Promise<ICompany | null> {
  return Company.findByIdAndUpdate(companyId, updates, { new: true });
}

export async function deleteCompany(companyId: string): Promise<boolean> {
  const result = await Company.findByIdAndDelete(companyId);
  return !!result;
}

export async function getCompaniesByCreator(userId: string): Promise<ICompany[]> {
  return Company.find({ createdBy: userId }).sort({ createdAt: -1 });
}

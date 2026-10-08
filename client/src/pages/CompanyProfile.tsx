import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, MapPin, Globe, ExternalLink, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, Spinner, Alert, EmptyState } from '@/components/ui';
import JobCard from '@/components/JobCard';
import { fetchCompanyByIdRequest } from '../services/companyService';
import { fetchJobsByCompanyRequest } from '../services/jobService';
import type { Company, Job } from '../types';

export default function CompanyProfile() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        setLoading(true);
        const [companyRes, jobsRes] = await Promise.all([
          fetchCompanyByIdRequest(id),
          fetchJobsByCompanyRequest(id),
        ]);

        if (companyRes.success && companyRes.data) {
          setCompany(companyRes.data);
        } else {
          setError(companyRes.error || 'Company not found');
          return;
        }

        if (jobsRes.success && jobsRes.data) {
          setJobs(jobsRes.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load company');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        data-icod-id="src_pages_companyprofile_tsx_84ba"
      >
        <Spinner size="lg" data-icod-id="src_pages_companyprofile_tsx_0110" />
      </div>
    );
  }

  if (error || !company) {
    return (
      <div
        className="mx-auto max-w-3xl px-4 py-12"
        data-icod-id="src_pages_companyprofile_tsx_41ce"
      >
        <Alert variant="error" data-icod-id="src_pages_companyprofile_tsx_3376">{error || 'Company not found'}</Alert>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background py-10"
      data-icod-id="src_pages_companyprofile_tsx_08a1"
    >
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        data-icod-id="src_pages_companyprofile_tsx_0a84"
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/companies"
            className="mb-6 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            data-icod-id="src_pages_companyprofile_tsx_af3d"
          >
            ← Back to companies
          </Link>
        </motion.div>

        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-10 p-8 shadow-elevated" data-icod-id="src_pages_companyprofile_tsx_6a35">
            <div
              className="flex flex-col gap-6 sm:flex-row sm:items-start"
              data-icod-id="src_pages_companyprofile_tsx_9cc2"
            >
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-24 w-24 rounded-2xl object-cover border border-border/60 shadow-elevated"
                  data-icod-id="src_pages_companyprofile_tsx_8122"
                />
              ) : (
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-primary/10 shadow-soft"
                  data-icod-id="src_pages_companyprofile_tsx_d10b"
                >
                  <Building2
                    className="h-12 w-12 text-primary"
                    data-icod-id="src_pages_companyprofile_tsx_1dd5"
                  />
                </div>
              )}
              <div className="flex-1" data-icod-id="src_pages_companyprofile_tsx_5b9f">
                <h1
                  className="text-3xl font-extrabold font-display text-foreground"
                  data-icod-id="src_pages_companyprofile_tsx_9fd5"
                >
                  {company.name}
                </h1>
                {company.industry && (
                  <p
                    className="mt-1.5 text-lg text-muted-foreground"
                    data-icod-id="src_pages_companyprofile_tsx_8ec6"
                  >
                    {company.industry}
                  </p>
                )}
                <div
                  className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground"
                  data-icod-id="src_pages_companyprofile_tsx_8219"
                >
                  {company.location && (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2.5 py-1"
                      data-icod-id="src_pages_companyprofile_tsx_a197"
                    >
                      <MapPin className="h-4 w-4" data-icod-id="src_pages_companyprofile_tsx_2558" /> {company.location}
                    </span>
                  )}
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2.5 py-1 font-medium text-primary hover:bg-accent/80 transition-colors duration-200"
                      data-icod-id="src_pages_companyprofile_tsx_7c11"
                    >
                      <Globe className="h-4 w-4" data-icod-id="src_pages_companyprofile_tsx_b8a8" /> Visit website <ExternalLink className="h-3 w-3" data-icod-id="src_pages_companyprofile_tsx_f93d" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            {company.description && (
              <div
                className="mt-8 border-t border-border/60 pt-8"
                data-icod-id="src_pages_companyprofile_tsx_abad"
              >
                <h2
                  className="mb-4 text-xl font-bold font-display text-foreground"
                  data-icod-id="src_pages_companyprofile_tsx_5629"
                >
                  About
                </h2>
                <p
                  className="leading-relaxed text-muted-foreground whitespace-pre-line"
                  data-icod-id="src_pages_companyprofile_tsx_6d62"
                >
                  {company.description}
                </p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          data-icod-id="src_pages_companyprofile_tsx_2009"
        >
          <h2
            className="mb-8 flex items-center gap-2.5 text-2xl font-extrabold font-display text-foreground"
            data-icod-id="src_pages_companyprofile_tsx_85ed"
          >
            <Briefcase className="h-6 w-6 text-primary" data-icod-id="src_pages_companyprofile_tsx_b439" />
            Open Positions ({jobs.length})
          </h2>
          {jobs.length === 0 ? (
            <EmptyState
              title="No open positions"
              description="Check back later for new opportunities"
              data-icod-id="src_pages_companyprofile_tsx_0f23"
            />
          ) : (
            <div
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              data-icod-id="src_pages_companyprofile_tsx_bbb0"
            >
              {jobs.map((job) => (
                <Link
                  key={job._id}
                  to={`/jobs/${job._id}`}
                  className="block h-full"
                  data-icod-id={`src_pages_companyprofile_tsx_59e2_${job._id}`}
                >
                  <JobCard
                    job={job}
                    className="h-full hover:border-primary/30 hover:shadow-floating transition-all duration-300"
                    data-icod-id={`src_pages_companyprofile_tsx_43b8_${job._id}`}
                  />
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

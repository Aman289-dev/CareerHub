import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, Spinner, EmptyState } from '@/components/ui';
import ApplicationStatusBadge from '@/components/ApplicationStatusBadge';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMyApplications } from '@/store/slices/applicationsSlice';
import type { Job, Company } from '../types';

export default function Applications() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.applications);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMyApplications());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        data-icod-id="src_pages_applications_tsx_e778"
      >
        <Spinner size="lg" data-icod-id="src_pages_applications_tsx_068d" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background py-10"
      data-icod-id="src_pages_applications_tsx_1433"
    >
      <div
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
        data-icod-id="src_pages_applications_tsx_f5d1"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-4"
          data-icod-id="src_pages_applications_tsx_7a3d"
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary/10 shadow-soft"
            data-icod-id="src_pages_applications_tsx_366f">
            <FileText
              className="h-7 w-7 text-primary"
              data-icod-id="src_pages_applications_tsx_ed69"
            />
          </div>
          <div data-icod-id="src_pages_applications_tsx_e82d">
            <h1
              className="text-3xl font-extrabold font-display text-foreground"
              data-icod-id="src_pages_applications_tsx_82bc"
            >
              My Applications
            </h1>
            <p
              className="mt-1 text-muted-foreground"
              data-icod-id="src_pages_applications_tsx_a84c"
            >
              Track the status of your job applications
            </p>
          </div>
        </motion.div>

        {error ? (
          <div
            className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-destructive shadow-soft"
            data-icod-id="src_pages_applications_tsx_dc25"
          >
            {error}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No applications yet"
            description="Start applying to jobs to track your applications here"
            action={
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elevated hover:shadow-glow hover:brightness-110 transition-all duration-200"
                data-icod-id="src_pages_applications_tsx_5e88"
              >
                <Briefcase className="h-4 w-4" data-icod-id="src_pages_applications_tsx_7709" /> Browse Jobs
              </Link>
            }
            data-icod-id="src_pages_applications_tsx_5b91"
          />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="space-y-4"
            data-icod-id="src_pages_applications_tsx_5c02"
          >
            {items.map((application) => {
              const job = typeof application.job === 'object' ? (application.job as Job) : null;
              const company = job && typeof job.company === 'object' ? (job.company as Company) : null;

              return (
                <motion.div
                  key={application._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    className="group p-5 hover:shadow-elevated hover:border-primary/20 transition-all duration-300"
                    data-icod-id={`src_pages_applications_tsx_fcdd_${application._id}`}
                  >
                    <div
                      className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
                      data-icod-id={`src_pages_applications_tsx_4d20_${application._id}`}
                    >
                      <div
                        className="flex-1 min-w-0"
                        data-icod-id={`src_pages_applications_tsx_6e0d_${application._id}`}
                      >
                        <div
                          className="flex items-start gap-3"
                          data-icod-id={`src_pages_applications_tsx_6f5a_${application._id}`}
                        >
                          {company?.logo ? (
                            <img
                              src={company.logo}
                              alt={company.name}
                              className="h-12 w-12 rounded-xl object-cover border border-border/60 shadow-soft"
                              data-icod-id={`src_pages_applications_tsx_699b_${application._id}`}
                            />
                          ) : (
                            <div
                              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary/10 shadow-soft"
                              data-icod-id={`src_pages_applications_tsx_8dc4_${application._id}`}
                            >
                              <Briefcase
                                className="h-6 w-6 text-primary"
                                data-icod-id={`src_pages_applications_tsx_03cb_${application._id}`}
                              />
                            </div>
                          )}
                          <div
                            className="min-w-0"
                            data-icod-id={`src_pages_applications_tsx_27f3_${application._id}`}
                          >
                            <h3
                              className="font-bold font-display text-foreground truncate group-hover:text-primary transition-colors duration-200"
                              data-icod-id={`src_pages_applications_tsx_7033_${application._id}`}
                            >
                              {job?.title || 'Unknown Job'}
                            </h3>
                            <p
                              className="text-sm text-muted-foreground"
                              data-icod-id={`src_pages_applications_tsx_6ead_${application._id}`}
                            >
                              {company?.name || 'Unknown Company'}
                            </p>
                          </div>
                        </div>
                        <div
                          className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground"
                          data-icod-id={`src_pages_applications_tsx_cb4f_${application._id}`}
                        >
                          {job?.location && <span data-icod-id={`src_pages_applications_tsx_2123_${application._id}`}>{job.location}</span>}
                          <span data-icod-id={`src_pages_applications_tsx_18b3_${application._id}`}>Applied: {new Date(application.appliedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div
                        className="flex items-center gap-3"
                        data-icod-id={`src_pages_applications_tsx_b8a2_${application._id}`}
                      >
                        <ApplicationStatusBadge
                          status={application.status}
                          data-icod-id={`src_pages_applications_tsx_892a_${application._id}`}
                        />
                        {job && (
                          <Link
                            to={`/jobs/${job._id}`}
                            className="text-sm font-medium text-primary hover:underline transition-colors duration-200"
                            data-icod-id={`src_pages_applications_tsx_4361_${application._id}`}
                          >
                            View Job
                          </Link>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}

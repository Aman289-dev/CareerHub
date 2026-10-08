import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock, Building2, ExternalLink, Bookmark, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card, Spinner, Alert, Modal, Field, inputClass } from '@/components/ui';
import { cn } from '@/utils/cn';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchJobByIdRequest } from '../services/jobService';
import { saveJobRequest, unsaveJobRequest, checkIfJobSavedRequest } from '../services/savedJobService';
import { applyToJobRequest } from '../services/applicationService';
import type { Job, Company } from '../types';
import toast from 'react-hot-toast';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadJob = async () => {
      try {
        setLoading(true);
        const response = await fetchJobByIdRequest(id);
        if (response.success && response.data) {
          setJob(response.data);
        } else {
          setError(response.error || 'Job not found');
        }
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load job');
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  useEffect(() => {
    if (user && id) {
      checkIfJobSavedRequest(id)
        .then((res) => setIsSaved(res.data?.isSaved || false))
        .catch(() => {});
    }
  }, [user, id]);

  const handleSaveToggle = async () => {
    if (!user) {
      navigate('/auth?tab=login');
      return;
    }
    if (!id) return;

    try {
      if (isSaved) {
        await unsaveJobRequest(id);
        setIsSaved(false);
        toast.success('Job removed from saved');
      } else {
        await saveJobRequest(id);
        setIsSaved(true);
        toast.success('Job saved successfully');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to update saved status');
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate('/auth?tab=login');
      return;
    }
    if (!id) return;

    try {
      setApplying(true);
      await applyToJobRequest({ jobId: id, coverLetter });
      toast.success('Application submitted successfully!');
      setShowApplyModal(false);
      setCoverLetter('');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        data-icod-id="src_pages_jobdetails_tsx_1c9d"
      >
        <Spinner size="lg" data-icod-id="src_pages_jobdetails_tsx_00f1" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div
        className="mx-auto max-w-3xl px-4 py-12"
        data-icod-id="src_pages_jobdetails_tsx_bcf0"
      >
        <Alert variant="error" data-icod-id="src_pages_jobdetails_tsx_59b3">{error || 'Job not found'}</Alert>
      </div>
    );
  }

  const company = typeof job.company === 'object' ? (job.company as Company) : null;

  const formatSalary = () => {
    if (job.salaryMin && job.salaryMax) {
      return `$${(job.salaryMin / 1000).toFixed(0)}k - $${(job.salaryMax / 1000).toFixed(0)}k`;
    }
    if (job.salaryMin) return `From $${(job.salaryMin / 1000).toFixed(0)}k`;
    if (job.salaryMax) return `Up to $${(job.salaryMax / 1000).toFixed(0)}k`;
    return 'Competitive salary';
  };

  return (
    <div
      className="min-h-screen bg-background py-10"
      data-icod-id="src_pages_jobdetails_tsx_0ea7"
    >
      <div
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
        data-icod-id="src_pages_jobdetails_tsx_05ed"
      >
        {/* Back link */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
          data-icod-id="src_pages_jobdetails_tsx_2f7c"
        >
          ← Back to jobs
        </motion.button>

        {/* Job Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 p-8 shadow-elevated" data-icod-id="src_pages_jobdetails_tsx_bfef">
            <div
              className="flex flex-col gap-6 sm:flex-row sm:items-start"
              data-icod-id="src_pages_jobdetails_tsx_62b7"
            >
              {company?.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-20 w-20 rounded-xl object-cover border border-border/60 shadow-soft"
                  data-icod-id="src_pages_jobdetails_tsx_6510"
                />
              ) : (
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-primary/10 shadow-soft"
                  data-icod-id="src_pages_jobdetails_tsx_0ac0"
                >
                  <Building2
                    className="h-10 w-10 text-primary"
                    data-icod-id="src_pages_jobdetails_tsx_40df"
                  />
                </div>
              )}
              <div className="flex-1" data-icod-id="src_pages_jobdetails_tsx_fb7a">
                <h1
                  className="text-3xl font-extrabold font-display text-foreground"
                  data-icod-id="src_pages_jobdetails_tsx_33fe"
                >
                  {job.title}
                </h1>
                <p
                  className="mt-1.5 text-lg text-muted-foreground"
                  data-icod-id="src_pages_jobdetails_tsx_af7d"
                >
                  {company?.name || 'Unknown Company'}
                </p>
                <div
                  className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground"
                  data-icod-id="src_pages_jobdetails_tsx_05e3"
                >
                  {job.location && (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2.5 py-1"
                      data-icod-id="src_pages_jobdetails_tsx_3d94"
                    >
                      <MapPin className="h-4 w-4" data-icod-id="src_pages_jobdetails_tsx_ffe0" /> {job.location}
                    </span>
                  )}
                  <span
                    className="inline-flex items-center gap-1.5 rounded-md bg-success/5 px-2.5 py-1 text-success"
                    data-icod-id="src_pages_jobdetails_tsx_ea96"
                  >
                    <DollarSign className="h-4 w-4" data-icod-id="src_pages_jobdetails_tsx_fdb6" /> {formatSalary()}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2.5 py-1"
                    data-icod-id="src_pages_jobdetails_tsx_d0cb"
                  >
                    <Briefcase className="h-4 w-4" data-icod-id="src_pages_jobdetails_tsx_9ef9" /> {job.jobType}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2.5 py-1"
                    data-icod-id="src_pages_jobdetails_tsx_db50"
                  >
                    <Clock className="h-4 w-4" data-icod-id="src_pages_jobdetails_tsx_d73d" /> {job.remoteType}
                  </span>
                </div>
              </div>
              <div
                className="flex gap-3 sm:flex-col"
                data-icod-id="src_pages_jobdetails_tsx_00d7"
              >
                <Button
                  onClick={() => setShowApplyModal(true)}
                  disabled={job.status !== 'open'}
                  data-icod-id="src_pages_jobdetails_tsx_8a15"
                >
                  Apply Now
                </Button>
                <Button
                  variant={isSaved ? 'primary' : 'outline'}
                  onClick={handleSaveToggle}
                  data-icod-id="src_pages_jobdetails_tsx_f171"
                >
                  <Bookmark
                    className={cn('h-4 w-4', isSaved && 'fill-current')}
                    data-icod-id="src_pages_jobdetails_tsx_196f"
                  />
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <div
          className="grid gap-8 lg:grid-cols-3"
          data-icod-id="src_pages_jobdetails_tsx_79c8"
        >
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
            data-icod-id="src_pages_jobdetails_tsx_79e5"
          >
            <Card className="p-8 shadow-elevated" data-icod-id="src_pages_jobdetails_tsx_0f2b">
              <h2
                className="mb-5 text-xl font-bold font-display text-foreground"
                data-icod-id="src_pages_jobdetails_tsx_ff81"
              >
                About the Role
              </h2>
              <div
                className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line leading-relaxed"
                data-icod-id="src_pages_jobdetails_tsx_3e01"
              >
                {job.description}
              </div>
            </Card>

            {job.requirements && job.requirements.length > 0 && (
              <Card className="p-8 shadow-elevated" data-icod-id="src_pages_jobdetails_tsx_5761">
                <h2
                  className="mb-5 text-xl font-bold font-display text-foreground"
                  data-icod-id="src_pages_jobdetails_tsx_c689"
                >
                  Requirements
                </h2>
                <ul className="space-y-3" data-icod-id="src_pages_jobdetails_tsx_e196">
                  {job.requirements.map((req, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                      data-icod-id={`src_pages_jobdetails_tsx_d272_${index}`}
                    >
                      <CheckCircle
                        className="mt-0.5 h-5 w-5 shrink-0 text-success"
                        data-icod-id={`src_pages_jobdetails_tsx_b77c_${index}`}
                      />
                      {req}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="space-y-8"
            data-icod-id="src_pages_jobdetails_tsx_a109"
          >
            <Card className="p-6 shadow-elevated" data-icod-id="src_pages_jobdetails_tsx_669d">
              <h3
                className="mb-5 font-bold font-display text-foreground"
                data-icod-id="src_pages_jobdetails_tsx_7dc2"
              >
                Job Details
              </h3>
              <dl
                className="space-y-4 text-sm"
                data-icod-id="src_pages_jobdetails_tsx_8ec2"
              >
                {[
                  { label: 'Experience Level', value: job.experienceLevel || 'Not specified' },
                  { label: 'Job Type', value: job.jobType.replace('-', ' '), capitalize: true },
                  { label: 'Work Style', value: job.remoteType.replace('-', ' '), capitalize: true },
                  { label: 'Posted', value: new Date(job.createdAt).toLocaleDateString() },
                ].map((item) => (
                  <div
                    key={item.label}
                    data-icod-id={`src_pages_jobdetails_tsx_7e61_${item.label}`}>
                    <dt
                      className="text-muted-foreground mb-0.5"
                      data-icod-id={`src_pages_jobdetails_tsx_8060_${item.label}`}>{item.label}</dt>
                    <dd
                      className={cn('font-semibold text-foreground', item.capitalize && 'capitalize')}
                      data-icod-id={`src_pages_jobdetails_tsx_c680_${item.label}`}>
                      {item.value}
                    </dd>
                  </div>
                ))}
                <div data-icod-id="src_pages_jobdetails_tsx_35c2">
                  <dt
                    className="text-muted-foreground mb-0.5"
                    data-icod-id="src_pages_jobdetails_tsx_1fb9">Status</dt>
                  <dd
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold',
                      job.status === 'open'
                        ? 'bg-success/10 text-success ring-1 ring-success/20'
                        : 'bg-destructive/10 text-destructive ring-1 ring-destructive/20'
                    )}
                    data-icod-id="src_pages_jobdetails_tsx_a174"
                  >
                    {job.status === 'open' ? 'Open' : 'Closed'}
                  </dd>
                </div>
              </dl>
            </Card>

            {company && (
              <Card className="p-6 shadow-elevated" data-icod-id="src_pages_jobdetails_tsx_19b6">
                <h3
                  className="mb-4 font-bold font-display text-foreground"
                  data-icod-id="src_pages_jobdetails_tsx_fa47"
                >
                  About {company.name}
                </h3>
                {company.description && (
                  <p
                    className="mb-4 text-sm leading-relaxed text-muted-foreground"
                    data-icod-id="src_pages_jobdetails_tsx_1eaf"
                  >
                    {company.description}
                  </p>
                )}
                <dl
                  className="space-y-3 text-sm"
                  data-icod-id="src_pages_jobdetails_tsx_254a"
                >
                  {company.industry && (
                    <div data-icod-id="src_pages_jobdetails_tsx_06c0">
                      <dt
                        className="text-muted-foreground mb-0.5"
                        data-icod-id="src_pages_jobdetails_tsx_9acf">Industry</dt>
                      <dd className="font-medium text-foreground" data-icod-id="src_pages_jobdetails_tsx_45b9">{company.industry}</dd>
                    </div>
                  )}
                  {company.location && (
                    <div data-icod-id="src_pages_jobdetails_tsx_e7bb">
                      <dt
                        className="text-muted-foreground mb-0.5"
                        data-icod-id="src_pages_jobdetails_tsx_fa8f">Location</dt>
                      <dd className="font-medium text-foreground" data-icod-id="src_pages_jobdetails_tsx_ce18">{company.location}</dd>
                    </div>
                  )}
                  {company.website && (
                    <div data-icod-id="src_pages_jobdetails_tsx_e783">
                      <dt
                        className="text-muted-foreground mb-0.5"
                        data-icod-id="src_pages_jobdetails_tsx_8868">Website</dt>
                      <dd data-icod-id="src_pages_jobdetails_tsx_8a71">
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline transition-colors duration-200"
                          data-icod-id="src_pages_jobdetails_tsx_7e94"
                        >
                          Visit website <ExternalLink className="h-3 w-3" data-icod-id="src_pages_jobdetails_tsx_fb2d" />
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
      {/* Apply Modal */}
      <Modal
        open={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        title="Apply to this Job"
        footer={
          <div
            className="flex justify-end gap-2"
            data-icod-id="src_pages_jobdetails_tsx_9dc0"
          >
            <Button
              variant="outline"
              onClick={() => setShowApplyModal(false)}
              data-icod-id="src_pages_jobdetails_tsx_34e1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              loading={applying}
              data-icod-id="src_pages_jobdetails_tsx_5aa9"
            >
              Submit Application
            </Button>
          </div>
        }
        data-icod-id="src_pages_jobdetails_tsx_c1d8"
      >
        <div className="space-y-4" data-icod-id="src_pages_jobdetails_tsx_5d6e">
          <Field
            label="Cover Letter (Optional)"
            data-icod-id="src_pages_jobdetails_tsx_fa00"
          >
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell us why you're a great fit for this role..."
              className={inputClass('min-h-[150px] resize-y')}
              data-icod-id="src_pages_jobdetails_tsx_4c95"
            />
          </Field>
          <p
            className="text-sm text-muted-foreground"
            data-icod-id="src_pages_jobdetails_tsx_09ce"
          >
            Your profile resume will be automatically attached to your application.
          </p>
        </div>
      </Modal>
    </div>
  );
}

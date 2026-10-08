import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Plus, Edit2, Trash2, Users, XCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Card, Modal, Field, Input, Spinner, EmptyState, Alert, inputClass } from '@/components/ui';
import { cn } from '@/utils/cn';
import ApplicationStatusBadge from '@/components/ApplicationStatusBadge';
import { useAppSelector } from '@/store/hooks';
import { fetchJobsByCompanyRequest, createJobRequest, updateJobRequest, deleteJobRequest } from '../services/jobService';
import { fetchMyCompaniesRequest, createCompanyRequest } from '../services/companyService';
import { fetchJobApplicantsRequest, updateApplicationStatusRequest } from '../services/applicationService';
import type { Job, Company, Application, ApplicationStatus } from '../types';
import toast from 'react-hot-toast';

export default function EmployerDashboard() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  // Job form state
  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    experienceLevel: '',
    jobType: 'full-time' as const,
    remoteType: 'on-site' as const,
    requirements: '',
  });
  const [savingJob, setSavingJob] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'employer') {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const companiesRes = await fetchMyCompaniesRequest();
      if (companiesRes.success && companiesRes.data && companiesRes.data.length > 0) {
        setCompanies(companiesRes.data);
        const jobsRes = await fetchJobsByCompanyRequest(companiesRes.data[0]._id);
        if (jobsRes.success && jobsRes.data) {
          setJobs(jobsRes.data);
        }
      }
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async () => {
    if (!jobForm.title || !jobForm.description) {
      toast.error('Title and description are required');
      return;
    }
    if (companies.length === 0) {
      toast.error('Please create a company first');
      return;
    }

    try {
      setSavingJob(true);
      const jobData = {
        ...jobForm,
        company: companies[0]._id,
        salaryMin: jobForm.salaryMin ? Number(jobForm.salaryMin) : undefined,
        salaryMax: jobForm.salaryMax ? Number(jobForm.salaryMax) : undefined,
        requirements: jobForm.requirements.split('\n').filter(Boolean),
      };

      if (editingJob) {
        await updateJobRequest(editingJob._id, jobData);
        toast.success('Job updated successfully');
      } else {
        await createJobRequest(jobData);
        toast.success('Job created successfully');
      }
      setShowJobModal(false);
      resetJobForm();
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to save job');
    } finally {
      setSavingJob(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await deleteJobRequest(jobId);
      toast.success('Job deleted successfully');
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to delete job');
    }
  };

  const handleToggleJobStatus = async (job: Job) => {
    try {
      const newStatus = job.status === 'open' ? 'closed' : 'open';
      await updateJobRequest(job._id, { status: newStatus });
      toast.success(`Job ${newStatus === 'open' ? 'reopened' : 'closed'}`);
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to update job status');
    }
  };

  const handleViewApplicants = async (jobId: string) => {
    setSelectedJobId(jobId);
    setShowApplicantsModal(true);
    setLoadingApplicants(true);
    try {
      const res = await fetchJobApplicantsRequest(jobId);
      if (res.success && res.data) {
        setApplicants(res.data);
      }
    } catch (err) {
      toast.error('Failed to load applicants');
    } finally {
      setLoadingApplicants(false);
    }
  };

  const handleUpdateApplicantStatus = async (applicationId: string, status: ApplicationStatus) => {
    try {
      await updateApplicationStatusRequest(applicationId, status);
      toast.success('Status updated');
      setApplicants((prev) =>
        prev.map((a) => (a._id === applicationId ? { ...a, status } : a))
      );
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to update status');
    }
  };

  const resetJobForm = () => {
    setJobForm({
      title: '',
      description: '',
      location: '',
      salaryMin: '',
      salaryMax: '',
      experienceLevel: '',
      jobType: 'full-time',
      remoteType: 'on-site',
      requirements: '',
    });
    setEditingJob(null);
  };

  const openEditJob = (job: Job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      description: job.description,
      location: job.location || '',
      salaryMin: job.salaryMin?.toString() || '',
      salaryMax: job.salaryMax?.toString() || '',
      experienceLevel: job.experienceLevel || '',
      jobType: job.jobType,
      remoteType: job.remoteType,
      requirements: job.requirements?.join('\n') || '',
    });
    setShowJobModal(true);
  };

  if (loading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        data-icod-id="src_pages_employerdashboard_tsx_3fb7"
      >
        <Spinner size="lg" data-icod-id="src_pages_employerdashboard_tsx_be51" />
      </div>
    );
  }

  if (!user || user.role !== 'employer') {
    return (
      <div
        className="mx-auto max-w-3xl px-4 py-12"
        data-icod-id="src_pages_employerdashboard_tsx_b928"
      >
        <Alert variant="error" data-icod-id="src_pages_employerdashboard_tsx_5023">Access denied. Employer account required.</Alert>
      </div>
    );
  }

  const selectClass =
    'w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

  return (
    <div
      className="min-h-screen bg-background py-10"
      data-icod-id="src_pages_employerdashboard_tsx_096e"
    >
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        data-icod-id="src_pages_employerdashboard_tsx_52fc"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center justify-between"
          data-icod-id="src_pages_employerdashboard_tsx_b017"
        >
          <div
            className="flex items-center gap-4"
            data-icod-id="src_pages_employerdashboard_tsx_63c2"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary/10 shadow-soft"
              data-icod-id="src_pages_employerdashboard_tsx_74cc">
              <Briefcase
                className="h-7 w-7 text-primary"
                data-icod-id="src_pages_employerdashboard_tsx_3ca6"
              />
            </div>
            <div data-icod-id="src_pages_employerdashboard_tsx_ae47">
              <h1
                className="text-3xl font-extrabold font-display text-foreground"
                data-icod-id="src_pages_employerdashboard_tsx_dbc3"
              >
                Employer Dashboard
              </h1>
              <p
                className="mt-1 text-muted-foreground"
                data-icod-id="src_pages_employerdashboard_tsx_84de"
              >
                Manage your job postings and applicants
              </p>
            </div>
          </div>
          <Button
            onClick={() => { resetJobForm(); setShowJobModal(true); }}
            data-icod-id="src_pages_employerdashboard_tsx_eb86"
          >
            <Plus
              className="mr-2 h-4 w-4"
              data-icod-id="src_pages_employerdashboard_tsx_5fac"
            /> Post New Job
          </Button>
        </motion.div>

        {/* No Company Warning */}
        {companies.length === 0 && (
          <Card
            className="mb-8 border-warning/30 bg-warning/5 p-6 shadow-soft"
            data-icod-id="src_pages_employerdashboard_tsx_1a34"
          >
            <h3
              className="font-bold font-display text-foreground"
              data-icod-id="src_pages_employerdashboard_tsx_fb5a"
            >
              Create Your Company First
            </h3>
            <p
              className="mt-2 text-sm text-muted-foreground"
              data-icod-id="src_pages_employerdashboard_tsx_a3e2"
            >
              You need to create a company profile before posting jobs.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={async () => {
                const name = prompt('Enter your company name:');
                if (name) {
                  try {
                    await createCompanyRequest({ name });
                    toast.success('Company created!');
                    loadData();
                  } catch (err: any) {
                    toast.error(err.response?.data?.error || 'Failed to create company');
                  }
                }
              }}
              data-icod-id="src_pages_employerdashboard_tsx_6244"
            >
              Create Company
            </Button>
          </Card>
        )}

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No job postings yet"
            description="Create your first job posting to start receiving applications"
            action={
              <Button
                onClick={() => { resetJobForm(); setShowJobModal(true); }}
                data-icod-id="src_pages_employerdashboard_tsx_b596"
              >
                <Plus
                  className="mr-2 h-4 w-4"
                  data-icod-id="src_pages_employerdashboard_tsx_3114"
                /> Post Your First Job
              </Button>
            }
            data-icod-id="src_pages_employerdashboard_tsx_55bb"
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
            data-icod-id="src_pages_employerdashboard_tsx_d378"
          >
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card
                  className="group p-5 hover:shadow-elevated hover:border-primary/20 transition-all duration-300"
                  data-icod-id={`src_pages_employerdashboard_tsx_c727_${job._id}`}
                >
                  <div
                    className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                    data-icod-id={`src_pages_employerdashboard_tsx_54d0_${job._id}`}
                  >
                    <div
                      className="flex-1 min-w-0"
                      data-icod-id={`src_pages_employerdashboard_tsx_3301_${job._id}`}
                    >
                      <div
                        className="flex items-center gap-2.5"
                        data-icod-id={`src_pages_employerdashboard_tsx_0f59_${job._id}`}
                      >
                        <h3
                          className="font-bold font-display text-foreground truncate group-hover:text-primary transition-colors duration-200"
                          data-icod-id={`src_pages_employerdashboard_tsx_f8cf_${job._id}`}
                        >
                          {job.title}
                        </h3>
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-0.5 text-xs font-bold ring-1',
                            job.status === 'open'
                              ? 'bg-success/10 text-success ring-success/20'
                              : 'bg-destructive/10 text-destructive ring-destructive/20'
                          )}
                          data-icod-id={`src_pages_employerdashboard_tsx_e2a6_${job._id}`}
                        >
                          {job.status === 'open' ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      <div
                        className="mt-1.5 flex flex-wrap gap-3 text-sm text-muted-foreground"
                        data-icod-id={`src_pages_employerdashboard_tsx_05d8_${job._id}`}
                      >
                        {job.location && <span data-icod-id={`src_pages_employerdashboard_tsx_74f9_${job._id}`}>{job.location}</span>}
                        <span
                          className="capitalize"
                          data-icod-id={`src_pages_employerdashboard_tsx_26ef_${job._id}`}
                        >
                          {job.jobType.replace('-', ' ')}
                        </span>
                        <span
                          className="capitalize"
                          data-icod-id={`src_pages_employerdashboard_tsx_362e_${job._id}`}
                        >
                          {job.remoteType.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-1.5"
                      data-icod-id={`src_pages_employerdashboard_tsx_6c27_${job._id}`}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewApplicants(job._id)}
                        data-icod-id={`src_pages_employerdashboard_tsx_94b7_${job._id}`}
                      >
                        <Users
                          className="mr-1.5 h-4 w-4"
                          data-icod-id={`src_pages_employerdashboard_tsx_3555_${job._id}`}
                        /> Applicants
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditJob(job)}
                        aria-label="Edit job"
                        data-icod-id={`src_pages_employerdashboard_tsx_9975_${job._id}`}
                      >
                        <Edit2
                          className="h-4 w-4"
                          data-icod-id={`src_pages_employerdashboard_tsx_8b9b_${job._id}`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleJobStatus(job)}
                        aria-label="Toggle status"
                        data-icod-id={`src_pages_employerdashboard_tsx_faaa_${job._id}`}
                      >
                        {job.status === 'open' ? <XCircle
                          className="h-4 w-4"
                          data-icod-id={`src_pages_employerdashboard_tsx_aa4b_${job._id}`}
                        /> : <CheckCircle
                          className="h-4 w-4"
                          data-icod-id={`src_pages_employerdashboard_tsx_902c_${job._id}`}
                        />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteJob(job._id)}
                        aria-label="Delete job"
                        data-icod-id={`src_pages_employerdashboard_tsx_eb5a_${job._id}`}
                      >
                        <Trash2
                          className="h-4 w-4 text-destructive"
                          data-icod-id={`src_pages_employerdashboard_tsx_eb5e_${job._id}`}
                        />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      {/* Job Form Modal */}
      <Modal
        open={showJobModal}
        onClose={() => setShowJobModal(false)}
        title={editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
        footer={
          <div
            className="flex justify-end gap-2"
            data-icod-id="src_pages_employerdashboard_tsx_cea3"
          >
            <Button
              variant="outline"
              onClick={() => setShowJobModal(false)}
              data-icod-id="src_pages_employerdashboard_tsx_86a2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveJob}
              loading={savingJob}
              data-icod-id="src_pages_employerdashboard_tsx_ff23"
            >
              {editingJob ? 'Update' : 'Create'}
            </Button>
          </div>
        }
        data-icod-id="src_pages_employerdashboard_tsx_9b59"
      >
        <div
          className="max-h-[70vh] space-y-4 overflow-y-auto pr-2"
          data-icod-id="src_pages_employerdashboard_tsx_e327"
        >
          <Field
            label="Job Title"
            required
            data-icod-id="src_pages_employerdashboard_tsx_6693"
          >
            <Input
              value={jobForm.title}
              onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
              placeholder="e.g. Senior Software Engineer"
              data-icod-id="src_pages_employerdashboard_tsx_388b"
            />
          </Field>
          <Field
            label="Description"
            required
            data-icod-id="src_pages_employerdashboard_tsx_3f23"
          >
            <textarea
              value={jobForm.description}
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
              className={inputClass('min-h-[120px] resize-y')}
              data-icod-id="src_pages_employerdashboard_tsx_6ee3"
            />
          </Field>
          <div
            className="grid gap-4 sm:grid-cols-2"
            data-icod-id="src_pages_employerdashboard_tsx_8383"
          >
            <Field label="Location" data-icod-id="src_pages_employerdashboard_tsx_43c6">
              <Input
                value={jobForm.location}
                onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                placeholder="e.g. San Francisco, CA"
                data-icod-id="src_pages_employerdashboard_tsx_f6a6"
              />
            </Field>
            <Field
              label="Experience Level"
              data-icod-id="src_pages_employerdashboard_tsx_0a41"
            >
              <select
                value={jobForm.experienceLevel}
                onChange={(e) => setJobForm({ ...jobForm, experienceLevel: e.target.value })}
                className={selectClass}
                data-icod-id="src_pages_employerdashboard_tsx_e811"
              >
                <option value="" data-icod-id="src_pages_employerdashboard_tsx_e3cc">Select level</option>
                <option value="Entry Level" data-icod-id="src_pages_employerdashboard_tsx_9cc7">Entry Level</option>
                <option value="Mid Level" data-icod-id="src_pages_employerdashboard_tsx_6a16">Mid Level</option>
                <option value="Senior" data-icod-id="src_pages_employerdashboard_tsx_1874">Senior</option>
                <option value="Lead" data-icod-id="src_pages_employerdashboard_tsx_0577">Lead</option>
                <option value="Executive" data-icod-id="src_pages_employerdashboard_tsx_b0c7">Executive</option>
              </select>
            </Field>
          </div>
          <div
            className="grid gap-4 sm:grid-cols-2"
            data-icod-id="src_pages_employerdashboard_tsx_47cf"
          >
            <Field
              label="Min Salary ($)"
              data-icod-id="src_pages_employerdashboard_tsx_bc5d"
            >
              <Input
                type="number"
                value={jobForm.salaryMin}
                onChange={(e) => setJobForm({ ...jobForm, salaryMin: e.target.value })}
                placeholder="e.g. 80000"
                data-icod-id="src_pages_employerdashboard_tsx_608f"
              />
            </Field>
            <Field
              label="Max Salary ($)"
              data-icod-id="src_pages_employerdashboard_tsx_5ae9"
            >
              <Input
                type="number"
                value={jobForm.salaryMax}
                onChange={(e) => setJobForm({ ...jobForm, salaryMax: e.target.value })}
                placeholder="e.g. 120000"
                data-icod-id="src_pages_employerdashboard_tsx_539b"
              />
            </Field>
          </div>
          <div
            className="grid gap-4 sm:grid-cols-2"
            data-icod-id="src_pages_employerdashboard_tsx_a1a6"
          >
            <Field label="Job Type" data-icod-id="src_pages_employerdashboard_tsx_146d">
              <select
                value={jobForm.jobType}
                onChange={(e) => setJobForm({ ...jobForm, jobType: e.target.value as any })}
                className={selectClass}
                data-icod-id="src_pages_employerdashboard_tsx_598e"
              >
                <option value="full-time" data-icod-id="src_pages_employerdashboard_tsx_5207">Full Time</option>
                <option value="part-time" data-icod-id="src_pages_employerdashboard_tsx_9560">Part Time</option>
                <option value="contract" data-icod-id="src_pages_employerdashboard_tsx_46b4">Contract</option>
                <option value="internship" data-icod-id="src_pages_employerdashboard_tsx_cca3">Internship</option>
              </select>
            </Field>
            <Field label="Remote Type" data-icod-id="src_pages_employerdashboard_tsx_55b9">
              <select
                value={jobForm.remoteType}
                onChange={(e) => setJobForm({ ...jobForm, remoteType: e.target.value as any })}
                className={selectClass}
                data-icod-id="src_pages_employerdashboard_tsx_a9d2"
              >
                <option value="on-site" data-icod-id="src_pages_employerdashboard_tsx_3c42">On-site</option>
                <option value="remote" data-icod-id="src_pages_employerdashboard_tsx_075d">Remote</option>
                <option value="hybrid" data-icod-id="src_pages_employerdashboard_tsx_8d10">Hybrid</option>
              </select>
            </Field>
          </div>
          <Field
            label="Requirements (one per line)"
            data-icod-id="src_pages_employerdashboard_tsx_cc22"
          >
            <textarea
              value={jobForm.requirements}
              onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
              placeholder="Enter each requirement on a new line..."
              className={inputClass('min-h-[100px] resize-y')}
              data-icod-id="src_pages_employerdashboard_tsx_f0ce"
            />
          </Field>
        </div>
      </Modal>
      {/* Applicants Modal */}
      <Modal
        open={showApplicantsModal}
        onClose={() => { setShowApplicantsModal(false); setApplicants([]); }}
        title="Applicants"
        data-icod-id="src_pages_employerdashboard_tsx_bf8f"
      >
        {loadingApplicants ? (
          <div
            className="flex justify-center py-8"
            data-icod-id="src_pages_employerdashboard_tsx_be74"
          >
            <Spinner data-icod-id="src_pages_employerdashboard_tsx_c980" />
          </div>
        ) : applicants.length === 0 ? (
          <EmptyState
            title="No applicants yet"
            description="Applicants will appear here once they apply"
            data-icod-id="src_pages_employerdashboard_tsx_70b6"
          />
        ) : (
          <div
            className="max-h-[60vh] space-y-3 overflow-y-auto pr-2"
            data-icod-id="src_pages_employerdashboard_tsx_5f13"
          >
            {applicants.map((app) => {
              const candidate = typeof app.candidate === 'object' ? app.candidate as any : null;
              return (
                <Card
                  key={app._id}
                  className="p-4 hover:shadow-elevated transition-all duration-200"
                  data-icod-id={`src_pages_employerdashboard_tsx_a2a0_${app._id}`}
                >
                  <div
                    className="flex items-start justify-between gap-3"
                    data-icod-id={`src_pages_employerdashboard_tsx_90a9_${app._id}`}
                  >
                    <div
                      className="min-w-0 flex-1"
                      data-icod-id={`src_pages_employerdashboard_tsx_0c5c_${app._id}`}
                    >
                      <h4
                        className="font-bold font-display text-foreground"
                        data-icod-id={`src_pages_employerdashboard_tsx_4e54_${app._id}`}
                      >
                        {candidate?.name || 'Unknown'}
                      </h4>
                      <p
                        className="text-sm text-muted-foreground"
                        data-icod-id={`src_pages_employerdashboard_tsx_27b7_${app._id}`}
                      >
                        {candidate?.email || ''}
                      </p>
                      {app.coverLetter && (
                        <p
                          className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground"
                          data-icod-id={`src_pages_employerdashboard_tsx_8265_${app._id}`}
                        >
                          {app.coverLetter}
                        </p>
                      )}
                      <p
                        className="mt-1 text-xs text-muted-foreground"
                        data-icod-id={`src_pages_employerdashboard_tsx_7b5f_${app._id}`}
                      >
                        Applied: {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div
                      className="flex flex-col items-end gap-2"
                      data-icod-id={`src_pages_employerdashboard_tsx_4d0d_${app._id}`}
                    >
                      <ApplicationStatusBadge
                        status={app.status}
                        data-icod-id={`src_pages_employerdashboard_tsx_4537_${app._id}`}
                      />
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateApplicantStatus(app._id, e.target.value as ApplicationStatus)}
                        className="rounded-lg border border-input bg-card px-2 py-1 text-xs transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        data-icod-id={`src_pages_employerdashboard_tsx_fa34_${app._id}`}
                      >
                        <option
                          value="applied"
                          data-icod-id={`src_pages_employerdashboard_tsx_e55c_${app._id}`}
                        >Applied</option>
                        <option
                          value="reviewed"
                          data-icod-id={`src_pages_employerdashboard_tsx_96e2_${app._id}`}
                        >Reviewed</option>
                        <option
                          value="interview"
                          data-icod-id={`src_pages_employerdashboard_tsx_62b2_${app._id}`}
                        >Interview</option>
                        <option
                          value="rejected"
                          data-icod-id={`src_pages_employerdashboard_tsx_24d0_${app._id}`}
                        >Rejected</option>
                        <option
                          value="hired"
                          data-icod-id={`src_pages_employerdashboard_tsx_e848_${app._id}`}
                        >Hired</option>
                      </select>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
}

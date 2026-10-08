import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Spinner, EmptyState } from '@/components/ui';
import JobCard from '@/components/JobCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSavedJobs } from '@/store/slices/savedJobsSlice';

export default function SavedJobs() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.savedJobs);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSavedJobs());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        data-icod-id="src_pages_savedjobs_tsx_f663"
      >
        <Spinner size="lg" data-icod-id="src_pages_savedjobs_tsx_96d1" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background py-10"
      data-icod-id="src_pages_savedjobs_tsx_560a"
    >
      <div
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
        data-icod-id="src_pages_savedjobs_tsx_8491"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-4"
          data-icod-id="src_pages_savedjobs_tsx_92fe"
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary/10 shadow-soft"
            data-icod-id="src_pages_savedjobs_tsx_20fc">
            <Bookmark
              className="h-7 w-7 text-primary"
              data-icod-id="src_pages_savedjobs_tsx_b8ad"
            />
          </div>
          <div data-icod-id="src_pages_savedjobs_tsx_5b3c">
            <h1
              className="text-3xl font-extrabold font-display text-foreground"
              data-icod-id="src_pages_savedjobs_tsx_63b6"
            >
              Saved Jobs
            </h1>
            <p
              className="mt-1 text-muted-foreground"
              data-icod-id="src_pages_savedjobs_tsx_f1d9"
            >
              Jobs you've bookmarked for later
            </p>
          </div>
        </motion.div>

        {error ? (
          <div
            className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-destructive shadow-soft"
            data-icod-id="src_pages_savedjobs_tsx_ce63"
          >
            {error}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="No saved jobs yet"
            description="Save jobs you're interested in to review them later"
            action={
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-elevated hover:shadow-glow hover:brightness-110 transition-all duration-200"
                data-icod-id="src_pages_savedjobs_tsx_11e0"
              >
                <Briefcase className="h-4 w-4" data-icod-id="src_pages_savedjobs_tsx_95f7" /> Browse Jobs
              </Link>
            }
            data-icod-id="src_pages_savedjobs_tsx_f643"
          />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid gap-5 sm:grid-cols-2"
            data-icod-id="src_pages_savedjobs_tsx_5f0f"
          >
            {items.map((savedJob) => (
              <motion.div
                key={savedJob._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                data-icod-id={`src_pages_savedjobs_tsx_3289_${savedJob._id}`}
              >
                <Link
                  to={`/jobs/${savedJob.job._id}`}
                  className="block h-full"
                  data-icod-id={`src_pages_savedjobs_tsx_cc55_${savedJob._id}`}>
                  <JobCard
                    job={savedJob.job}
                    isSaved
                    className="h-full hover:border-primary/30 hover:shadow-floating transition-all duration-300"
                    data-icod-id={`src_pages_savedjobs_tsx_4a3e_${savedJob._id}`}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

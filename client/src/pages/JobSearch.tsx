import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Spinner, EmptyState } from '@/components/ui';
import JobCard from '@/components/JobCard';
import FilterSidebar from '@/components/FilterSidebar';
import Pagination from '@/components/Pagination';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchJobs, setFilters, setPage } from '@/store/slices/jobsSlice';
import type { JobFilters } from '@/types';

export default function JobSearch() {
  const dispatch = useAppDispatch();
  const { items, filters, page, totalPages, status, error } = useAppSelector((state) => state.jobs);
  const [searchParams] = useSearchParams();

  // Initialize filters from URL params on mount
  useEffect(() => {
    const urlFilters: JobFilters = {};
    searchParams.forEach((value, key) => {
      if (key === 'salaryMin' || key === 'salaryMax' || key === 'page' || key === 'limit') {
        urlFilters[key as keyof JobFilters] = Number(value);
      } else {
        urlFilters[key as keyof JobFilters] = value;
      }
    });
    if (Object.keys(urlFilters).length > 0) {
      dispatch(setFilters(urlFilters));
    }
  }, []);

  // Fetch jobs when filters or page change
  useEffect(() => {
    dispatch(fetchJobs({ ...filters, page }));
  }, [filters, page, dispatch]);

  const handleFilterChange = (newFilters: JobFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(setPage(1));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen bg-background py-10"
      data-icod-id="src_pages_jobsearch_tsx_46b6"
    >
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        data-icod-id="src_pages_jobsearch_tsx_4a34"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
          data-icod-id="src_pages_jobsearch_tsx_a297"
        >
          <h1
            className="text-4xl font-extrabold font-display text-foreground"
            data-icod-id="src_pages_jobsearch_tsx_64bd"
          >
            Find Jobs
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground"
            data-icod-id="src_pages_jobsearch_tsx_af3a"
          >
            Discover your next opportunity from thousands of job listings
          </p>
        </motion.div>

        <div
          className="flex flex-col gap-8 lg:flex-row"
          data-icod-id="src_pages_jobsearch_tsx_4c30"
        >
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            data-icod-id="src_pages_jobsearch_tsx_379c"
          />

          <main className="flex-1" data-icod-id="src_pages_jobsearch_tsx_1e2a">
            {status === 'loading' ? (
              <div
                className="flex justify-center py-24"
                data-icod-id="src_pages_jobsearch_tsx_3988"
              >
                <Spinner size="lg" data-icod-id="src_pages_jobsearch_tsx_8942" />
              </div>
            ) : error ? (
              <div
                className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-destructive shadow-soft"
                data-icod-id="src_pages_jobsearch_tsx_06cb"
              >
                {error}
              </div>
            ) : items.length === 0 ? (
              <EmptyState
                title="No jobs found"
                description="Try adjusting your filters or search criteria"
                action={
                  <Button
                    variant="outline"
                    onClick={() => handleFilterChange({})}
                    data-icod-id="src_pages_jobsearch_tsx_5c88"
                  >
                    Clear Filters
                  </Button>
                }
                data-icod-id="src_pages_jobsearch_tsx_aa60"
              />
            ) : (
              <>
                <div
                  className="mb-5 text-sm font-medium text-muted-foreground"
                  data-icod-id="src_pages_jobsearch_tsx_d979"
                >
                  Showing {items.length} of {useAppSelector((s) => s.jobs.total)} jobs
                </div>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06 } },
                  }}
                  className="grid gap-5 sm:grid-cols-2"
                  data-icod-id="src_pages_jobsearch_tsx_ec19"
                >
                  {items.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      data-icod-id={`src_pages_jobsearch_tsx_253f_${job._id}`}
                    >
                      <Link
                        to={`/jobs/${job._id}`}
                        className="block h-full"
                        data-icod-id={`src_pages_jobsearch_tsx_f730_${job._id}`}>
                        <JobCard
                          job={job}
                          className="h-full hover:border-primary/30 hover:shadow-floating transition-all duration-300"
                          data-icod-id={`src_pages_jobsearch_tsx_38c7_${job._id}`}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  className="mt-10"
                  data-icod-id="src_pages_jobsearch_tsx_e398"
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

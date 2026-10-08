import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Building2, Users, ArrowRight, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, buttonClass, Card, Spinner, EmptyState } from '@/components/ui';
import JobCard from '@/components/JobCard';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFeaturedJobs } from '@/store/slices/jobsSlice';
import type { Job, Company } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Homepage() {
  const dispatch = useAppDispatch();
  const { featuredItems, featuredStatus } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    if (featuredStatus === 'idle') {
      dispatch(fetchFeaturedJobs(6));
    }
  }, [featuredStatus, dispatch]);

  return (
    <div className="min-h-screen" data-icod-id="src_pages_homepage_tsx_993a">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-hero py-24 sm:py-36"
        data-icod-id="src_pages_homepage_tsx_d24e"
      >
        {/* Decorative background elements */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          data-icod-id="src_pages_homepage_tsx_fba5">
          <div
            className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
            data-icod-id="src_pages_homepage_tsx_f141" />
          <div
            className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/40 blur-3xl"
            data-icod-id="src_pages_homepage_tsx_c6ad" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-radial from-primary/5 to-transparent blur-3xl"
            data-icod-id="src_pages_homepage_tsx_a581" />
        </div>

        <div
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"
          data-icod-id="src_pages_homepage_tsx_e53b"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Accent badge/pill above heading */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-primary/20 backdrop-blur-sm"
              data-icod-id="src_pages_homepage_tsx_badge"
            >
              <Rocket className="h-4 w-4" data-icod-id="src_pages_homepage_tsx_badge_icon" />
              <span data-icod-id="src_pages_homepage_tsx_badge_text">Find your dream job today</span>
            </motion.div>

            {/* Enhanced hero heading with gradient text */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="relative text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05]"
              data-icod-id="src_pages_homepage_tsx_5b39"
            >
              {/* Decorative glow behind text */}
              <span
                className="absolute inset-0 -z-10 blur-2xl opacity-30 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-[gradient-shift_4s_ease-in-out_infinite]"
                aria-hidden="true"
                data-icod-id="src_pages_homepage_tsx_glow"
              />
              <span data-icod-id="src_pages_homepage_tsx_heading_static">Find Your Dream Job at </span>
              <span
                className="bg-gradient-to-r from-primary via-[rgb(168,85,247)] to-[rgb(236,72,153)] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]"
                data-icod-id="src_pages_homepage_tsx_38dc"
              >
                CareerHub
              </span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
              data-icod-id="src_pages_homepage_tsx_edb4"
            >
              Connect with top employers and discover opportunities that match your skills and aspirations.
              Your next career move starts here.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              data-icod-id="src_pages_homepage_tsx_dd2f"
            >
              <Link
                to="/jobs"
                className={buttonClass({ variant: 'primary', size: 'lg' })}
                data-icod-id="src_pages_homepage_tsx_9428"
              >
                <Search className="mr-2 h-5 w-5" data-icod-id="src_pages_homepage_tsx_0c21" />
                Find Jobs
              </Link>
              <Link
                to="/auth?tab=register&role=employer"
                className={buttonClass({ variant: 'outline', size: 'lg' })}
                data-icod-id="src_pages_homepage_tsx_9e96"
              >
                <Building2 className="mr-2 h-5 w-5" data-icod-id="src_pages_homepage_tsx_b03b" />
                Post a Job
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Stats Section */}
      <section
        className="border-y border-border/60 bg-card py-16 shadow-soft"
        data-icod-id="src_pages_homepage_tsx_d7c5"
      >
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          data-icod-id="src_pages_homepage_tsx_a0e1"
        >
          <div
            className="grid grid-cols-1 gap-8 sm:grid-cols-3"
            data-icod-id="src_pages_homepage_tsx_f5bb"
          >
            {[
              { icon: Briefcase, value: '10,000+', label: 'Active Jobs' },
              { icon: Building2, value: '5,000+', label: 'Companies' },
              { icon: Users, value: '1M+', label: 'Candidates' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group flex flex-col items-center text-center"
                data-icod-id={`src_pages_homepage_tsx_stat_${i}`}
              >
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary/10 shadow-soft transition-all duration-300 group-hover:shadow-glow group-hover:scale-110"
                  data-icod-id={`src_pages_homepage_tsx_icon_${i}`}
                >
                  <stat.icon
                    className="h-7 w-7 text-primary"
                    data-icod-id={`src_pages_homepage_tsx_svgicon_${i}`}
                  />
                </div>
                <h3
                  className="text-3xl font-extrabold font-display text-foreground"
                  data-icod-id={`src_pages_homepage_tsx_val_${i}`}
                >
                  {stat.value}
                </h3>
                <p
                  className="mt-1 text-sm font-medium text-muted-foreground"
                  data-icod-id={`src_pages_homepage_tsx_lbl_${i}`}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Jobs Section */}
      <section className="py-20 sm:py-28" data-icod-id="src_pages_homepage_tsx_761d">
        <div
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          data-icod-id="src_pages_homepage_tsx_54d4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex items-end justify-between"
            data-icod-id="src_pages_homepage_tsx_96c3"
          >
            <div data-icod-id="src_pages_homepage_tsx_2113">
              <h2
                className="text-3xl font-extrabold font-display text-foreground sm:text-4xl"
                data-icod-id="src_pages_homepage_tsx_561c"
              >
                Featured Jobs
              </h2>
              <p
                className="mt-2 text-muted-foreground"
                data-icod-id="src_pages_homepage_tsx_421a"
              >
                Latest opportunities from top companies
              </p>
            </div>
            <Link
              to="/jobs"
              className="hidden sm:inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-primary hover:bg-accent transition-all duration-200"
              data-icod-id="src_pages_homepage_tsx_6017"
            >
              View all jobs <ArrowRight className="h-4 w-4" data-icod-id="src_pages_homepage_tsx_8c93" />
            </Link>
          </motion.div>

          {featuredStatus === 'loading' ? (
            <div
              className="flex justify-center py-16"
              data-icod-id="src_pages_homepage_tsx_6407"
            >
              <Spinner size="lg" data-icod-id="src_pages_homepage_tsx_2406" />
            </div>
          ) : featuredItems.length === 0 ? (
            <EmptyState
              title="No jobs yet"
              description="Check back soon for new opportunities"
              data-icod-id="src_pages_homepage_tsx_a052"
            />
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              data-icod-id="src_pages_homepage_tsx_9258"
            >
              {featuredItems.map((job: Job, i) => (
                <motion.div
                  key={job._id}
                  variants={fadeUp}
                  custom={i}
                  data-icod-id={`src_pages_homepage_tsx_97a9_${job._id}`}
                >
                  <Link
                    to={`/jobs/${job._id}`}
                    className="block h-full"
                    data-icod-id={`src_pages_homepage_tsx_f5e4_${job._id}`}>
                    <JobCard
                      job={job}
                      className="h-full hover:border-primary/30 hover:shadow-floating transition-all duration-300"
                      data-icod-id={`src_pages_homepage_tsx_3353_${job._id}`}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div
            className="mt-10 text-center sm:hidden"
            data-icod-id="src_pages_homepage_tsx_00fd"
          >
            <Link
              to="/jobs"
              className={buttonClass({ variant: 'outline' })}
              data-icod-id="src_pages_homepage_tsx_9341"
            >
              View all jobs
            </Link>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section
        className="relative overflow-hidden bg-gradient-primary py-20 sm:py-28"
        data-icod-id="src_pages_homepage_tsx_43c0"
      >
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          data-icod-id="src_pages_homepage_tsx_4797">
          <div
            className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            data-icod-id="src_pages_homepage_tsx_60ab" />
          <div
            className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            data-icod-id="src_pages_homepage_tsx_8fcc" />
        </div>

        <div
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"
          data-icod-id="src_pages_homepage_tsx_dea7"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-3xl font-extrabold font-display text-primary-foreground sm:text-4xl md:text-5xl"
              data-icod-id="src_pages_homepage_tsx_20d9"
            >
              Ready to Take the Next Step?
            </h2>
            <p
              className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/90"
              data-icod-id="src_pages_homepage_tsx_6942"
            >
              Whether you're looking for your next opportunity or searching for top talent,
              CareerHub is here to help.
            </p>
            <div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              data-icod-id="src_pages_homepage_tsx_cfff"
            >
              <Link
                to="/auth?tab=register&role=candidate"
                className={buttonClass({ variant: 'secondary', size: 'lg' })}
                data-icod-id="src_pages_homepage_tsx_df8e"
              >
                I'm a Candidate
              </Link>
              <Link
                to="/auth?tab=register&role=employer"
                className={buttonClass({ variant: 'outline', size: 'lg', className: 'border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10' })}
                data-icod-id="src_pages_homepage_tsx_19f1"
              >
                I'm an Employer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

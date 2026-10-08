import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Globe, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, Spinner, EmptyState } from '@/components/ui';
import { cn } from '@/utils/cn';
import { fetchCompaniesRequest } from '../services/companyService';
import type { Company } from '../types';

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetchCompaniesRequest();
        if (response.success && response.data) {
          setCompanies(response.data);
        } else {
          setError(response.error || 'Failed to load companies');
        }
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load companies');
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  if (loading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        data-icod-id="src_pages_companies_tsx_3374"
      >
        <Spinner size="lg" data-icod-id="src_pages_companies_tsx_012f" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background py-10"
      data-icod-id="src_pages_companies_tsx_e589"
    >
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        data-icod-id="src_pages_companies_tsx_34d0"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
          data-icod-id="src_pages_companies_tsx_d587"
        >
          <h1
            className="text-4xl font-extrabold font-display text-foreground"
            data-icod-id="src_pages_companies_tsx_67c8"
          >
            Companies
          </h1>
          <p
            className="mt-2 text-lg text-muted-foreground"
            data-icod-id="src_pages_companies_tsx_2c5d"
          >
            Explore top companies and discover your next career opportunity
          </p>
        </motion.div>

        {error ? (
          <div
            className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-destructive shadow-soft"
            data-icod-id="src_pages_companies_tsx_113c"
          >
            {error}
          </div>
        ) : companies.length === 0 ? (
          <EmptyState
            title="No companies yet"
            description="Check back soon for new companies"
            data-icod-id="src_pages_companies_tsx_d703"
          />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            data-icod-id="src_pages_companies_tsx_df32"
          >
            {companies.map((company) => (
              <motion.div
                key={company._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card
                  className="group flex h-full flex-col p-6 hover:-translate-y-1 hover:shadow-floating hover:border-primary/20 transition-all duration-300"
                  data-icod-id={`src_pages_companies_tsx_c8b6_${company._id}`}
                >
                  <div
                    className="flex items-start gap-4"
                    data-icod-id={`src_pages_companies_tsx_0b47_${company._id}`}
                  >
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-16 w-16 rounded-xl object-cover border border-border/60 shadow-soft transition-transform duration-300 group-hover:scale-105"
                        data-icod-id={`src_pages_companies_tsx_5035_${company._id}`}
                      />
                    ) : (
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-primary/10 shadow-soft"
                        data-icod-id={`src_pages_companies_tsx_fedb_${company._id}`}
                      >
                        <Building2
                          className="h-8 w-8 text-primary"
                          data-icod-id={`src_pages_companies_tsx_7b09_${company._id}`}
                        />
                      </div>
                    )}
                    <div
                      className="flex-1 min-w-0"
                      data-icod-id={`src_pages_companies_tsx_361d_${company._id}`}
                    >
                      <h3
                        className="font-bold font-display text-foreground truncate group-hover:text-primary transition-colors duration-200"
                        data-icod-id={`src_pages_companies_tsx_cedb_${company._id}`}
                      >
                        {company.name}
                      </h3>
                      {company.industry && (
                        <p
                          className="text-sm text-muted-foreground"
                          data-icod-id={`src_pages_companies_tsx_c47d_${company._id}`}
                        >
                          {company.industry}
                        </p>
                      )}
                    </div>
                  </div>

                  {company.description && (
                    <p
                      className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground"
                      data-icod-id={`src_pages_companies_tsx_4f70_${company._id}`}
                    >
                      {company.description}
                    </p>
                  )}

                  <div
                    className="mt-auto pt-5 space-y-2.5"
                    data-icod-id={`src_pages_companies_tsx_0dbe_${company._id}`}
                  >
                    {company.location && (
                      <div
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                        data-icod-id={`src_pages_companies_tsx_5962_${company._id}`}
                      >
                        <MapPin
                          className="h-4 w-4"
                          data-icod-id={`src_pages_companies_tsx_3253_${company._id}`}
                        />
                        {company.location}
                      </div>
                    )}
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors duration-200"
                        data-icod-id={`src_pages_companies_tsx_0827_${company._id}`}
                      >
                        <Globe
                          className="h-4 w-4"
                          data-icod-id={`src_pages_companies_tsx_729a_${company._id}`}
                        />
                        Visit website
                        <ExternalLink
                          className="h-3 w-3"
                          data-icod-id={`src_pages_companies_tsx_fd28_${company._id}`}
                        />
                      </a>
                    )}
                  </div>

                  <Link
                    to={`/companies/${company._id}`}
                    className="mt-4 inline-block text-sm font-semibold text-primary hover:text-accent-foreground transition-colors duration-200"
                    data-icod-id={`src_pages_companies_tsx_8f34_${company._id}`}
                  >
                    View company profile →
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

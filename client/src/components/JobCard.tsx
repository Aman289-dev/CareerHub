import { MapPin, Briefcase, DollarSign, Clock, Building2, Heart } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { Job, Company } from '@/types';

interface JobCardProps {
  job: Job;
  className?: string;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

export default function JobCard({ job, className, onSave, isSaved }: JobCardProps) {
  const company = typeof job.company === 'object' ? (job.company as Company) : null;

  const formatSalary = () => {
    if (job.salaryMin && job.salaryMax) {
      return `$${(job.salaryMin / 1000).toFixed(0)}k - $${(job.salaryMax / 1000).toFixed(0)}k`;
    }
    if (job.salaryMin) {
      return `From $${(job.salaryMin / 1000).toFixed(0)}k`;
    }
    if (job.salaryMax) {
      return `Up to $${(job.salaryMax / 1000).toFixed(0)}k`;
    }
    return null;
  };

  const salary = formatSalary();

  return (
    <Card
      className={cn(
        'group flex flex-col gap-3 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-floating hover:border-primary/20',
        className,
      )}
      data-icod-id="src_components_jobcard_tsx_cbac"
    >
      <div
        className="flex items-start justify-between gap-4"
        data-icod-id="src_components_jobcard_tsx_1c59"
      >
        <div
          className="flex items-start gap-3"
          data-icod-id="src_components_jobcard_tsx_5ead"
        >
          {company?.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="h-12 w-12 rounded-xl object-cover border border-border/60 shadow-soft transition-transform duration-300 group-hover:scale-105"
              data-icod-id="src_components_jobcard_tsx_1ba6"
            />
          ) : (
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary/10 shadow-soft"
              data-icod-id="src_components_jobcard_tsx_226f"
            >
              <Building2
                className="h-6 w-6 text-primary"
                data-icod-id="src_components_jobcard_tsx_f6ca"
              />
            </div>
          )}
          <div data-icod-id="src_components_jobcard_tsx_e625">
            <h3
              className="font-bold font-display text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200"
              data-icod-id="src_components_jobcard_tsx_ee1c"
            >
              {job.title}
            </h3>
            <p
              className="text-sm text-muted-foreground"
              data-icod-id="src_components_jobcard_tsx_b5da"
            >
              {company?.name || 'Unknown Company'}
            </p>
          </div>
        </div>
        {onSave && (
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSave(job._id);
            }}
            aria-label={isSaved ? 'Unsave job' : 'Save job'}
            className={cn('transition-all duration-200', isSaved && 'text-destructive')}
            data-icod-id="src_components_jobcard_tsx_0afa"
          >
            <Heart
              className={cn('h-5 w-5 transition-all duration-200', isSaved && 'fill-current scale-110')}
              data-icod-id="src_components_jobcard_tsx_a4a9"
            />
          </Button>
        )}
      </div>
      <div
        className="flex flex-wrap gap-2 text-xs text-muted-foreground"
        data-icod-id="src_components_jobcard_tsx_ba53"
      >
        {job.location && (
          <span
            className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-1 transition-colors duration-200 hover:bg-muted"
            data-icod-id="src_components_jobcard_tsx_2432"
          >
            <MapPin className="h-3 w-3" data-icod-id="src_components_jobcard_tsx_eb5d" />
            {job.location}
          </span>
        )}
        {salary && (
          <span
            className="inline-flex items-center gap-1 rounded-md bg-success/5 px-2 py-1 text-success transition-colors duration-200"
            data-icod-id="src_components_jobcard_tsx_22c0"
          >
            <DollarSign className="h-3 w-3" data-icod-id="src_components_jobcard_tsx_8b42" />
            {salary}
          </span>
        )}
        <span
          className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-1"
          data-icod-id="src_components_jobcard_tsx_4d77"
        >
          <Briefcase className="h-3 w-3" data-icod-id="src_components_jobcard_tsx_2dcd" />
          {job.jobType}
        </span>
        <span
          className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-1"
          data-icod-id="src_components_jobcard_tsx_73d6"
        >
          <Clock className="h-3 w-3" data-icod-id="src_components_jobcard_tsx_af1c" />
          {job.remoteType}
        </span>
      </div>
      {job.experienceLevel && (
        <span
          className="inline-block w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-soft"
          data-icod-id="src_components_jobcard_tsx_ec67"
        >
          {job.experienceLevel}
        </span>
      )}
      <div
        className="mt-auto pt-2 text-xs text-muted-foreground"
        data-icod-id="src_components_jobcard_tsx_438d"
      >
        Posted {new Date(job.createdAt).toLocaleDateString()}
      </div>
    </Card>
  );
}

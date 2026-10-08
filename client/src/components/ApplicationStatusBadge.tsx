import { cn } from '@/utils/cn';
import type { ApplicationStatus } from '@/types';

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

const statusStyles: Record<ApplicationStatus, string> = {
  applied: 'bg-primary/10 text-primary ring-1 ring-primary/20',
  reviewed: 'bg-accent text-accent-foreground ring-1 ring-accent-foreground/20',
  interview: 'bg-warning/10 text-warning ring-1 ring-warning/20',
  rejected: 'bg-destructive/10 text-destructive ring-1 ring-destructive/20',
  hired: 'bg-success/10 text-success ring-1 ring-success/20',
};

const statusLabels: Record<ApplicationStatus, string> = {
  applied: 'Applied',
  reviewed: 'Reviewed',
  interview: 'Interview',
  rejected: 'Rejected',
  hired: 'Hired',
};

export default function ApplicationStatusBadge({ status, className }: ApplicationStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-all duration-200',
        statusStyles[status],
        className
      )}
      data-icod-id="src_components_applicationstatusbadge_tsx_3108"
    >
      {statusLabels[status]}
    </span>
  );
}

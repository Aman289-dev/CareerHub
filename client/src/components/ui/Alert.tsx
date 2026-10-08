import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

export type AlertVariant = 'error' | 'success' | 'warning' | 'info';

const variantClass: Record<AlertVariant, string> = {
  error: 'border-destructive/20 bg-destructive/5 text-destructive',
  success: 'border-success/20 bg-success/5 text-success',
  warning: 'border-warning/20 bg-warning/5 text-warning',
  info: 'border-border bg-muted/50 text-muted-foreground',
};

const icons: Record<AlertVariant, typeof Info> = {
  error: XCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
};

export interface AlertProps {
  variant?: AlertVariant;
  className?: string;
  children: ReactNode;
}

/** Inline status banner: form errors, save confirmations, empty-result notices. */
export default function Alert({ variant = 'error', className, children }: AlertProps) {
  const Icon = icons[variant];
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-200',
        variantClass[variant],
        className,
      )}
      data-icod-id="src_components_ui_alert_tsx_55c5">
      <Icon
        className="mt-0.5 h-4 w-4 shrink-0"
        data-icod-id="src_components_ui_alert_tsx_2e90" />
      <div className="min-w-0" data-icod-id="src_components_ui_alert_tsx_5f6c">{children}</div>
    </div>
  );
}

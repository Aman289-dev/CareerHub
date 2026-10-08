import type { ComponentType, ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface EmptyStateProps {
  /** A lucide-react icon component, e.g. icon={StickyNote}. */
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  /** Primary call to action, usually a <Button>. */
  action?: ReactNode;
  className?: string;
}

/** "Nothing here yet" placeholder for empty lists, grids, and search results. */
export default function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-4 py-20 text-center animate-fade-in-up',
        className,
      )}
      data-icod-id="src_components_ui_emptystate_tsx_6ea6">
      <div
        className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary/10 shadow-soft"
        data-icod-id="src_components_ui_emptystate_tsx_a792">
        <Icon
          className="h-9 w-9 text-primary"
          data-icod-id="src_components_ui_emptystate_tsx_c1bd" />
      </div>
      <h3
        className="text-lg font-bold font-display text-foreground"
        data-icod-id="src_components_ui_emptystate_tsx_67d7">{title}</h3>
      {description && (
        <p
          className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground"
          data-icod-id="src_components_ui_emptystate_tsx_d55a">{description}</p>
      )}
      {action && <div className="mt-6" data-icod-id="src_components_ui_emptystate_tsx_0732">{action}</div>}
    </div>
  );
}

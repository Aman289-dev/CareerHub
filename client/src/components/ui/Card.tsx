import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

export type CardProps = ComponentPropsWithoutRef<'div'>;

/**
 * Bordered surface: content card, dashboard tile, form panel, list row.
 * Pass padding and layout through className — <Card className="p-4 flex gap-3">.
 */
export default function Card({ className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border/60 bg-card text-card-foreground shadow-elevated transition-all duration-300',
        className,
      )}
      data-icod-id="src_components_ui_card_tsx_6f5d"
      {...rest} />
  );
}

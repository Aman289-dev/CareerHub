import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import Button from './Button';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  /** Right-aligned action row rendered under the body. */
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}

/**
 * Centred overlay dialog: backdrop click, Escape, and scroll lock built in.
 * Size it through className — <Modal className="max-w-sm"> for a confirmation.
 */
export default function Modal({
  open,
  onClose,
  title,
  footer,
  className,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          data-icod-id="src_components_ui_modal_tsx_dafc">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/50 backdrop-blur-md"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'relative flex w-full max-w-lg flex-col gap-4 rounded-2xl border border-border/60',
              'bg-card p-6 text-card-foreground shadow-floating',
              className,
            )}
          >
            {title && (
              <div
                className="flex items-center justify-between"
                data-icod-id="src_components_ui_modal_tsx_9407">
                <h2
                  className="text-lg font-bold font-display"
                  data-icod-id="src_components_ui_modal_tsx_74c4">{title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  aria-label="Close"
                  data-icod-id="src_components_ui_modal_tsx_aec4">
                  <X className="h-5 w-5" data-icod-id="src_components_ui_modal_tsx_cfd6" />
                </Button>
              </div>
            )}
            {children}
            {footer && <div
              className="flex justify-end gap-3 pt-1"
              data-icod-id="src_components_ui_modal_tsx_0c85">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

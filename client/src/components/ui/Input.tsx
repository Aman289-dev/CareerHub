import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * The form-control look as a class string. Use it directly on <textarea> and
 * <select>; use <Input> for <input>.
 *   <textarea className={inputClass('min-h-24 resize-none')} />
 *   <select className={inputClass()} />
 */
export function inputClass(className?: string): string {
  return cn(
    'w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground',
    'placeholder:text-muted-foreground/60 transition-all duration-200',
    'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-soft',
    'disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground',
    className,
  );
}

export type InputProps = ComponentPropsWithoutRef<'input'>;

/** Every <input> in the app. Wrap it in <Field> to get a label and error text. */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={inputClass(className)}
      data-icod-id="src_components_ui_input_tsx_4e5d"
      {...rest} />
  );
});

export default Input;

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push('ellipsis');
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      className={cn('flex items-center justify-center gap-1.5', className)}
      data-icod-id="src_components_pagination_tsx_9600"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        data-icod-id="src_components_pagination_tsx_a401"
      >
        <ChevronLeft className="h-4 w-4" data-icod-id="src_components_pagination_tsx_a4dc" />
      </Button>
      {getPageNumbers().map((page, index) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-muted-foreground font-medium"
            data-icod-id={`src_components_pagination_tsx_294e_${index}`}
          >
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onPageChange(page)}
            className={cn(
              'min-w-[2.5rem] transition-all duration-200',
              currentPage === page && 'shadow-glow'
            )}
            data-icod-id={`src_components_pagination_tsx_9d9b_${index}`}
          >
            {page}
          </Button>
        )
      )}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        data-icod-id="src_components_pagination_tsx_fe9a"
      >
        <ChevronRight className="h-4 w-4" data-icod-id="src_components_pagination_tsx_b433" />
      </Button>
    </nav>
  );
}

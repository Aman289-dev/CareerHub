import { useState } from 'react';
import { Search, MapPin, Briefcase, Filter, X } from 'lucide-react';
import { Button, Input, Field } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { JobFilters, JobType, RemoteType } from '@/types';

interface FilterSidebarProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  className?: string;
}

const jobTypes: JobType[] = ['full-time', 'part-time', 'contract', 'internship'];
const remoteTypes: RemoteType[] = ['remote', 'on-site', 'hybrid'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Executive'];

export default function FilterSidebar({ filters, onFilterChange, className }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: keyof JobFilters, value: any) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== '');

  const selectClass =
    'w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

  const FilterContent = () => (
    <div
      className="space-y-6"
      data-icod-id="src_components_filtersidebar_tsx_e0cb"
    >
      <div
        className="flex items-center justify-between"
        data-icod-id="src_components_filtersidebar_tsx_f622"
      >
        <h3
          className="font-bold font-display text-foreground"
          data-icod-id="src_components_filtersidebar_tsx_f019"
        >
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs font-medium text-primary hover:text-accent-foreground transition-colors duration-200"
            data-icod-id="src_components_filtersidebar_tsx_af81"
          >
            Clear all
          </button>
        )}
      </div>

      <Field label="Search" data-icod-id="src_components_filtersidebar_tsx_b479">
        <div className="relative" data-icod-id="src_components_filtersidebar_tsx_c7c9">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            data-icod-id="src_components_filtersidebar_tsx_9086"
          />
          <Input
            placeholder="Job title or keywords"
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            className="pl-9"
            data-icod-id="src_components_filtersidebar_tsx_ca94"
          />
        </div>
      </Field>

      <Field label="Location" data-icod-id="src_components_filtersidebar_tsx_245b">
        <div className="relative" data-icod-id="src_components_filtersidebar_tsx_2d0d">
          <MapPin
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            data-icod-id="src_components_filtersidebar_tsx_0650"
          />
          <Input
            placeholder="City or remote"
            value={filters.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="pl-9"
            data-icod-id="src_components_filtersidebar_tsx_8df1"
          />
        </div>
      </Field>

      <Field label="Job Type" data-icod-id="src_components_filtersidebar_tsx_7463">
        <select
          value={filters.jobType || ''}
          onChange={(e) => handleChange('jobType', e.target.value)}
          className={selectClass}
          data-icod-id="src_components_filtersidebar_tsx_1953"
        >
          <option value="" data-icod-id="src_components_filtersidebar_tsx_a8f8">All Types</option>
          {jobTypes.map((type) => (
            <option
              key={type}
              value={type}
              data-icod-id={`src_components_filtersidebar_tsx_40a0_${type}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Remote Type" data-icod-id="src_components_filtersidebar_tsx_846b">
        <select
          value={filters.remoteType || ''}
          onChange={(e) => handleChange('remoteType', e.target.value)}
          className={selectClass}
          data-icod-id="src_components_filtersidebar_tsx_3246"
        >
          <option value="" data-icod-id="src_components_filtersidebar_tsx_d2a9">All Locations</option>
          {remoteTypes.map((type) => (
            <option
              key={type}
              value={type}
              data-icod-id={`src_components_filtersidebar_tsx_7348_${type}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Experience Level"
        data-icod-id="src_components_filtersidebar_tsx_fc5c"
      >
        <select
          value={filters.experienceLevel || ''}
          onChange={(e) => handleChange('experienceLevel', e.target.value)}
          className={selectClass}
          data-icod-id="src_components_filtersidebar_tsx_8125"
        >
          <option value="" data-icod-id="src_components_filtersidebar_tsx_2f41">All Levels</option>
          {experienceLevels.map((level) => (
            <option
              key={level}
              value={level}
              data-icod-id={`src_components_filtersidebar_tsx_08eb_${level}`}
            >
              {level}
            </option>
          ))}
        </select>
      </Field>

      <div
        className="space-y-2"
        data-icod-id="src_components_filtersidebar_tsx_da1d"
      >
        <label
          className="text-sm font-semibold text-foreground"
          data-icod-id="src_components_filtersidebar_tsx_3784"
        >
          Salary Range
        </label>
        <div
          className="flex items-center gap-2"
          data-icod-id="src_components_filtersidebar_tsx_1c57"
        >
          <Input
            type="number"
            placeholder="Min"
            value={filters.salaryMin || ''}
            onChange={(e) => handleChange('salaryMin', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full"
            data-icod-id="src_components_filtersidebar_tsx_03f4"
          />
          <span
            className="text-muted-foreground"
            data-icod-id="src_components_filtersidebar_tsx_fb32"
          >
            -
          </span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.salaryMax || ''}
            onChange={(e) => handleChange('salaryMax', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full"
            data-icod-id="src_components_filtersidebar_tsx_30b5"
          />
        </div>
      </div>

      <Field label="Sort By" data-icod-id="src_components_filtersidebar_tsx_9896">
        <select
          value={filters.sortBy || 'newest'}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          className={selectClass}
          data-icod-id="src_components_filtersidebar_tsx_8ee2"
        >
          <option value="newest" data-icod-id="src_components_filtersidebar_tsx_88e0">Newest First</option>
          <option value="salary" data-icod-id="src_components_filtersidebar_tsx_609a">Highest Salary</option>
        </select>
      </Field>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div
        className="lg:hidden mb-4"
        data-icod-id="src_components_filtersidebar_tsx_fbe6"
      >
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
          data-icod-id="src_components_filtersidebar_tsx_01c1"
        >
          <span
            className="flex items-center gap-2"
            data-icod-id="src_components_filtersidebar_tsx_87b0"
          >
            <Filter className="h-4 w-4" data-icod-id="src_components_filtersidebar_tsx_d864" />
            Filters
          </span>
          {isOpen ? <X className="h-4 w-4" data-icod-id="src_components_filtersidebar_tsx_334e" /> : null}
        </Button>
      </div>
      {/* Desktop sidebar / Mobile collapsible */}
      <aside
        className={cn(
          'lg:block lg:w-72 lg:shrink-0 transition-all duration-300',
          isOpen ? 'block' : 'hidden',
          className
        )}
        data-icod-id="src_components_filtersidebar_tsx_91ce"
      >
        <div
          className="sticky top-20 rounded-xl border border-border/60 bg-card p-5 shadow-elevated"
          data-icod-id="src_components_filtersidebar_tsx_64e8"
        >
          <FilterContent data-icod-id="src_components_filtersidebar_tsx_0101" />
        </div>
      </aside>
    </>
  );
}

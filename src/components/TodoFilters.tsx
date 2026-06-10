import clsx from 'clsx';
import type { Filter } from '@/types';

type TodoFiltersProps = {
  filter: Filter;
  onChange: (filter: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function TodoFilters({
  filter,
  onChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-2 text-sm text-gray-500">
      <span>
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onChange(f.value)}
            className={clsx(
              'px-3 py-1 rounded-md text-xs font-medium transition-colors',
              filter === f.value
                ? 'bg-white text-brand shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <button
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="text-xs font-medium text-gray-500 hover:text-red-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-500 transition-colors"
      >
        Clear completed
      </button>
    </div>
  );
}

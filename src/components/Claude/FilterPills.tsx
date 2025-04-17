import { FC } from 'react';
import { Bookmark, User, MoreHorizontal } from 'lucide-react';

interface FilterPillsProps {
  controlFilters: string[];
  isPanelOpen: boolean;
  activeFilters: string[];
  pendingFilter: string | null;
  toggleFilter: (filter: string) => void;
  togglePendingFilter: (filter: string) => void;
  togglePanel: () => void;
}

const FilterPills: FC<FilterPillsProps> = ({
  controlFilters,
  isPanelOpen,
  activeFilters,
  pendingFilter,
  toggleFilter,
  togglePendingFilter,
  togglePanel,
}) => (
  <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-4">
    {controlFilters.map(filter => {
      const isActive = (!isPanelOpen && activeFilters.includes(filter)) ||
        (isPanelOpen && pendingFilter === filter);
      return (
        <button
          key={filter}
          className={`px-3 py-1 rounded-full flex items-center text-sm ${
            isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => (isPanelOpen ? togglePendingFilter(filter) : toggleFilter(filter))}
        >
          {filter === 'For you' && <User className="w-4 h-4 mr-1" />}
          {filter === 'Popular' && <Bookmark className="w-4 h-4 mr-1" />}
          <span>{filter}</span>
        </button>
      );
    })}
    <button
      className={`px-3 py-1 rounded-full flex items-center text-sm ${
        isPanelOpen ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
      }`}
      onClick={togglePanel}
    >
      <MoreHorizontal className="w-4 h-4 mr-1" />
      <span>More</span>
    </button>
  </div>
);

export default FilterPills;
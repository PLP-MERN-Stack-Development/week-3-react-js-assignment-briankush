import React from 'react';
import { TaskFilter } from '../../types/task';
import Button from '../ui/Button';

interface TaskFiltersProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters: { key: TaskFilter; label: string; count: number }[] = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'active', label: 'Active', count: taskCounts.active },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(({ key, label, count }) => (
        <Button
          key={key}
          variant={currentFilter === key ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(key)}
          className="flex items-center space-x-2"
        >
          <span>{label}</span>
          <span className={`px-2 py-0.5 text-xs rounded-full ${
            currentFilter === key 
              ? 'bg-white/20' 
              : 'bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300'
          }`}>
            {count}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default TaskFilters;
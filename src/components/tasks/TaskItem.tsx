import React from 'react';
import { Check, Trash2, Clock, AlertCircle, Circle } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Task } from '../../types/task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-error-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-warning-500" />;
      case 'low':
        return <Circle className="h-4 w-4 text-success-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-error-500 bg-error-50 dark:bg-error-900/20';
      case 'medium':
        return 'border-l-warning-500 bg-warning-50 dark:bg-warning-900/20';
      case 'low':
        return 'border-l-success-500 bg-success-50 dark:bg-success-900/20';
      default:
        return 'border-l-gray-300 bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <Card className={`p-4 border-l-4 ${getPriorityColor(task.priority)} ${task.completed ? 'opacity-75' : ''} animate-slide-in`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                task.completed
                  ? 'bg-success-500 border-success-500 text-white'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
              }`}
            >
              {task.completed && <Check className="h-3 w-3" />}
            </button>
            
            <h3 className={`font-semibold text-gray-900 dark:text-white ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </h3>
            
            <div className="flex items-center space-x-2">
              {getPriorityIcon(task.priority)}
              <span className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                {task.category}
              </span>
            </div>
          </div>
          
          {task.description && (
            <p className={`text-gray-600 dark:text-gray-400 text-sm mb-2 ${task.completed ? 'line-through' : ''}`}>
              {task.description}
            </p>
          )}
          
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="ml-4 opacity-70 hover:opacity-100"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default TaskItem;
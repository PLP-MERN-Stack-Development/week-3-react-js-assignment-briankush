import React, { useState, useMemo } from 'react';
import { CheckSquare } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Task, TaskFilter } from '../../types/task';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import TaskFilters from './TaskFilters';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<TaskFilter>('all');

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  }), [tasks]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4">
          <CheckSquare className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Task Manager</h1>
        <p className="text-gray-600 dark:text-gray-400">Organize your work and life, one task at a time</p>
      </div>

      <TaskForm onSubmit={addTask} />
      
      <TaskFilters
        currentFilter={filter}
        onFilterChange={setFilter}
        taskCounts={taskCounts}
      />

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {filter === 'completed' ? 'No completed tasks yet' : 
               filter === 'active' ? 'No active tasks' : 
               'No tasks yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filter === 'all' ? 'Create your first task to get started!' : 
               `Switch to "All Tasks" to see your ${filter === 'completed' ? 'active' : 'completed'} tasks.`}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;
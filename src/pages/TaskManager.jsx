import React, { useState, useEffect, useContext, createContext } from 'react'
import Button from '../components/Button'

const ThemeContext = createContext()

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

function TaskManager() {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [filter, setFilter] = useState('All')
  const [newTask, setNewTask] = useState('')
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    // Could load tasks from API or localStorage here if needed
  }, [])

  const addTask = () => {
    if (newTask.trim() === '') return
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
    setNewTask('')
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="border p-2 flex-grow rounded"
        />
        <Button onClick={addTask}>Add</Button>
      </div>
      <div className="mb-4 space-x-2">
        {['All', 'Active', 'Completed'].map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'primary' : 'secondary'}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-2 border-b ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            <span onClick={() => toggleTask(task.id)} className="cursor-pointer">
              {task.text}
            </span>
            <Button variant="danger" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </div>
    </div>
  )
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }
export default TaskManager

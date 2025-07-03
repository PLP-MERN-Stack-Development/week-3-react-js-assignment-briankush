import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import TaskManager from './pages/TaskManager'
import ApiIntegration from './pages/ApiIntegration'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskManager />} />
          <Route path="/api" element={<ApiIntegration />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

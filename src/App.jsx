
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Classes from './pages/Classes'
import Subjects from './pages/Subjects'
import Enrollments from './pages/Enrollments'
import Attendance from './pages/Attendance'
import Exams from './pages/Exams'
import Results from './pages/Results'
import Fees from './pages/Fees'
import Users from './pages/Users'
import './styles/theme.css'

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/enrollments" element={<Enrollments />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/results" element={<Results />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

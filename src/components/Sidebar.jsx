
import React from 'react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/students', label: 'Students' },
  { to: '/teachers', label: 'Teachers' },
  { to: '/classes', label: 'Classes' },
  { to: '/subjects', label: 'Subjects' },
  { to: '/enrollments', label: 'Enrollments' },
  { to: '/attendance', label: 'Attendance' },
  { to: '/exams', label: 'Exams' },
  { to: '/results', label: 'Results' },
  { to: '/fees', label: 'Fees' },
  { to: '/users', label: 'Users' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {items.map(i => (
        <NavLink key={i.to} to={i.to} className={({isActive}) => isActive ? 'active' : ''}>
          {i.label}
        </NavLink>
      ))}
    </aside>
  )
}

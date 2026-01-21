
import React from 'react'
export default function Dashboard(){
  return (
    <div>
      <h2>Dashboard</h2>
      <div className='grid'>
        <div className='card'><h3>Students</h3><p>Manage student records.</p></div>
        <div className='card'><h3>Teachers</h3><p>Manage teacher records.</p></div>
        <div className='card'><h3>Classes</h3><p>Manage classes and sections.</p></div>
        <div className='card'><h3>Subjects</h3><p>Manage academic subjects.</p></div>
        <div className='card'><h3>Enrollments</h3><p>Enroll students into classes.</p></div>
        <div className='card'><h3>Attendance</h3><p>Track daily attendance.</p></div>
        <div className='card'><h3>Exams</h3><p>Schedule and administer exams.</p></div>
        <div className='card'><h3>Results</h3><p>Record exam results.</p></div>
        <div className='card'><h3>Fees</h3><p>Fees, payments and dues.</p></div>
        <div className='card'><h3>Users</h3><p>Roles and logins.</p></div>
      </div>
    </div>
  )
}


import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import FormField from '../components/FormField'
import { getList, createItem, callSP } from '../api/client'
import { RESOURCES, SP } from '../api/endpoints'

export default function Enrollments() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})
  const resource = RESOURCES['enrollments']

  useEffect(() => { (async () => setRows(await getList(resource)))() }, [resource])

  const columns = [
  { header: 'Student ID', accessor: 'student_id' },
  { header: 'Class ID', accessor: 'class_id' },
  { header: 'Academic Year', accessor: 'academic_year' }
]

  function setField(k, v) { setForm(prev => ({...prev, [k]: v})) }

  async function onAdd() {
    await createItem(resource, form)
    setRows(await getList(resource))
    setForm({})
  }

  async function demoSP() {
    const out = await callSP(SP.getStudentReportCard, { studentId: 1 })
    alert(JSON.stringify(out, null, 2))
  }

  return (
    <div>
      <h2>Enrollments</h2>
      <div className="card">
        <div className="grid">
          <FormField label="Student ID" name="student_id" value={{form['student_id'] || ''}} onChange={v => setField('student_id', v)} />
          <FormField label="Class ID" name="class_id" value={{form['class_id'] || ''}} onChange={v => setField('class_id', v)} />
          <FormField label="Academic Year" name="academic_year" value={{form['academic_year'] || ''}} onChange={v => setField('academic_year', v)} />
        </div>
        <button onClick={onAdd}>Add</button>
        <button style={{marginLeft:8}} onClick={demoSP}>Demo Stored Procedure</button>
      </div>
      <DataTable columns=[
  { header: 'Student ID', accessor: 'student_id' },
  { header: 'Class ID', accessor: 'class_id' },
  { header: 'Academic Year', accessor: 'academic_year' }
] data={rows} />
    </div>
  )
}

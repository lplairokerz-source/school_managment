
import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import FormField from '../components/FormField'
import { getList, createItem, callSP } from '../api/client'
import { RESOURCES, SP } from '../api/endpoints'

export default function Results() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})
  const resource = RESOURCES['results']

  useEffect(() => { (async () => setRows(await getList(resource)))() }, [resource])

  const columns = [
  { header: 'Exam ID', accessor: 'exam_id' },
  { header: 'Student ID', accessor: 'student_id' },
  { header: 'Subject ID', accessor: 'subject_id' },
  { header: 'Marks', accessor: 'marks_obtained' },
  { header: 'Grade', accessor: 'grade' }
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
      <h2>Results</h2>
      <div className="card">
        <div className="grid">
          <FormField label="Exam ID" name="exam_id" value={{form['exam_id'] || ''}} onChange={v => setField('exam_id', v)} />
          <FormField label="Student ID" name="student_id" value={{form['student_id'] || ''}} onChange={v => setField('student_id', v)} />
          <FormField label="Subject ID" name="subject_id" value={{form['subject_id'] || ''}} onChange={v => setField('subject_id', v)} />
          <FormField label="Marks" name="marks_obtained" value={{form['marks_obtained'] || ''}} onChange={v => setField('marks_obtained', v)} />
          <FormField label="Grade" name="grade" value={{form['grade'] || ''}} onChange={v => setField('grade', v)} />
        </div>
        <button onClick={onAdd}>Add</button>
        <button style={{marginLeft:8}} onClick={demoSP}>Demo Stored Procedure</button>
      </div>
      <DataTable columns=[
  { header: 'Exam ID', accessor: 'exam_id' },
  { header: 'Student ID', accessor: 'student_id' },
  { header: 'Subject ID', accessor: 'subject_id' },
  { header: 'Marks', accessor: 'marks_obtained' },
  { header: 'Grade', accessor: 'grade' }
] data={rows} />
    </div>
  )
}

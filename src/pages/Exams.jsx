
import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import FormField from '../components/FormField'
import { getList, createItem, callSP } from '../api/client'
import { RESOURCES, SP } from '../api/endpoints'

export default function Exams() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})
  const resource = RESOURCES['exams']

  useEffect(() => { (async () => setRows(await getList(resource)))() }, [resource])

  const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Class ID', accessor: 'class_id' },
  { header: 'Term', accessor: 'term' },
  { header: 'Exam Date', accessor: 'exam_date' }
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
      <h2>Exams</h2>
      <div className="card">
        <div className="grid">
          <FormField label="Name" name="name" value={{form['name'] || ''}} onChange={v => setField('name', v)} />
          <FormField label="Class ID" name="class_id" value={{form['class_id'] || ''}} onChange={v => setField('class_id', v)} />
          <FormField label="Term" name="term" value={{form['term'] || ''}} onChange={v => setField('term', v)} />
          <FormField label="Exam Date" name="exam_date" value={{form['exam_date'] || ''}} onChange={v => setField('exam_date', v)} />
        </div>
        <button onClick={onAdd}>Add</button>
        <button style={{marginLeft:8}} onClick={demoSP}>Demo Stored Procedure</button>
      </div>
      <DataTable columns=[
  { header: 'Name', accessor: 'name' },
  { header: 'Class ID', accessor: 'class_id' },
  { header: 'Term', accessor: 'term' },
  { header: 'Exam Date', accessor: 'exam_date' }
] data={rows} />
    </div>
  )
}

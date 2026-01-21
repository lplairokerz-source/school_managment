
import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import FormField from '../components/FormField'
import { getList, createItem, callSP } from '../api/client'
import { RESOURCES, SP } from '../api/endpoints'

export default function Classes() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})
  const resource = RESOURCES['classes']

  useEffect(() => { (async () => setRows(await getList(resource)))() }, [resource])

  const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Section', accessor: 'section' },
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
      <h2>Classes</h2>
      <div className="card">
        <div className="grid">
          <FormField label="Name" name="name" value={{form['name'] || ''}} onChange={v => setField('name', v)} />
          <FormField label="Section" name="section" value={{form['section'] || ''}} onChange={v => setField('section', v)} />
          <FormField label="Academic Year" name="academic_year" value={{form['academic_year'] || ''}} onChange={v => setField('academic_year', v)} />
        </div>
        <button onClick={onAdd}>Add</button>
        <button style={{marginLeft:8}} onClick={demoSP}>Demo Stored Procedure</button>
      </div>
      <DataTable columns=[
  { header: 'Name', accessor: 'name' },
  { header: 'Section', accessor: 'section' },
  { header: 'Academic Year', accessor: 'academic_year' }
] data={rows} />
    </div>
  )
}

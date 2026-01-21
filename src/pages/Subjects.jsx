
import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import FormField from '../components/FormField'
import { getList, createItem, callSP } from '../api/client'
import { RESOURCES, SP } from '../api/endpoints'

export default function Subjects() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})
  const resource = RESOURCES['subjects']

  useEffect(() => { (async () => setRows(await getList(resource)))() }, [resource])

  const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Code', accessor: 'code' },
  { header: 'Description', accessor: 'description' }
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
      <h2>Subjects</h2>
      <div className="card">
        <div className="grid">
          <FormField label="Name" name="name" value={{form['name'] || ''}} onChange={v => setField('name', v)} />
          <FormField label="Code" name="code" value={{form['code'] || ''}} onChange={v => setField('code', v)} />
          <FormField label="Description" name="description" value={{form['description'] || ''}} onChange={v => setField('description', v)} />
        </div>
        <button onClick={onAdd}>Add</button>
        <button style={{marginLeft:8}} onClick={demoSP}>Demo Stored Procedure</button>
      </div>
      <DataTable columns=[
  { header: 'Name', accessor: 'name' },
  { header: 'Code', accessor: 'code' },
  { header: 'Description', accessor: 'description' }
] data={rows} />
    </div>
  )
}

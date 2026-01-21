
import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import FormField from '../components/FormField'
import { getList, createItem, callSP } from '../api/client'
import { RESOURCES, SP } from '../api/endpoints'

export default function Teachers() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})
  const resource = RESOURCES['teachers']

  useEffect(() => { (async () => setRows(await getList(resource)))() }, [resource])

  const columns = [
  { header: 'First Name', accessor: 'first_name' },
  { header: 'Last Name', accessor: 'last_name' },
  { header: 'Email', accessor: 'email' },
  { header: 'Department', accessor: 'department' }
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
      <h2>Teachers</h2>
      <div className="card">
        <div className="grid">
          <FormField label="First Name" name="first_name" value={{form['first_name'] || ''}} onChange={v => setField('first_name', v)} />
          <FormField label="Last Name" name="last_name" value={{form['last_name'] || ''}} onChange={v => setField('last_name', v)} />
          <FormField label="Email" name="email" value={{form['email'] || ''}} onChange={v => setField('email', v)} />
          <FormField label="Department" name="department" value={{form['department'] || ''}} onChange={v => setField('department', v)} />
        </div>
        <button onClick={onAdd}>Add</button>
        <button style={{marginLeft:8}} onClick={demoSP}>Demo Stored Procedure</button>
      </div>
      <DataTable columns=[
  { header: 'First Name', accessor: 'first_name' },
  { header: 'Last Name', accessor: 'last_name' },
  { header: 'Email', accessor: 'email' },
  { header: 'Department', accessor: 'department' }
] data={rows} />
    </div>
  )
}

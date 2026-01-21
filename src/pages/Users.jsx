
import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import FormField from '../components/FormField'
import { getList, createItem, callSP } from '../api/client'
import { RESOURCES, SP } from '../api/endpoints'

export default function Users() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})
  const resource = RESOURCES['users']

  useEffect(() => { (async () => setRows(await getList(resource)))() }, [resource])

  const columns = [
  { header: 'Username', accessor: 'username' },
  { header: 'Role', accessor: 'role' }
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
      <h2>Users</h2>
      <div className="card">
        <div className="grid">
          <FormField label="Username" name="username" value={{form['username'] || ''}} onChange={v => setField('username', v)} />
          <FormField label="Role" name="role" value={{form['role'] || ''}} onChange={v => setField('role', v)} />
        </div>
        <button onClick={onAdd}>Add</button>
        <button style={{marginLeft:8}} onClick={demoSP}>Demo Stored Procedure</button>
      </div>
      <DataTable columns=[
  { header: 'Username', accessor: 'username' },
  { header: 'Role', accessor: 'role' }
] data={rows} />
    </div>
  )
}

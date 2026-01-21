
import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import FormField from '../components/FormField'
import { getList, createItem, callSP } from '../api/client'
import { RESOURCES, SP } from '../api/endpoints'

export default function Students() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})
  const resource = RESOURCES['students']

  useEffect(() => { (async () => setRows(await getList(resource)))() }, [resource])

  const columns = [
  { header: 'Roll No', accessor: 'roll_no' },
  { header: 'First Name', accessor: 'first_name' },
  { header: 'Last Name', accessor: 'last_name' },
  { header: 'DOB', accessor: 'dob' },
  { header: 'Gender', accessor: 'gender' }
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
      <h2>Students</h2>
      <div className="card">
        <div className="grid">
          <FormField label="Roll No" name="roll_no" value={{form['roll_no'] || ''}} onChange={v => setField('roll_no', v)} />
          <FormField label="First Name" name="first_name" value={{form['first_name'] || ''}} onChange={v => setField('first_name', v)} />
          <FormField label="Last Name" name="last_name" value={{form['last_name'] || ''}} onChange={v => setField('last_name', v)} />
          <FormField label="DOB" name="dob" value={{form['dob'] || ''}} onChange={v => setField('dob', v)} />
          <FormField label="Gender" name="gender" value={{form['gender'] || ''}} onChange={v => setField('gender', v)} />
        </div>
        <button onClick={onAdd}>Add</button>
        <button style={{marginLeft:8}} onClick={demoSP}>Demo Stored Procedure</button>
      </div>
      <DataTable columns=[
  { header: 'Roll No', accessor: 'roll_no' },
  { header: 'First Name', accessor: 'first_name' },
  { header: 'Last Name', accessor: 'last_name' },
  { header: 'DOB', accessor: 'dob' },
  { header: 'Gender', accessor: 'gender' }
] data={rows} />
    </div>
  )
}


import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import FormField from '../components/FormField'
import { getList, createItem, callSP } from '../api/client'
import { RESOURCES, SP } from '../api/endpoints'

export default function Fees() {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})
  const resource = RESOURCES['fees']

  useEffect(() => { (async () => setRows(await getList(resource)))() }, [resource])

  const columns = [
  { header: 'Student ID', accessor: 'student_id' },
  { header: 'Fee Type', accessor: 'fee_type' },
  { header: 'Amount', accessor: 'amount' },
  { header: 'Due Date', accessor: 'due_date' },
  { header: 'Paid Amount', accessor: 'paid_amount' }
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
      <h2>Fees</h2>
      <div className="card">
        <div className="grid">
          <FormField label="Student ID" name="student_id" value={{form['student_id'] || ''}} onChange={v => setField('student_id', v)} />
          <FormField label="Fee Type" name="fee_type" value={{form['fee_type'] || ''}} onChange={v => setField('fee_type', v)} />
          <FormField label="Amount" name="amount" value={{form['amount'] || ''}} onChange={v => setField('amount', v)} />
          <FormField label="Due Date" name="due_date" value={{form['due_date'] || ''}} onChange={v => setField('due_date', v)} />
          <FormField label="Paid Amount" name="paid_amount" value={{form['paid_amount'] || ''}} onChange={v => setField('paid_amount', v)} />
        </div>
        <button onClick={onAdd}>Add</button>
        <button style={{marginLeft:8}} onClick={demoSP}>Demo Stored Procedure</button>
      </div>
      <DataTable columns=[
  { header: 'Student ID', accessor: 'student_id' },
  { header: 'Fee Type', accessor: 'fee_type' },
  { header: 'Amount', accessor: 'amount' },
  { header: 'Due Date', accessor: 'due_date' },
  { header: 'Paid Amount', accessor: 'paid_amount' }
] data={rows} />
    </div>
  )
}

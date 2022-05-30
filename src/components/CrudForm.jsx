import React, { useState, useEffect } from 'react';
import '../css/CrudForm.css'

const initialForm = {
  firstN: '',
  lastN: '',
  gender: '',
  id: null,
}

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit)
    } else {
      setForm(initialForm)
    }
  }, [dataToEdit])

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (!form.firstN || !form.lastN || !form.gender) return window.alert('agg info')
    if (!form.id) {
      createData(form)
    } else {
      updateData(form)
    }
    handleReset()
  }
  const handleReset = (e) => {
    setDataToEdit(null)
    setForm(initialForm)
  }

  return (
    <div>
      <br /><br />
      {dataToEdit ? 'Edit data': 'Send data'}
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstN" value={form.firstN} id="" onInput={handleChange} className = "input"/> <br />

        <input type="text" name="lastN" value={form.lastN} id="" onInput={handleChange} className = "input" /> <br />

        <input type="text" name="gender" value={form.gender} id="" onInput={handleChange} className = "input"/> <br />

        <input type="submit" value={dataToEdit ? 'Edit': 'Send'} className = "button is-info"/>

        <input type="reset" value="Reset" onClick={handleReset} className = "button is-warning"/>
        <br /><br /> <br />

      </form>
    </div>
  )
}

export default CrudForm
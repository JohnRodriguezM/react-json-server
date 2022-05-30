import React, { useState, useEffect } from 'react';
import './App.css';
import CrudForm from './components/CrudForm';
import CrudTable from './components/CrudTable';
import Loader from './components/Loader'

// se importa handle Error

import { handleError } from './helpers/handleError.js'



let url = 'http://localhost:5000/ciudadanos'

function App() {
  const [data, setData] = useState([])
  const [dataToEdit, setDataToEdit] = useState(null)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(url)
        handleError(res)
        const data = await res.json()
        setLoader(true)
        setTimeout(()=>{
          setData(data)
          setLoader(false)
        },400)
      }
      catch (err) {
        console.error(err)
      }
    }
    window.addEventListener('load', getData)
    return () => {
      window.removeEventListener('load', getData)
    }
  }, [])
  //! funcion de post - create data
  const createData = ({ firstN, lastN, gender }) => {
    const postData = async (direccionUrl) => {
      try {
        const res = await fetch(direccionUrl, {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ firstN, lastN, gender })
        })
        const dataPost = await res.json()
        setLoader(true)
        setTimeout(()=>{
          setData([...data, dataPost])
          setLoader(false)
        },400)
      }
      catch (err) { console.log(err) }
    }
    postData(url)
  }
  // ! funcion del put -- edit data
  const updateData = async info => {
    const update = async (direccionUrl) => {
      const { firstN, lastN, gender } = info
      try {
        const res = await fetch(`${direccionUrl}/${info.id}`, {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ firstN, lastN, gender })
        })
        let mapeo = data.map(el => el.id === info.id ? info : el)
        setData(mapeo)
      } catch (err) { console.log(err) }
    }
    update(url)
  }
  // ! funcion de delete data
  const deleteData = async id => {
    const deleteAction = async (direccionUrl) => {

      let confirm = window.confirm('Are you sure you want to delete?')

      if(confirm) {
        const res = await fetch(`${direccionUrl}/${id}`, {
          method: 'DELETE',
        })
        let filter = data.filter(el => el.id !== id)
      setLoader(true)
      setTimeout(()=>{
        setData(filter)
        setLoader(false)
      },400)
      }
    }
    deleteAction(url)
  }

  return (
    <div className="App">
      <CrudForm createData={createData} updateData={updateData} dataToEdit={dataToEdit} setDataToEdit={setDataToEdit} />
      {loader ? <Loader/> : <CrudTable data={data} deleteData={deleteData} setDataToEdit={setDataToEdit} />}
    </div>
  );
}

export default App;

import React from 'react'
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";



import '../css/Row.css'
const CrudRow = ({el, deleteData, setDataToEdit}) => {
  const {firstN,lastN,gender,id} = el
  return (
    <>
      <tr>
        <td colSpan = "1">{firstN}</td>
        <td colSpan = "1">{lastN}</td>
        <td colSpan = "1">{gender}</td>
        <td colSpan = "1">
          <BiEdit className = 'edit-btn' onClick = {()=>setDataToEdit(el)}/>
          <AiFillDelete className = 'delete-btn' onClick = {()=> deleteData(id)}/>
        </td>
      </tr>
    </>
  )
}

export default CrudRow
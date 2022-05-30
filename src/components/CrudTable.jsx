import React from 'react'
import CrudRow from './CrudRow'
import '../css/CrudTable.css'
const CrudTable = ({ data, deleteData,setDataToEdit }) => {
  return (
    <div >
      Tabla de contenido
      <table style = {{textAlign: 'center', margin: '0 auto'}}>
        <thead>
          <th scope = "col">F name</th>
          <th scope = "col">L name</th>
          <th scope = "col">Gender</th>
          <th scope = "col">Options</th>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3">No data</td>
            </tr>
          )
            : (
              data.map(el => {
                return (
                  <CrudRow
                  key = {el.id}
                  el={el}
                  deleteData = {deleteData}
                  setDataToEdit = {setDataToEdit}
                  />
                )
              })
            )

          }
        </tbody>
      </table>
    </div>
  )
}

export default CrudTable
import React from 'react'
import "./addCongerChild.scss"
import { Button } from '@mui/material'
import DataListTypeConger from './DataListTypeConger'
import DataTable from '../users/dataTable/DataTable'
import ElementList from './DataListTypeConger'
import AddCongerInput from './AddCongerInput'





function AddCongerChild() {
  return (
    <div className='conger_container'>
        <div className='conger_inputs'>
            <AddCongerInput />
        </div>
        <div className='conger_list'>
       
            <ElementList />
        </div>


    </div>
  )
}

export default AddCongerChild
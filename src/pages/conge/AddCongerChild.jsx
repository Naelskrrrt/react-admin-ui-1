import React from 'react'
import "./addCongerChild.scss"
import { Button } from '@mui/material'
import DataListTypeConger from './DataListTypeConger'
import DataTable from '../users/dataTable/DataTable'
import ElementList from './DataListTypeConger'




function AddCongerChild() {
  return (
    <div className='conger_container'>
        <div className='conger_inputs'>
            Formulaire
        </div>
        <div className='conger_list'>
        bgcolor
            <ElementList />
        </div>

        <div className='conger_footer'>
            <Button variant='contained' color='error'>Effacer</Button>
            <Button variant='contained' color='primary'>Ajouter</Button>
        </div>
    </div>
  )
}

export default AddCongerChild
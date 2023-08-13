import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.scss"
import { Autocomplete, Button, TextField } from '@mui/material'
import { DateRangeOutlined, EditCalendarOutlined } from '@mui/icons-material'
// import ModalShow from '../../pages/conge_list/modal/ModalShow'
import Modal from "../../pages/conge_list/modal/ModalShow";
import { useModal } from '../ModalContext'
// import AddCongerModal from './AddCongerModal'
import ModalComponent from './testDoubleModal'
import AddCongerModal from '../../pages/conge/AddCongerModal'
import AddCongerChild from '../../pages/conge/AddCongerChild'





export const Navbar = () => {
  const { openModal, closeModal, getModalState } = useModal();
  return (
    <div className='navbar'>
      <Link to="/">
        <div className='logo'>
          <img className="spat-img" src='logo.png' alt='Logo' />
          <div className='logo-title'>
            <span>Cong_<span>e</span></span>
            <span className='logo-spat'>SPAT</span> 
          </div>
        </div>
      </Link>
      <div className='icons'>

        {/* <ModalComponent /> */}
      <AddCongerModal title='Ajouter Un Conger' children={<AddCongerChild />} />

      <Button startIcon={<EditCalendarOutlined />} sx={{textTransform: "capitalize", fontFamily: "Poppins", }} variant='contained' onClick={() => openModal("modal1")}>Planifier un conger</Button>
      
        <Link to="/user/1">
          <div className='user'>
            <img src='/homme.png' />
            <span>John</span>
          </div>
        </Link>
        
      </div>
      
    </div>
  )
}
 
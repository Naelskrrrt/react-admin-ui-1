import React from 'react'
import { Link } from 'react-router-dom'
import { menu } from '../../data'
import "./menu.scss"
import { Button } from '@mui/material';
import { PersonAddAlt } from '@mui/icons-material';
import { useModal } from '../ModalContext';
import AddEmplModal from './AddEmpModal';
import AddEmpInput from './AddEmpInput';


export const Menu = () => {

  const { openModal, closeModal, getModalState } = useModal();
  return (
    <div className="menu">
    {menu.map((item) => (
      <div className="item" key={item.id}>
        <span className="title">{item.title}</span>
        {item.listItems.map((listItem) => (
          <Link to={listItem.url} className="listItem" key={listItem.id}>
            <img src={listItem.icon} alt="" />
            <span className="listItemTitle">{listItem.title}</span>
          </Link>
        ))}
      </div>
    ))}
    <AddEmplModal title="Ajouter un Employer" children={<AddEmpInput />}/>
    <Button onClick={() => openModal("modal5")} variant="contained" startIcon={<PersonAddAlt />} className='btn-addEmp' sx={{textTransform: "capitalize", fontFamily: "poppins"}}>Ajouter un Employé</Button>
  </div>
);
};
  

 
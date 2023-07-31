import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.scss"

export const Navbar = () => {
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
        <img src='/search.svg' alt='' className='icon' />
        <img src='/app.svg' alt='' className='icon' />
        <img src='/expand.svg' alt='' className='icon' />
        <div className='notification'>
          <img src='notifications.svg' alt='' />
          <span>1</span>
        </div>
        <Link to="/user/1">
          <div className='user'>
            <img src='/homme.png' />
            <span>John</span>
          </div>
        </Link>
          <img src='/settings.svg' alt='' className='icon' />
      </div>
      
    </div>
  )
}
 
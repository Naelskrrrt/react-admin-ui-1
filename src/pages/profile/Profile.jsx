import React from 'react'
import "./profile.scss"

export default function Profile() {
  return (
    <div className='profile'>
      <div className='profile_image'>
        <img src='homme.png' alt='Photo de profile'/>
      </div>
      <div className='profile_propos'>
        <h3 className='name'><span className='lastname'>RAZANAKA</span>Mirindra</h3>
        <h4>Officier de Bureau (<span className='matricule'>VD-1235</span>)</h4>
        <p className='email'>test@example.com</p>
        <p className='phone_number'>020 50 340 67</p>
      </div>
      <div className='profile_btn_control'>
        <button className='profile_modif'>Modifier</button>
        <button className='logout'><img src='logout.svg'/> Logout</button>
      </div>
    </div>
  )
}

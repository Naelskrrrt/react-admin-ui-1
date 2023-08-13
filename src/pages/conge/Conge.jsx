import React from 'react'
import { useState } from 'react';
import "./conge.scss"

function Conge() {

  const [isDateInputDebut,  setIsDateInputDebut] = useState(false);
  const [isDateInputFin,  setIsDateInputFin] = useState(false);


  const handleFocusDebut = () => {
    setIsDateInputDebut(true);
    // setIsDateInputFin(true)
  };

  const handleFocusFin = () => {
    setIsDateInputFin(true);
    // setIsDateInputFin(true)
  };

  const handleBlurDebut = (event) => {
    if (!event.target.value) {
      setIsDateInputDebut(false);
    }
  };

  const handleBlurFin = (event) => {
    if (!event.target.value) {
      setIsDateInputFin(false);
    }
  };


  return (
    <div className='conge'>
      <div className='conge_title'>
        <h3>Demande de Congés</h3>
      </div>
      
      <div className='conge_content'>
        <div className='conge_header'>
          <div className='solde_conge'>
            <span hovered='Solde de congés'>2.5 Jours</span>
          </div>
          <div className='date_now'>
            <span>Lundi 19, 2023 | 17:00</span>
          </div>
        </div>
        <div className='type_motif'>
          <div className='type_conge'>
            <select name="pets" id="pet-select" required>
              <option value="">-- Type de Congés --</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="hamster">Hamster</option>
              <option value="parrot">Parrot</option>
              <option value="spider">Spider</option>
              <option value="goldfish">Goldfish</option>
            </select>
          </div>
          <div className='motif_conge'>
            <input type="text"  name="motif" id="motif_conge" required/>
            <span>Motifs Générals</span>
          </div>
        </div>
        <div className='debut_fin'>
          <div className='debut_date'>
            <input type={isDateInputDebut ? 'date' : 'text'} name='debut_date' id='debut_date' onFocus={handleFocusDebut} onBlur={handleBlurDebut} required/>
            <span>Date Début</span>
          </div>
          <div className='fin_date'>
            <input type={isDateInputFin ? 'date' : 'text'} name='fin_date' id='fin_date' onFocus={handleFocusFin} onBlur={handleBlurFin} required/>
            <span>Date Fin</span>
          </div>

          <div className='calc_solde'>
            <p>Reste solde congés: </p>
            <p className='reste_solde'>10 jours</p>
          </div>
        </div>
        <div className='btn_save'>
          <button className='save'>Valider</button>
        </div>
      </div>
      <div className='footer_conge'>
        HERE IS THE TABLE
      </div>
    </div>
  )
}


export default Conge

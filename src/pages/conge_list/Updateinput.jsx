import { Autocomplete, Button, TextField } from '@mui/material'
import { DatePicker, DateRangePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Select from 'react-select'
import axios from 'axios';
import { ClearAllOutlined, SaveAltOutlined } from '@mui/icons-material';
import { useModal } from '../../components/ModalContext';

// import React, { useState, useEffect } from 'react';
// import { Autocomplete, TextField } from '@mui/material';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import localizedFormat from 'dayjs/plugin/localizedFormat';
//import { AdapterDayjs, LocalizationProvider, DateRangePicker } from '@mui/x-date-pickers-pro';

dayjs.extend(localizedFormat);

export default function Updateinput({ selectDefault, datePickerDefaultDeb, datePickerDefaultFin, motifDefault }) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([dayjs('2022-04-17'), dayjs('2022-04-21')]);
  const [autoValue, setAutoValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {

  }

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await axios.get('http://localhost:8080/type_conger'); // Assurez-vous que le chemin correspond à votre API Node.js
        console.log(response.data)
        setOptions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des options depuis l\'API :', error);
      }
    }

    fetchOptions();
  }, []);

  const { closeModal } = useModal()

  return (
    <div>
      {/* <div>{`inputValue: '${inputValue.split(" - ")[0]}'`}</div> */}
      <Autocomplete
        value={autoValue}
        onChange={(event, newValue) => {
          setAutoValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue); //ID_TYPE CONGER
        }}
        id="controllable-states-demo"
        options={options.map(option => option.id_type_conger +" - "+ option.type_conger_desc)} // Utilisez les labels des options
        sx={{ width: "100%", margin: "10px 0px" }}
        renderInput={(params) => <TextField {...params} label="-- Type de congés --" />}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
          value={value}
          format='D-MM-YYYY'
          onChange={(newValue) => {
            setValue(newValue);
            console.log(value);
          }}
          sx={{margin: "15px 0px"}}
        />
      </LocalizationProvider>
      <div className='motif-status' style={{display: "flex", gap: "10px"}}>
        <TextField id="outlined-basic" label="Autres Motifs" variant="outlined" style={{ width: "100%"}}/>
        
      </div>

      <div className='btn-group' style={{width: "90%", display: "flex", justifyContent: "space-between", position: "absolute", bottom: "10px", left: "15px", margin: "10px"}}>
        <Button  variant="contained" startIcon={<ClearAllOutlined />} color='error'>Effacer</Button>
        <Button variant='contained' onClick={() => closeModal('modal2')} startIcon={<SaveAltOutlined />} color='success'>Enregistrer</Button>
      </div>
    </div>
  );
}

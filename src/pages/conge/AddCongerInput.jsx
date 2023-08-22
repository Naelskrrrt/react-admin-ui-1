import { Autocomplete, Button, TextField, TextareaAutosize } from '@mui/material'
import { DatePicker, DateRangePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Select from 'react-select'
import axios from 'axios';
import { ClearAllOutlined, ConstructionOutlined, SaveAltOutlined, TextFieldsSharp } from '@mui/icons-material';
import { useModal } from '../../components/ModalContext';
import Swal from 'sweetalert2';
import { modalClasses } from '@mui/base';


// import React, { useState, useEffect } from 'react';
// import { Autocomplete, TextField } from '@mui/material';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import localizedFormat from 'dayjs/plugin/localizedFormat';
//import { AdapterDayjs, LocalizationProvider, DateRangePicker } from '@mui/x-date-pickers-pro';

dayjs.extend(localizedFormat);

export default function AddCongerInput({ selectDefault, datePickerDefaultDeb, datePickerDefaultFin, motifDefault }) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([dayjs(), dayjs()]);
  const [autoValue, setAutoValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [avance, setAvance] = useState();

  const [formData, setFormData] = useState({
    selectedOption: '',
    startDate: dayjs(),
    endDate: dayjs(),
    motif: '',
  });

  // ...

  const handleFormSubmit = async () => {
    try {
      console.log(formData)
      const response = await axios.post('http://localhost:8080/conger', {
        id_type_congee: parseInt(formData.selectedOption.split(' - ')[0]),
        date_deb: formData.startDate.format('YYYY-MM-DD'),
        date_fin: formData.endDate.format('YYYY-MM-DD'),
        motif_conger: formData.motif,
      });

      console.log('Server response:', response.data);
      closeModal("modal1")
      // Show a success message
      Swal.fire('Success', 'Conger submitted successfully!', 'success');
    } catch (error) {
      console.error('Error submitting conger:', error);

      // Show an error message
      Swal.fire('Error', 'An error occurred while submitting conger.', 'error');
    }
  };

  const handleClick = () => {

  }

//   var avance;

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
      <Autocomplete
        value={autoValue}
        
        onChange={(event, newValue) => {
          setAutoValue(newValue);
          setFormData((prevFormData) => ({
            ...prevFormData,
            selectedOption: newValue,
          }));
        }}
        inputValue={inputValue}
        onInputChange={async (event, newInputValue) => {
          setInputValue(newInputValue);
          let value = parseInt(newInputValue.split(" - ")[0])
            const example = parseInt("1")
            if(value){
                try {
                        const response = await axios.get(`http://localhost:8080/type_conger/${value}`); // Assurez-vous que le chemin correspond à votre API Node.js
                        setAvance(response.data[0].avance_demande)
                        
                    } catch (error) {
                        console.error('Erreur lors de la récupération des options depuis l\'API :', error);
                    }
            }
          
        }}
        id="controllable-states-demo"
        options={options.map(option => option.id_type_congee +" - "+ option.type_congee_desc)} // Utilisez les labels des options
        sx={{ width: "100%", margin: "10px 0px" }}
        renderInput={(params) => <TextField {...params} label="-- Type de congés --" />}
      />

        <p
           
            style={{
                fontSize: "12px",
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "#1879b9"
            }}
        >
            {(avance != null) ? ((avance == 0) ? ">>> Vous pouvez partir après le depots du congé" : `>>> Approbation dans ${avance} jours`) : ""}
        </p>
        
      
        

    {/* DatePicker pour la date de fin */}
    <div className='date_container'
        style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center"
        }}
    >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                // defaultValue={"20-10-2022"}
                value={formData.startDate} // Utilisez la première valeur du tableau de dates
                format='D-MM-YYYY'
                onChange={(newValue) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    startDate: newValue, // Update startDate in formData
                  }));
                }}
                sx={{margin: "15px 0px"}}
            />
        </LocalizationProvider>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            value={formData.endDate} // Utilisez la deuxième valeur du tableau de dates
            format='D-MM-YYYY'
            minDate={formData.startDate}
             // Définissez la date minimale comme la date de début
             onChange={(newValue) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              endDate: newValue, // Update endDate in formData
            }));
          }}
            sx={{margin: "15px 0px"}}
        />
        </LocalizationProvider>
        <div style={{
            background: "#000",
            height: "54px",
            width: "50px",
            borderRadius: "10px",
            color: "#fff",
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Poppins",
            fontWeight: "600",
            backgroundColor: "#1879b9"
        }}>
            {
              formData.endDate.diff(formData.startDate, "day")
            }
        </div>
    </div>
      <div className='motif-status' style={{display: "flex", gap: "10px"}}>
        <TextField
            id="outlined-basic" 
            label="Autres Motifs" 
            variant="outlined" 
            style={{ width: "100%"}}
            minRows={4}
            value={formData.motif}
            onChange={(event) => {
              const newMotif = event.target.value;
              setFormData((prevFormData) => ({
                ...prevFormData,
                motif: newMotif,
              }));
            }}
        />
        
      </div>

      <div className='conger_footer'>
            <Button variant='contained' color='error'>Effacer</Button>
            <Button variant='contained' onClick={handleFormSubmit} color='primary'>Ajouter</Button>
        </div>

      
    </div>
  );
}

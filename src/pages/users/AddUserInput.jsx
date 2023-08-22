import { Autocomplete, Button, ButtonBase, TextField } from '@mui/material'
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useModal } from '../../components/ModalContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import "./addUserInput.scss"
import { SaveAltOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';
// import { Button } from '@mui/base';


function AddUserInput() {

    const [showPassword, setShowPassword] = useState(false);

    const [options, setOptions] = useState([]);
    const [autoValue, setAutoValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [niveau, setNiveau] = useState();

    const [empOptions, setEmpOptions] = useState([]);
    const [EmpAutoValue, setEmpAutoValue] = useState('');
    const [EmpInputValue, setEmpInputValue] = useState('');
    const [Emp, setEmp] = useState();

    
    const [formData, setFormData] = useState({
        matricule: '',
        selectedNiveau: '',
        email: '',
        password: '',
        selectedEmp: '',
      });

      const handleInscription = async () => {
        try {
          // Show a confirmation dialog using SweetAlert2
          if(formData.email == '' || formData.email == null){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Votre email est vide !',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
          } 
          else if(formData.matricule == '' || formData.matricule == null){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Votre Numéro de matricule est vide !',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
          }
          else if(formData.password == '' || formData.password == null){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Votre Mot de passe est vide !',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
          }
          else{
            const result = await Swal.fire({
                title: 'Confirmer l\'inscription',
                text: 'Êtes-vous sûr de vouloir inscrire cet utilisateur ?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Oui',
                cancelButtonText: 'Annuler',
            });
        
            // If user confirms, proceed with registration
            if (result.isConfirmed) {
                try {
                const response = await axios.post('http://localhost:8080/utilisateur', {
                    num_matricule: formData.matricule,
                    id_type_utilisateur: parseInt(formData.selectedNiveau.split(" - ")[0]),
                    email_user: formData.email,
                    password_user: formData.password,
                    id_employe: parseInt(formData.selectedEmp.split(" - ")[0]),
                });
        
                // You can handle the response from the API here
                console.log('Inscription successful:', response.data);
        
                // Close the modal using the closeModal function
                closeModal('modal3');
        
                // Show a success alert using SweetAlert2
                Swal.fire({
                    title: 'Inscription réussie',
                    text: 'L\'utilisateur a été inscrit avec succès.',
                    icon: 'success',
                });
                } catch (error) {
                console.error('Error during registration:', error);
                // Handle the error appropriately (e.g., show an error message)
                }
            }
          }
        } catch (error) {
          console.error('Error during confirmation:', error);
          // Handle the error appropriately (e.g., show an error message)
        }
      };

    useEffect(() => {
       async function fetchOptions() {
        try {
            const response = await axios.get('http://localhost:8080/type_utilisateur'); // Assurez-vous que le chemin correspond à votre API Node.js
            console.log(response.data)
            setOptions(response.data);
          } catch (error) {
            console.error('Erreur lors de la récupération des options depuis l\'API :', error);
          }
        }
    
        fetchOptions();
      }, []);

      useEffect(() => {
        async function fetchOptionsEmp() {
         try {
             const response = await axios.get('http://localhost:8080/employer'); // Assurez-vous que le chemin correspond à votre API Node.js
             console.log(response.data)
             setEmpOptions(response.data);
           } catch (error) {
             console.error('Erreur lors de la récupération des options depuis l\'API :', error);
           }
         }
     
         fetchOptionsEmp();
       }, []);
    
      const { closeModal } = useModal()
      
    
  return (
    <div className='container'>
        <div className='grid_input'>
            <TextField
                sx={{
                    gridColumn: "span 2"
                }}
                id="matricule_form" 
                label="Num Matricule" 
                variant="outlined" 
                // style={{ width: "100%"}}
                minRows={4}
                value={formData.matricule}
                onChange={(event) => {
                const newMatricule = event.target.value;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    matricule: newMatricule,
                }));
                }}
            />

            <Autocomplete
                value={autoValue}
                style={{
                    gridColumn: "span 3",
                    
                }}
                onChange={(event, newValue) => {
                setAutoValue(newValue);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    selectedNiveau: newValue,
                }));
                }}
                inputValue={inputValue}
                onInputChange={async (event, newInputValue) => {
                    setInputValue(newInputValue);
                    let value = parseInt(newInputValue.split(" - ")[0])
                    const example = parseInt("1")
                    if(value){
                        try {
                            const response = await axios.get(`http://localhost:8080/type_utilisateur/${value}`); // Assurez-vous que le chemin correspond à votre API Node.js
                            setNiveau(response.data[0].id_type_utilisateur)         
                        } catch (error) {
                            console.error('Erreur lors de la récupération des options depuis l\'API :', error);
                        }
                    }
                    
                }}
                id="controllable-states-demo"
                options={options.map(option => option.id_type_utilisateur +" - "+ option.type_desc)} // Utilisez les labels des options
                // sx={{ width: "100%", margin: "10px 0px" }}
                renderInput={(params) => <TextField {...params} label="Niveau Authorisation" />}
                />

            <Autocomplete
                style={{
                    gridColumn: "span 2"
                }}
                value={EmpAutoValue}
                onChange={(event, empNewValue) => {
                setEmpAutoValue(empNewValue);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    selectedEmp: empNewValue,
                }));
                }}
                inputValue={EmpInputValue}
                onInputChange={async (event, newInputValue) => {
                    setEmpInputValue(newInputValue);
                    let value = parseInt(newInputValue.split(" - ")[0])
                    const example = parseInt("1")
                    if(value){
                        try {
                            const response = await axios.get(`http://localhost:8080/employer/${value}`); // Assurez-vous que le chemin correspond à votre API Node.js
                            setEmp(response.data[0].id_employee)         
                        } catch (error) {
                            console.error('Erreur lors de la récupération des options depuis l\'API :', error);
                        }
                    }
                    
                }}
                id="controllable-states-demo"
                options={empOptions.map(option => option.id_employe +" - "+ option.nom_employe)} // Utilisez les labels des options
                // sx={{ width: "100%", margin: "10px 0px" }}
                renderInput={(params) => <TextField {...params} label="Employé" />}
            />

            <TextField
                // type='password'
                sx={{
                    gridColumn: "span 3"
                }}  
                id="email_form" 
                label="Adresse Email" 
                variant="outlined" 
                style={{ width: "100%"}}
                minRows={4}
                value={formData.email}
                onChange={(event) => {
                const newEmail = event.target.value;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    email: newEmail,
                }));
                }}
            />
            <div
                style={{
                    position: "relative",
                    gridColumn: "span 5"
                    // background: "#000"
                }}
            >
                <TextField
                    // type='password' 
                    sx={{
                        
                    }} 
                    id="password_form" 
                    label="Mot de passe"
                    helperText="Envoyer à l'utilisateur" 
                    variant="outlined" 
                    style={{ width: "100%"}}
                    type={showPassword ? 'text' : 'password'}
                    minRows={4}
                    value={formData.password}
                    onChange={(event) => {
                    const newPassword = event.target.value;
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        password: newPassword,
                    }));
                    }}
                />
                <Button
                        style={{
                            position: "absolute",
                            right: "-6px",
                            top: "10px"
                        }}
                        variant="text"
                        className='eye'
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </Button>
                {/* <Button variant="text" className='eye'>Text</Button> */}
            </div>
            <div
                style={{
                    gridColumn: "3 / 4"
                }}
            >
                <Button variant='contained' onClick={handleInscription} startIcon={<SaveAltOutlined />}>Inscrire</Button>
            </div>

        </div>
        <div className='user_footer'>
                
        </div>
    </div>

  )
}

export default AddUserInput
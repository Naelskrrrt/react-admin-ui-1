// import { , Input } from '@mui/base'
import { BorderAllRounded, PersonAddAlt, Repeat } from '@mui/icons-material';
import { Autocomplete, TextField, Button } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useModal } from '../ModalContext';
import { ImageCompressor } from 'image-compressor';
import "./addEmpInput.scss"


function AddEmpInput() {

    const [image, setImage] = useState("");
    const [EmpAutoValue, setEmpAutoValue] = useState('');
    const [EmpInputValue, setEmpInputValue] = useState('');
    const [empOptions, setEmpOptions] = useState([]);
    const [Emp, setEmp] = useState();
    const [formDataEmp, setFormDataEmp] = useState({
        nom: '',
        prenom: '',
        fonction: '',
          selectedSup: '',

    });

    const {closeModal} = useModal()

    async function convertToBase64(e) {
      try {
          const compressedImage = await ImageCompressor(e.target.files[0], {
              quality: 0.6, // You can adjust the quality
              maxWidth: 800, // You can adjust the maximum width
              maxHeight: 800, // You can adjust the maximum height
          });
  
          setImage(compressedImage);
      } catch (error) {
          console.log('Error compressing image:', error);
      }
  }
    const handleInscription = async () => {
        try {
          // Show a confirmation dialog using SweetAlert2
          console.log(formDataEmp)
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
              const response = await axios.post('http://localhost:8080/employer', {
                nom_employe: formDataEmp.nom,
                prenom_employe: formDataEmp.prenom,
                fonction_employe: formDataEmp.fonction,
                photo_employe: image,
                id_sup_employe: formDataEmp.selectedSup
              },);
    
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
        } catch (error) {
          console.error('Error during confirmation:', error);
          // Handle the error appropriately (e.g., show an error message)
        }
      };





    function convertToBase64(e){
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result)
        }
        reader.onerror = err => {
            console.log("Error: ", err);
        }
    }

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
  return (
    <div className='container'>
        <div className='grid_system'>
            <TextField 
                variant='outlined' 
                type='text' 
                label="Nom"
                value={formDataEmp.nom}
                onChange={(event) => {
                const newName = event.target.value;
                setFormDataEmp((myFormData) => ({
                    ...myFormData,
                    nom: newName,
                }));
                }}
                sx={{
                  gridColumn: "span 3"
                }}
            />
            <TextField 
                variant='outlined' 
                type='text' 
                label="Prenoms"
                value={formDataEmp.prenom}
                onChange={(event) => {
                const newFirstName = event.target.value;
                setFormDataEmp((myFormData) => ({
                    ...myFormData,
                    prenom: newFirstName,
                }));
                }}
                sx={{
                  gridColumn: "span 3"
                }}
            />

            <TextField 
                variant='outlined' 
                type='text' 
                label="Fonction"
                value={formDataEmp.fonction}
                onChange={(event) => {
                const newFonction = event.target.value;
                setFormDataEmp((myFormData) => ({
                    ...myFormData,
                    fonction: newFonction,
                }));
                }}
                sx={{
                  gridColumn: "span 2"
                }}
            />
            <Autocomplete
                // style={{
                //     gridColumn: "span 2"
                // }}
                sx={{
                  gridColumn: "span 4"
                }}
                value={EmpAutoValue}
                onChange={(event, empNewValue) => {
                setEmpAutoValue(empNewValue);
                setFormDataEmp((myFormData) => ({
                    ...myFormData,
                    selectedSup: parseInt(empNewValue.split(" - ")[0]),
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
                options={empOptions.map(option => option.id_employe +" - "+ option.nom_emp)} // Utilisez les labels des options
                // sx={{ width: "100%", margin: "10px 0px" }}
                renderInput={(params) => <TextField {...params} label="Employé" />}
            />
            
                <TextField
                    style={{gridColumn: "span 4", gridRow: "span 2"}}
                    accept='image/*'
                    inputProps={{
                        accept: 'image/*'
                    }}
                    
                    onChange={convertToBase64}
                    type='file' />
                    <div style={{gridColumn: "span 2", gridRow: "span 2", padding: "5px", border: "1px solid #205e882d", borderRadius: "10px"}}>
                      {!(image == "" || image == null) ? <img style={{width: "100%",height: "100%", objectFit: "cover", borderRadius: "10px"}}  src={image} /> : <img style={{width: "100%",height: "100%", objectFit: "cover", borderRadius: "10px"}} src='/noavatar.png' />}
                    </div>
            
            {/* <div> */}
                <Button sx={{
                  gridColumn: "3 / 5",
                }} variant="contained" onClick={handleInscription} startIcon={<PersonAddAlt />}>Enregistrer</Button>
            {/* </div> */}
        </div>
    </div>
  )
}

export default AddEmpInput
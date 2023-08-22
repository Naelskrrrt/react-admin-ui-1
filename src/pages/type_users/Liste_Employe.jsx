import { DataGrid, GridActionsCellItem, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./list_employe.scss"
import axios from "axios";


// import deleteUser from "./dataTablectrl.js"

import React, { useCallback, useEffect, useState } from "react";
import { EditNoteOutlined, HighlightOffOutlined, TaskAltOutlined } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
// import { useModal } from "../../../components/ModalContext";
import Swal from "sweetalert2";
// import { useModal } from "../../../components/ModalContext";






function Liste_Employe() {

//   const {openModal, closeModal, getModalState} = useModal()

  let [rowSelectionModel, setRowSelectionModel] = useState([])

  const deleteConge = useCallback((id) => {
    Swal.fire({
      title: 'Vous etes sure?',
      text: "Ce que vous essayez de faire est irreverssible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer',
      cancelButtonText: "Annuler"
      
    }).then((result) => {
      console.log('miverif le condition')
      console.log(result.isConfirmed)
      if(result.isConfirmed){
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        axios
        .delete(`http://localhost:8080/employer/${id}`)
        .then((response) => {
          console.log(response)
          setData((prevData) => ({
            ...prevData,
            rows: prevData.rows.filter((row) => row.id_employe !== id),
          }));
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        })
      }
      
    }).catch((err) => {
      console.log("Something wrong: ", err)
    })
    
   
    
  }, []);

  const [data, setData] = useState({
    rows: [],
    columns:[
        { field: 'id_employe', headerName: '#', width: 70 },
        {
            field: "photo_employe",
            headerName: "Avatar",
            width: 100,
            renderCell: (params) =>{
                if(params.row.photo_employe){
                    return (
                        
                        <img src={params.row.photo_employe} style={{ width: "60px", height: "60px", objectFit: "contain"}} />
                    )
                } else{
                    return (
                        
                        <img src="/noavatar.png" style={{ width: "60px", height: "60px"}} />
                    )
                }
            }
        },
        {
            field: "nom_emp", headerName:"Nom", width:170,
        },
        {
          field: 'prenom_employe',
          headerName: 'Prénoms',
          width: 200,
          editable: true,
        },
        {
          field: "fonction_employe",
          headerName: "Fonction",
          width: 170,
        },
        {
          field: "nom_sup",
          headerName: "Nom du supérieur",
          width: 200,
          renderCell: (params) => {
            if(params.row.nom_sup){
                return params.row.nom_sup
            } else return <p style={{color: "red", fontWeight: "500"}}>Aucun</p>
          }
        },
        
        
       
        {
          field: 'actions',
          type: 'actions',
          width: 100,
          getActions: (params) => [
            <GridActionsCellItem
              icon={
                <Tooltip title="Supprimer">
                  <DeleteOutlineOutlinedIcon style={{color: 'red', fontSize: '25px'}} />
                </Tooltip>
                }
              label="Delete"
              onClick={() => deleteConge(params.id)}
            />,
           
          ],
        },
      ],
    },
    [deleteConge]
    )
    
      
    
      useEffect(() => {
        axios.get('http://localhost:8080/employer')
          .then((response) => {
            console.log(response)
            setData((prevData) => ({ ...prevData, rows: response.data }));
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);

      const getRowId = (row) => row.id_employe

      
      const [showAddButton, setShowAddButton] = useState(false);

      useEffect(() => {
        const isStatusValidated = data.rows.some((row) => row.statut_conger === "en attente");
        // console.log(data.rows)
        console.log(isStatusValidated)
        console.log("ity raha tadiavinao", rowSelectionModel);
        setShowAddButton(isStatusValidated && (rowSelectionModel.length === 1));
        console.log("mety eh", showAddButton)
      }, [data.rows, rowSelectionModel]);

      let handleAddButtonClick = () => {
        console.log("voclick")
      }

      
      
    return ( 
      <>
        <div className="dataTable">
            <DataGrid
                density="comfortable"
                className="dataGrid"
                rows={data.rows}
                getRowId={getRowId}
                columns={data.columns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 6,
                    },
                },
                }}
                slots={{toolbar:GridToolbar}}
                slotProps={{
                    toolbar:{
                        showQuickFilter: true,
                        quickFilterProps: {debounceMs: 500}
                    }
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                  console.log("ato ai au frais", rowSelectionModel)
                 
                }}
                rowSelectionModel={rowSelectionModel}
                
                disableRowSelectionOnClick
                disableColumnFilter
                
                disableColumnSelector
            />


        </div>
        
        {showAddButton && (
            <div className="validation-btn">
              <Button variant="contained" color="success" startIcon={<TaskAltOutlined />} onClick={handleAddButtonClick}>Valider</Button>
              <Button variant="contained" color="error" startIcon={<HighlightOffOutlined />} onClick={handleAddButtonClick}>Refuser</Button>
            </div>
          )}
        </>
        
     );
}

export default Liste_Employe;
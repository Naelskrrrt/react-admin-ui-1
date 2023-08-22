import { DataGrid, GridActionsCellItem, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./dataTable.scss"
import axios from "axios";

// import deleteUser from "./dataTablectrl.js"

import React, { useCallback, useEffect, useState } from "react";
import { EditNoteOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useModal } from "../../../components/ModalContext";
import Swal from "sweetalert2";





function DataTable() {

  const { openModal, closeModal, getModalState } = useModal();
  const deleteUser = useCallback((id) => {
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
        .delete(`http://localhost:8080/utilisateur/${id}`)
        .then((response) => {
          console.log(response)
          setData((prevData) => ({
            ...prevData,
            rows: prevData.rows.filter((row) => row.id_utilisateur !== id),
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
        { field: 'id_utilisateur', headerName: '#', width: 90 },
        {
            field: "num_matricule", headerName:"Matricule", width:100,
        },
        {
          field: "type_desc",
          headerName: "Authorisation",
          width: 150,
        },
        {
          field: 'nom_employe',
          headerName: 'Nom',
          width: 150,
          editable: true,
        },
        {
          field: 'prenom_employe',
          headerName: 'Prénoms',
          width: 100,
          editable: true,
        },
        {
          field: 'fonction_employe',
          headerName: 'Fonction',
          width: 100,
          editable: true,
        },
        {
          field: "email_user",
          headerName: "Email",
          width: 180,
        },

       
        {
          field: 'actions',
          type: 'actions',
          // headerName: 'Supprimer',
          width: 100,
          getActions: (params) => [
            <GridActionsCellItem
              icon={
                <Tooltip title="Supprimer">
                  <DeleteOutlineOutlinedIcon style={{color: 'red', fontSize: '25px'}} />
                </Tooltip>
              }
              label="Delete"
              onClick={() => deleteUser(params.id)}
            />,
            <GridActionsCellItem
            onClick={() => openModal('modal4')}
            icon={
              <Tooltip title="Modifier">
                <EditNoteOutlined style={{color: '#1879B9', fontSize: '25px'}}/>
              </Tooltip>
            }
            label="Toggle Admin"
            // onClick={toggleAdmin(params.id)}
            
          />,
          ],
        },
      ],
    },
    [deleteUser]
    )
    
      
    
      useEffect(() => {
        axios.get('http://localhost:8080/utilisateur')
          .then((response) => {
            console.log(response)
            setData((prevData) => ({ ...prevData, rows: response.data }));
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);

      const getRowId = (row) => row.id_utilisateur
      
      
    return ( 
        <div className="dataTable">
            <DataGrid
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
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableColumnSelector
            />
        </div>
        
     );
}

export default DataTable;
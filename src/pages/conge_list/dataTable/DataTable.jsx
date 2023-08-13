import { DataGrid, GridActionsCellItem, GridDeleteIcon, GridToolbar } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./dataTable_congeList.scss"
import axios from "axios";


// import deleteUser from "./dataTablectrl.js"

import React, { useCallback, useEffect, useState } from "react";
import { EditNoteOutlined, HighlightOffOutlined, TaskAltOutlined } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import { useModal } from "../../../components/ModalContext";
import Swal from "sweetalert2";
// import { useModal } from "../../../components/ModalContext";






function DataTable() {

  const {openModal, closeModal, getModalState} = useModal()

  let [rowSelectionModel, setRowSelectionModel] = useState([])

  const deleteConge = useCallback((id) => {
    console.log("vohiditra")
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log('miverif le condition')
      console.log(result.isConfirmed)
      np
    }).catch((err) => {
      console.log("Something wrong: ", err)
    })
  }, []);

  const [data, setData] = useState({
    rows: [],
    columns:[
        { field: 'id_conger', headerName: '#', width: 50 },
        {
            field: "nom_employe", headerName:"Nom", width:100,
        },
        {
          field: 'email_user',
          headerName: 'Email',
          width: 170,
          editable: true,
        },
        {
          field: "date_deb",
          headerName: "Date Début",
          width: 150,
        },
        {
          field: "date_fin",
          headerName: "Date Fin",
          width: 150,
        },
        {
          field: "duree",
          headerName: "Durée",
          width: 100,
        },
        {
          field: "type_congee_desc",
          headerName: "Type de Congés",
          width: 200,
        },
        {
          field: "statut_conger",
          headerName: "Status",
          width: 100
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
            <GridActionsCellItem
            icon={
              <Tooltip title="Modifier">
                <EditNoteOutlined style={{color: '#1879B9', fontSize: '25px'}}/>
              </Tooltip>
            }
            onClick={() => openModal('modal2')}
            label="Toggle Admin"
          />,
          ],
        },
      ],
    },
    [deleteConge]
    )
    
      
    
      useEffect(() => {
        axios.get('http://localhost:8080/conger')
          .then((response) => {
            console.log(response)
            setData((prevData) => ({ ...prevData, rows: response.data }));
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);

      const getRowId = (row) => row.id_conger

      
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

export default DataTable;
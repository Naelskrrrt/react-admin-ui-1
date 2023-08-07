import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss"
import axios from "axios";

import { useEffect, useState } from "react";
function DataTable() {

  const [data, setData] = useState({
    rows: [],
    columns:[
        { field: 'id_utilisateur', headerName: '#', width: 90 },
        {
            field: "num_matricule", headerName:"Matricule", width:100,
        },
        
          // {
          //   field: 'id_employe',
          //   headerName: 'Email',
          //   width: 100,
            
          // },
        {
          field: 'nom_employe',
          headerName: 'Nom',
          width: 150,
          editable: true,
        },
        {
          field: 'fonction_employe',
          headerName: 'Fonction',
          width: 150,
          editable: true,
        },
        {
          field: 'num_phone',
          headerName: 'N° Tel',
          width: 150,
          editable: true,
        },
        {
          field: "user_email",
          headerName: "Email",
          width: 200,
        },
      ]
    })
      
    
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
                    pageSize: 4,
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
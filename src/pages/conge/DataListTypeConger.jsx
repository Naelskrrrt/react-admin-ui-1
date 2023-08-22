

import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
  


export default function ElementList() {
  const [data, setData] = useState({ 
    rows: [],
    columns: [
      { field: 'id_type_congee', headerName: '#', width: 50 },
      { field: 'type_congee_desc', headerName: 'Type Congés', width: 250},
      { field: 'avance_demande', headerName: 'Délai', type: 'number', width: 60 },
    ]
  });

  useEffect(() => {
    axios.get('http://localhost:8080/type_conger')
      .then((response) => {
        console.log(response)
        setData((prevData) => ({ ...prevData, rows: response.data }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const getRowId = (row) => row.id_type_congee

  return (
    <div style={{ height: 250, width: '100%' }}>
      <DataGrid
        getRowId={getRowId}
        rows={data.rows}
        columns={data.columns}
        hideFooterPagination
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}

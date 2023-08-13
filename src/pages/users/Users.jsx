import { DataGrid } from "@mui/x-data-grid";


import DataTable from "./dataTable/DataTable";
import "./users.scss"
import { AddOutlined, ShoppingCartRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useModal } from "../../components/ModalContext";
import AddUserModal from "./modal/AddUserModal";
import UpdateModal from "./modal/UpdateModal";

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: "avatar", headerName:"Avatar", width:100,
        renderCell: (params) => {
            return <img src={params.row.img || "/noavatar.png"} alt="" />
        }
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return <div className="action">
          <div className="view">view</div>
          <div className="delete">delete</div>
        </div>
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      type: "boolean"
    },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, status: true},
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, status: false},
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, status: true},
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];
  
function Users() {
  const { openModal, closeModal, getModalState } = useModal();
    return ( 
        <div className="users">
            <div className="info">
                <h1>Utilisateurs</h1>
                <Button onClick={() => openModal("modal3")} variant="text" startIcon={<AddOutlined />}>
                  Ajouter
                </Button>
            </div>
            <DataTable columns={columns } />
            <AddUserModal title="Bonjour"> Mandehaaaaaa</AddUserModal>
            <UpdateModal title='Bonjour'>Vomaika tafa be</UpdateModal>
        </div>
     );
}

export default Users;
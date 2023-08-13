import { AddOutlined } from "@mui/icons-material";
import "./conge_list.scss"
import DataTable from "./dataTable/DataTable";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Modal from "./modal/ModalShow";
import Updateinput from "./updateinput";
// import AddCongerModal from "../../components/navbar/AddCongerModal";

const columns = [];
  
  const rows = [];
function Conge_list() {
    const handleAddButtonClick = () => {

    }
    return ( 
        <div className="conges">
            <div className="info">
                <h1>Listes des Congés</h1>
            </div>
            <DataTable columns={columns } />
            <Modal title="Mise à Jour de données" children={<Updateinput />} />

        </div>
     );
}

export default Conge_list;
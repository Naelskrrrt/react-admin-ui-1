import "./home.scss"
import "../../styles/variables.scss"
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
// import "dayjs/locale/fr"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Height } from "@mui/icons-material";


dayjs.locale("fr"); // Set French locale globally


function formatDate(date) {
    // Create a new dayjs object using the provided date
    const formattedDate = dayjs(date).format("D MMMM YYYY");
  
    return formattedDate;
  }
function Home() {
    const currentDate = new Date()
    const formattedDate = formatDate(currentDate)
    return ( 
        <div className="home">
            <div className="box box1">Solde</div>
            <div className="box box2">
                <div className="date">{dayjs(formattedDate).format("D")}</div>
                <span className="month">{dayjs(formattedDate).format("MMMM")}</span>
                <span className="year">{dayjs(formattedDate).format("YYYY")}</span>
            </div>
            <div className="box box4">Chart fonction Historique</div>
            <div className="box box3">Historique Congé</div>
            <div className="box box5">Manipulation rapide</div>

        </div>
     );
}

export default Home;
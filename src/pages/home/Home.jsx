import "./home.scss"
import "../../styles/variables.scss"
function Home() {
    return ( 
        <div className="home" style={{backgroundColor: "#0e0a1a"}}>
            <div className="box box1">Solde</div>
            <div className="box box2">Mois</div>
            <div className="box box3">Historique Congé</div>
            <div className="box box4">Chart fonction Historique</div>
            <div className="box box5">Manipulation rapide</div>

        </div>
     );
}

export default Home;
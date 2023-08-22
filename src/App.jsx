import Home from "./pages/home/Home"
import Users from "./pages/users/Users";
// import Product from "./pages/products/Product";
// import Type_users from "./pages/products/type_users";
import "./styles/global.scss"
import Liste_Employe from "./pages/type_users/Liste_Employe";
import Conge from "./pages/conge/Conge"
import Profile from "./pages/profile/Profile"
import Type_conge from "./pages/type_conges/Type_conges"
import Stats from "./pages/stats/Stats";





import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Menu } from "./components/menu/Menu"
import Login from "./pages/login/Login";
import Conge_list from "./pages/conge_list/Conge_list";
import { Fab, Tooltip } from "@mui/material";
import { AddOutlined, PersonAddAlt1Outlined } from "@mui/icons-material";

// VIDEO: 23:17

function App() {

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <section className="content">
            <div className="contentContainer">
              <Outlet />
              
            </div>
          </section>
        </div>
        <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/users",
          element: <Users />
        },
        {
          path: "/liste_employe",
          element: <Liste_Employe />
        },
        {
          path: "/ajoutConger",
          element: <Conge />
        },
        {
          path: "/profil",
          element: <Profile />
        },
        {
          path: "/type_conge",
          element: <Type_conge />
        },
        {
          path: "/stats",
          element: <Stats />
        },
        {
          path: "/solde_conge",
          element: <Conge_list />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App

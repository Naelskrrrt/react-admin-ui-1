import Home from "./pages/home/Home"
import Users from "./pages/users/Users";
// import Product from "./pages/products/Product";
// import Type_users from "./pages/products/type_users";
import "./styles/global.scss"
import Type_users from "./pages/type_users/type_users";
import Conge from "./pages/conge/Conge"
import Profile from "./pages/profile/Profile"
import Type_conge from "./pages/type_conges/Type_conges"
import Stats from "./pages/stats/Stats";
import Solde_conge from "./pages/solde_conge/Solde_conge";




import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";
import { Menu } from "./components/menu/Menu"
import Login from "./pages/login/Login";

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
          path: "/type_users",
          element: <Type_users />
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
          element: <Solde_conge />
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

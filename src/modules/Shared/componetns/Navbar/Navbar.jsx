
import { useContext } from "react";
import './NavBar.css'
import { AuthContext } from "../../../../context/AuthContext";

export default function Navbar() {
   let{loginData} = useContext(AuthContext)

  return (
    <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3">
    <a className="navbar-brand" href="#">Navbar</a>
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a className="nav-link">{loginData?.userName}</a>
      </li>
     
    </ul>
  </nav>

    
  )
}

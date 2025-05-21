import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import './NavBar.css'

export default function Navbar() {
   const [loginData , setLoginData] = useState(null)
    let saveLoginData = () =>{
      let enCodedToken = localStorage.getItem('token');
      let deCodedToken = jwtDecode(enCodedToken);
      
      setLoginData(deCodedToken);
      
    }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      saveLoginData();
      
    }
  },[])
  return (
    <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3">
    <a className="navbar-brand" href="#">Navbar</a>
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a className="nav-link" href="#scrollspyHeading1">{loginData?.userName}</a>
      </li>
     
    </ul>
  </nav>

    
  )
}

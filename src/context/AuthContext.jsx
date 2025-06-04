import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider({children}){
    const [loginData , setLoginData] = useState(null)
    let saveLoginData = () =>{
      let enCodedToken = localStorage.getItem('token');
      let deCodedToken = jwtDecode(enCodedToken);
      
      setLoginData(deCodedToken);
      
    }
    useEffect(()=>{
      if(localStorage.getItem('token')) saveLoginData();
    },[])
    return <AuthContext.Provider value={{saveLoginData ,loginData} } >{children}</AuthContext.Provider>
}
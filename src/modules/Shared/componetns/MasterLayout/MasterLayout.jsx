
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import SideBar from '../Sidebar/SideBar'

export default function MasterLayout() {
  
      let{loginData} = useContext(AuthContext)
  return (
    <>
    <div className="d-flex pt-1 bg-white gap-2 px-1">
        <div >
          <SideBar  />
        </div>

        <div  style={{width:"calc(100% - 85px)"}}>
          <Navbar loginData={loginData}/>
          <Outlet />
        </div>

    </div>
    </>
  )
}

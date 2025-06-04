
import SideBar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'

export default function MasterLayout() {
  
      let{loginData} = useContext(AuthContext)
  return (
    <>
    <div className="d-flex pt-3 bg-white gap-1 px-2">
        <div >
          <SideBar  />
        </div>

        <div className="w-100">
          <Navbar loginData={loginData}/>
          <Outlet />
        </div>

    </div>
    </>
  )
}

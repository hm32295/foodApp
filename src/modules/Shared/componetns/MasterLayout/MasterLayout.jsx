import React from 'react'
import SideBar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({loginData}) {
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

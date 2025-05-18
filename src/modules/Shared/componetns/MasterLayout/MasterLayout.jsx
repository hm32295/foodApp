import React from 'react'
import SideBar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function MasterLayout({loginData}) {
  return (
    <>
    <div className="d-flex">
     
          <SideBar  />

        <div className="w-75 bg-warning">
          <Navbar loginData={loginData}/>
          <Outlet />
        </div>

    </div>
    </>
  )
}


import {  faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import logoImg from "../../../../assets/image/logoImg.png";
import logoImgSmall from "../../../../assets/image/logoImgSmall.png";
import "./sideBar.css";
import iconUser from "../../../../assets/icons/iconUser.svg"
import iconRecipes from "../../../../assets/icons/iconRec.svg"
import iconCategories from "../../../../assets/icons/iconCategorise.svg"
import iconlog from "../../../../assets/icons/iconLogout.svg"
import iconChange from "../../../../assets/icons/iconChangePassword.svg"
import iconFav from "../../../../assets/icons/favIcon.svg"
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';



export default function SideBar() {
  const [collapse, setCollapse] = useState(true)
  const{loginData} = useContext(AuthContext)
  const{logout} = useContext(AuthContext)
  let handelCollapsed = (collapse)=>{

    setCollapse(!collapse)
  }

  return (
    <div className='sidebar-con'>
       


          <Sidebar collapsed={collapse} > 
            <Menu >    
             {!collapse&&(
              <MenuItem className='sidebar-logo'> 
                <img onClick={()=>{handelCollapsed(collapse)}} src={logoImg} alt="logo" /> 
              </MenuItem>
             )}
            {collapse&&(
              <MenuItem className='sidebar-logo-small'> 
                <img onClick={()=>{handelCollapsed(collapse)}}    src={logoImgSmall} alt="logo" /> 
              </MenuItem>
            )

            }
              <MenuItem icon={<FontAwesomeIcon icon={faHouse} />} component={<Link to="/dashboard" />}> Home </MenuItem>
              {loginData?.userGroup !== "SystemUser"&&(
                <>
                    <MenuItem icon={<img src={iconUser} alt="iconUser" />} component={<Link to="/dashboard/users" />}> Users </MenuItem>
                    <MenuItem icon={<img src={iconCategories} alt="iconCategories" />} component={<Link to="/dashboard/Categorise-list" />}> Categories </MenuItem>
                </>
              )}
              {loginData?.userGroup === "SystemUser"&&(
                  <>
                    <MenuItem icon={<img src={iconFav} alt="iconCategories" />} component={<Link to="/dashboard/Favorite" />}> Favorite </MenuItem>
                  </>
              )}
              <MenuItem icon={<img src={iconRecipes} alt="iconRecipes" />} component={<Link to="/dashboard/Recipes-list" />}> Recipes </MenuItem>
              <MenuItem icon={<img src={iconChange} alt="iconChange" />} component={<Link to="/change-password/" />}> Change Password </MenuItem>
              <MenuItem className='sidebar-logout' 
                 onClick={()=>{ logout() }} icon={<img src={iconlog} alt="iconlog" />} component={<Link to="/login" />}> log out </MenuItem>
             
            </Menu>
          </Sidebar>
    </ div >
  )
}

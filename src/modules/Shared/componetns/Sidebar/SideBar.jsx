
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function SideBar() {

  return (
    <div className='w-25' >
       
      

          <Sidebar width={250} collapsed={false} rootStyles={styleSidebar}> 
            <Menu rootStyles={styleMenu}>
              
              <MenuItem icon={<FontAwesomeIcon icon={faEyeSlash} />} component={<Link to="/dashboard" />}> Home </MenuItem>
              <MenuItem component={<Link to="/dashboard/users" />}> Users </MenuItem>
              <MenuItem component={<Link to="/dashboard/Recipes-list" />}> Recipes </MenuItem>
              <MenuItem component={<Link to="/dashboard/Categorise-list" />}> Categories </MenuItem>
             
            </Menu>
          </Sidebar>
    </ div >
  )
}
 const styleSidebar={
  backgroundColor : "transparent",
  //  display: "flex",
  //  justifyContent: "center",
  // //  alignItems: "center",
  //  flexDirection: "column",
  }
  const styleMenu ={
   paddingTop : "38px",
  width : "100%",
  borderTopRightRadius:"58px", 
  background: "#1F263E", 
  color:"#fff"

 }
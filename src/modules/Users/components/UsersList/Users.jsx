import img from "../../../../assets/image/header receList.png"
import Header from '../../../Shared/componetns/Header/Header'
import NoData from '../../../Shared/componetns/NoData/NoData';
import { faEllipsis, faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';;
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { axiosInstance, beasImageURL, RECIPES_URLS, USERS_URLS } from '../../../../services/urls';
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../../Shared/componetns/DeleteConfirmation/DeleteConfirmation";
export default function Users() {
  

  const navigate = useNavigate()
  const[users ,setUsers] = useState([]);
  const[updateData , setUpdateData] = useState(true);
  const [loders ,setLoders] = useState(false)
 
  useEffect(()=>{setUpdateData(!updateData)},[])
  useEffect(()=>{
    
    setLoders(true)
    axiosInstance(USERS_URLS.GET_ALL_USERS+"/?pageSize=1&pageNumber=",
     
    ).then((res)=>{
      setUsers(res.data.data);
      setLoders(false)
    })
  },[updateData])



  return (
    <div className='categoriseList RecipesList'>
      <Header description={'You can now add your items that any user can order it from the Application and you can edit'}  
      title={'users list'} img={img}/>
      <div className="sub-categoriseList-title d-flex justify-content-between p-3 align-items-center">
        <div>
            <h4>Users Table Details</h4>
            <p>You can check all details</p>
        </div>
        
      </div>

      <div className="sub-categoriseList-table mb-5 w-100">
        <table className='w-100 rounded-2'>
          <thead >
              <tr>
                <th> userName</th>
                <th>email</th>
                <th>image</th>
                <th>country</th>
                <th>phone Number</th>
                <th>group</th>
                <th>actions</th>
              </tr>
          </thead>
         
          <tbody>

          { !loders&&(

          users.map((ele)=>{
              return(


                  <tr key={ele.id || 2}>
                    <td>{ele.userName}</td>
                    <td>{ele.email}</td>
                    <td>
                      <img src={`${beasImageURL}${ele.imagePath}`} alt="img recipes" />
                    </td>
                    <td>{ele.country}</td>
                    <td>{ele.phoneNumber}</td>
                    <td>{ele.group?.name}</td>
                    <td> 
                      <FontAwesomeIcon className='listIcon' icon={faEllipsis} />
      
                        <div className="list">
                          <div >
                            <button>
                              <FontAwesomeIcon className='subIcon' icon={faEye} />
                              <span>View</span>
                            </button>
                            
                          </div>
                          
                          <div>
                              <DeleteConfirmation id={ele.id} type='users' 
                              nameEle={ele.userName} setUpdateData={setUpdateData} updateData={updateData}/>
                            
                          </div>
                        </div>
                    
                    </td>
                  </tr>
              )
              })
            ) 
          }
      </tbody>
        
        </table>
        {loders &&(

            <div className='mt-5 d-flex justify-content-center w-100'>
                <ClipLoader  size={50} color='#000'/>
            </div>
        )}
        <ToastContainer /> 
       {!users.length &&  (
        !loders && <NoData />
       )}
        
      </div>
        
    </div>
  )
}





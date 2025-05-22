
import Header from '../../../Shared/componetns/Header/Header';
import imgHeader from '../../../../assets/image/header dashboard.png';
// import iconButton from "../../../../assets/icons/arrowRight.svg";
import "./categoriseList.css"
import NoData from '../../../Shared/componetns/NoData/NoData';
import DeleteConfirmation from '../../../Shared/componetns/DeleteConfirmation/DeleteConfirmation';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddCategorise from '../AddCategorise/AddCategorise';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ViewCategorise from '../ViewCategorise/ViewCategorise';
import { ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { axiosInstance, CATEGORIIES_URLS } from '../../../../services/urls';

let addCategorise= 'https://upskilling-egypt.com:3006/api/v1/Category/'
export default function CategoriseList() {
  const[categories ,setCategorise] = useState([]);
  const[updateData , setUpdateData] = useState(true);
  const [loders ,setLoders] = useState(false)

  useEffect(()=>{setUpdateData(!updateData)},[])
  useEffect(()=>{
    setLoders(true)
    axiosInstance(CATEGORIIES_URLS.GET_CATEGORY+"/?pageSize=5&pageNumber=1",
     
    ).then((res)=>{
      setCategorise(res.data.data);
      setLoders(false)
    })
  },[updateData])
  return (
    <div className='categoriseList'>
      <Header description={'You can now add your items that any user can order it from the Application and you can edit'}  title={'Categories item'} img={imgHeader}/>
      <div className="sub-categoriseList-title d-flex justify-content-between p-3 align-items-center">
        <div>
            <h4>Categories Table Details</h4>
            <p>You can check all details</p>
        </div>
        
        <AddCategorise setUpdateData={setUpdateData} updateData={updateData} link={addCategorise} nameSpan={"Add New "} />
      </div>

      <div className="sub-categoriseList-table mb-5 w-100">
        <table className='w-100 rounded-2'>
          <thead >
              <tr>
                <th> name</th>
                <th></th>
                <th>modificationDate</th>
                <th>creationDate</th>
                <th>actions</th>
              </tr>
          </thead>
         
          <tbody>

          {
              categories.map((ele)=>{
                return(
                  
                    <tr key={ele.id || 2}>
                      <td>{ele.name}</td>
                      <td> 350.99</td>
                      <td>{ele.modificationDate}</td>
                      <td>{ele.creationDate}</td>
                      <td> 
                        <FontAwesomeIcon className='listIcon' icon={faEllipsis} />
        
                          <div className="list">
                            <div >
                              <ViewCategorise id={ele.id} />
                              
                            </div>
                            <div>
                              <AddCategorise setUpdateData={setUpdateData} updateData={updateData} link={addCategorise} id={ele.id} nameEle={ele.name} nameSpan={"edit"} classNameToIcon={'subIcon'}/>
                            </div>
                            <div>
                              <DeleteConfirmation nameEle={ele.name} setUpdateData={setUpdateData} updateData={updateData} id={ele.id}/>
                            </div>
                          </div>
                      
                      </td>
                    </tr>
                )
              })
          
            
          }
      </tbody>
        
        </table>
        {loders &&(

            <div className='mt-5 d-flex justify-content-center w-100'>

                <ClipLoader  size={50} color='#000'/>
            </div>
        )}
        <ToastContainer /> 
       {!categories.length &&  (
        !loders && <NoData />
       )}
        
      </div>
        
    </div>
  )
}

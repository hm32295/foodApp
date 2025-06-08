
import Header from '../../../Shared/componetns/Header/Header';
import imgHeader from '../../../../assets/image/header dashboard.png';
import "./categoriseList.css"
import NoData from '../../../Shared/componetns/NoData/NoData';
import DeleteConfirmation from '../../../Shared/componetns/DeleteConfirmation/DeleteConfirmation';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddCategorise from '../AddCategorise/AddCategorise';
import { useEffect, useState } from 'react';
import ViewCategorise from '../ViewCategorise/ViewCategorise';
import { ToastContainer } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { axiosInstance, CATEGORIIES_URLS } from '../../../../services/urls';
import PaginationPage from '../../../Shared/componetns/Pagination/PaginationPage';

let addCategorise= 'https://upskilling-egypt.com:3006/api/v1/Category/'
export default function CategoriseList() {
  const[getName ,setgetName] = useState("");
  const[categories ,setCategorise] = useState([]);
  const [pageNumber, setPageNumber] = useState([])
  const [loders ,setLoders] = useState(false);
  const getAllCategorise = async(pageSize , pageNumber,name)=>{
    try{
      let response = await setLoders(true)
      axiosInstance(CATEGORIIES_URLS.GET_CATEGORY, {params:{pageSize , pageNumber,name}} ).then((res)=>{
        setCategorise(res.data.data);
        setPageNumber(Array(res.data.totalNumberOfPages).fill().map((_,i) => i+1))
        setLoders(false)
        
      })
    }catch(error ){
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllCategorise(3 ,1, "")
  },[])
  useEffect(()=>{
    getAllCategorise(3 ,1, getName)
  },[getName])
  return (
    <div className='categoriseList'>
      <Header description={'You can now add your items that any user can order it from the Application and you can edit'}  
      title={'Welcome Categories item'} img={imgHeader}/>
      <div className="sub-categoriseList-title d-flex justify-content-between p-3 align-items-center">
        <div>
            <h4>Categories Table Details</h4>
            <p>You can check all details</p>
        </div>
        
        <AddCategorise getAllCategorise={getAllCategorise} link={addCategorise} nameSpan={"Add New "} />
      </div>

      <div className="sub-categoriseList-table mb-5 w-100">
        <input type="text" placeholder='Search By Name ,,,' className='form-control mb-3' onChange={(e)=>{setgetName(e.target.value)}}/>
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
                              <AddCategorise getAllCategorise={getAllCategorise} link={addCategorise} id={ele.id} nameEle={ele.name} nameSpan={"edit"} classNameToIcon={'subIcon'}/>
                            </div>
                            <div>
                              <DeleteConfirmation type="Categories" nameEle={ele.name} getAllCategorise={getAllCategorise} id={ele.id}/>
                            </div>
                          </div>
                      
                      </td>
                    </tr>
                )
              })
          
            
          }
      </tbody>
        
        </table>
        <PaginationPage pages={pageNumber} funData ={getAllCategorise}/>
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

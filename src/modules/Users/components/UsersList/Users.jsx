import img from "../../../../assets/image/header receList.png"
import Header from '../../../Shared/componetns/Header/Header'
import NoData from '../../../Shared/componetns/NoData/NoData';
import { faEllipsis, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';;
import { useContext, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { axiosInstance, beasImageURL, USERS_URLS } from '../../../../services/urls';
import DeleteConfirmation from "../../../Shared/componetns/DeleteConfirmation/DeleteConfirmation";
import PaginationPage from "../../../Shared/componetns/Pagination/PaginationPage";
import { Col, Form, Row } from "react-bootstrap";
import { AuthContext } from "../../../../context/AuthContext";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Users() {
  

  const [getUserName, setgetUserName] = useState("");
  const [getContry, setgetContry] = useState("");
  const [getGroubp, setgetGroubp] = useState("");
  const[users ,setUsers] = useState([]);
  const [pageNumber, setpageNumber] = useState([])
  const [res, setRes] = useState(1)
  const [loders ,setLoders] = useState(false)
  const {isAuthLoading,loginData} = useContext(AuthContext)
 
  const getAllUser = async (pageSize,pageNumber,groups,country,userName)=>{
    setLoders(true);
    
    
    let res = await axiosInstance(USERS_URLS.GET_ALL_USERS,
      {params : { pageSize,pageNumber,groups,country,userName}}
    ).then((res)=>{
      
      
      setUsers(res.data.data);
      setLoders(false);
      setRes(res.data)
      setpageNumber(Array(res.data.totalNumberOfPages).fill().map((_,i) => i+1))
    })
  }
  useEffect(()=>{
    if (isAuthLoading|| !loginData) return; 
    getAllUser(3,1);
  
  },[isAuthLoading, loginData]);
  useEffect(()=>{
    getAllUser(3,1 ,getGroubp,getContry,getUserName)
  },[getUserName,getContry, getGroubp])

  

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

      <Row className="mb-3 row w-100">
        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridCity">
          <Form.Control placeholder={'search by username'} onChange={(e)=>{setgetUserName(e.target.value)}}/>
        </Form.Group>
        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridCity">
          <Form.Control placeholder={'search by country'} onChange={(e)=>{setgetContry(e.target.value)}}/>
        </Form.Group>
        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridState">
          <Form.Select defaultValue="Choose..." onChange={(e)=>{setgetGroubp(e.target.value)}}>
                 <option value="1">SuperAdmin</option>
                 <option value="2">SystemUser</option>
          </Form.Select>
        </Form.Group>

      </Row> 


      <div className="sub-categoriseList-table mb-5 w-100 overflow-auto pb-5">
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
                            <Example user={ele}/>
                            
                            
                          </div>
                          
                          <div>
                              <DeleteConfirmation id={ele.id} type='users' 
                              nameEle={ele.userName} getAllCategorise={getAllUser}/>
                            
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
        
        {!loders && <PaginationPage funData={getAllUser} pages={pageNumber} res={res}/>}
        {loders &&(

            <div className='mt-5 d-flex justify-content-center w-100'>
                <ClipLoader  size={50} color='#000'/>
            </div>
        )}
       {!users.length &&  (
        !loders && <NoData />
       )}
        
      </div>
        
    </div>
  )
}





function Example({user}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FontAwesomeIcon className='subIcon' icon={faEye} />
        <span>View</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>user details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableDataUsers user={user}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function TableDataUsers({user}) {
  
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>userName</th>
          <th>phone Number</th>
          <th>group</th>
          <th>country</th>
        </tr>
      </thead>
      <tbody>
        {user&&(
            <tr >
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.group.name}</td>
                <td>{user.country}</td>
            </tr>
        )}
      </tbody>
    </Table>
  );
}

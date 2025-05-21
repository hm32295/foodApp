import { faEye, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ClipLoader } from 'react-spinners';


export default function ViewCategorise({id}) {
    const [eleOnce , setEleOnce] = useState({})
 
    let viewEle = ()=>{
        axios("https://upskilling-egypt.com:3006/api/v1/Category/" + id,{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        }).then((res)=>{
            setEleOnce(res.data)
          })
        handleShow()
    }
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={viewEle}>
            <FontAwesomeIcon className='subIcon' icon={faEye} />
            <span>View</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='closed justify-content-between'>
            <Modal.Title className='text-capitalize'> details</Modal.Title>
            <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className='text-center text-capitalize'>
            
            {!eleOnce.name?<ClipLoader color="#000" size={30}/> :(
              <>
                <h2 className='m-2'>name : {eleOnce.name}</h2>
                <h4 className='m-2'>creation Date : {eleOnce.creationDate}</h4>
              </>
            )
            }
        </Modal.Body>
        <Modal.Footer >
       
          <Button className='add-categoriseList-button bg-danger'  variant="primary" onClick={()=>{handleClose()}}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


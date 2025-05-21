

import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {  useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function AddCategorise({nameSpan ,classNameToIcon, link ,id ,setUpdateData ,updateData,nameEle}) {
  const[loders , setLoders] = useState(false)
  
  const valueInput= useRef()
  let setItemOrUpdate = (name)=>{
    if(name=== ""){return}
      setLoders(true)
    if(nameSpan === "edit"){
    
      axios.put(link+id ,
        {name : name},
        {headers:
         {
         Authorization:  localStorage.getItem('token')
       }
       }
        ).then((res)=>{
              handleClose();
              setLoders(false)
              toast.success("updated Success!");
         })

    }else{
      axios.post(link ,
        {name : name},
        {headers:
         {
         Authorization:  localStorage.getItem('token')
       }
       }
        ).then((res)=>{
              handleClose();
              setLoders(false)
          toast.success("created Success!");
         })
    }
    
    setUpdateData(!updateData)
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
            {(classNameToIcon) ?( 
                <>
                <FontAwesomeIcon className={classNameToIcon}  icon={faPenToSquare} />
                      <span>{nameSpan}</span>
                </>
                    ): (nameSpan +"Category")
                } 
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className='closed justify-content-between'>
            <Modal.Title className='text-capitalize'>{nameSpan} Category</Modal.Title>
            <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-center flex-wrap flex-column align-items-center'>
        {loders?(

          <ClipLoader color="#000" size={30}/>
          ):(
            <>
                {nameSpan ==="edit" &&(
                  <div className='d-flex mb-2 gap-2'>
                    <span>Previous name:</span>
                    <span>{nameEle}</span>
                  </div>
                )}
              
                <Form className='w-100'>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                      type="text"
                      placeholder="Name Categorise"
                      autoFocus
                      ref={valueInput}
                      // value={nameEle}
                    />
                  </Form.Group>
                  
                </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer >
       
          <Button className='add-categoriseList-button'  variant="primary" onClick={()=>{setItemOrUpdate(valueInput.current.value)}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}



import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { axiosInstance, CATEGORIIES_URLS } from '../../../../services/urls';

export default function AddCategorise({nameSpan ,classNameToIcon ,id ,getAllCategorise,nameEle}) {
  const[loders , setLoders] = useState(false)
  
  const valueInput= useRef()
  let setItemOrUpdate = (name)=>{
    if(name=== ""){return}
      setLoders(true)
    if(nameSpan === "edit"){
    
      axiosInstance.put(CATEGORIIES_URLS.UPDATE_CATEGORY(id) ,
        {name : name},
        ).then((res)=>{
              handleClose();
              setLoders(false)
              toast.success("updated Success!");
         })

    }else{
      axiosInstance.post(CATEGORIIES_URLS.CREATE_CATEGORY ,
        {name : name},
     
        ).then((res)=>{
              handleClose();
              setLoders(false)
          toast.success("created Success!");
         })
    }
    
    getAllCategorise(3 ,1 ,"")
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

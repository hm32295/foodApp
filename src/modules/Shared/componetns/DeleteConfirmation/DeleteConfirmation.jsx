import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import imgNoData from "../../../../assets/image/no-data.png"
import "./DeleteConfirmation.css"
import {  faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { toast } from 'react-toastify';
import { axiosInstance, CATEGORIIES_URLS, RECIPES_URLS, USERS_URLS } from '../../../../services/urls';
export default function DeleteConfirmation({id,type,getAllCategorise ,nameEle}) {
  
  let deleteElement =()=>{
    if(type === "recipes"){
      axiosInstance.delete(RECIPES_URLS.DELETE_RECIPES(id))
    }else if(type === "Categories"){

      axiosInstance.delete(CATEGORIIES_URLS.DELETE_CATEGORY(id))
    }
    // else if(type === "users"){
    //   axiosInstance.delete(USERS_URLS.DELETE_USER(id))

    // }
    toast.success("delete Success!");
    handleClose()
    getAllCategorise(3 ,1)
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    < >
        <Button variant="primary" onClick={handleShow}>
          <FontAwesomeIcon className='subIcon' icon={faTrashCan} />
          <span>delete</span>
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header className='closed'>
            <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
          </Modal.Header>
          <Modal.Body className='data-deleteCon gap-2 d-flex justify-content-center flex-column align-items-center'>
            <img src={imgNoData} alt="imgNoData" />
            <h3>Delete <span className='text-white bg-danger d-inline-block rounded-1 p-1'>{nameEle}</span> ?</h3>
            <p className='text-center'>are you sure you want to delete <span className='text-white bg-danger d-inline-block rounded-1 p-1'>{nameEle}</span> ? if you are sure just click on delete it</p>
          </Modal.Body>
          <Modal.Footer className='deleteConfirmation'>
         
            <Button variant="primary" onClick={deleteElement}>Delete this item</Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}

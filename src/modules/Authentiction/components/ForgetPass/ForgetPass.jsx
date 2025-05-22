import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../../assets/image/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { toast ,ToastContainer} from "react-toastify"
import { useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../services/urls";
export default function ForgetPass() {
  let {register, formState:{errors}, handleSubmit ,reset} = useForm();
  let naviget = useNavigate();
const [loder ,setLoder] = useState(false);
const onSubmit = (data)=>{
  // console.log(data);
  setLoder(true)
 
    let response = axiosInstance.post(USERS_URLS.FORGET_PASSWORD ,data).then(()=>{
     
      naviget("/reset-pass")
        setLoder(false);
      }).catch(()=>{
        toast.error("email is no correct");
        setLoder(false);
        reset()
      })
   

}
  return (
     <div className="auth-container" >
           <div className="container-fluid bg-overlay">
             <div className="row vh-100 justify-content-center align-items-center">
               <div className="col-md-5 bg-white rounded-2 py-5 px-3">
   
   
                 <div className="logo-container text-center">
                     <img src={logo} alt="logo-food" className="w-50" />
                 </div>
   
   
                   <div className="title my-3"> 
                     <h4 className="text-capitalize">Forgot Your Password?</h4> 
                     <span className="text-muted">No worries! Please enter your email and we will send a password reset link </span>
                   </div>
   
   
   
                   <form action="" onSubmit={handleSubmit(onSubmit)}>
   
                     <div className="input-group mb-3 p-1 form-control">
                       <span className="input-group-text border-0" id="basic-addon1">
                           <FontAwesomeIcon icon={faEnvelope} />
                       </span>
                       <input {...register("email",
                       {
                         pattern: {
                           value :/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim ,
                           message :"email is not valied"
                         },
                         required:"email is required"
                       }
                       )} type="text" className="form-control border-0 border bg-transparent" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" />
                     </div>
                     {errors.email&&<div className="text-danger mb-2">{errors.email.message}</div>}
   
   
   
   
                   
                     <button className="btn btn-success w-100"> <span>submit</span> {loder&& <ClipLoader color="#fff" size={15}/>}</button>
                   </form>
   
   
   
               </div>
             </div>
           </div>
           <ToastContainer /> 
       </div>
  )
}



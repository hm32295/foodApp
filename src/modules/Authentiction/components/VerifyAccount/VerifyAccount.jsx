import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { EMAIL_VALIDION } from "../../../../services/validation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance, REGESTORE_URLS } from "../../../../services/urls";
import { toast } from "react-toastify";
import logo from "../../../../assets/image/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function VerifyAccount() {
   
    const [loder ,setLoder] = useState(false);
    const {register ,handleSubmit , formState: { errors} , reset} = useForm();
    const navugation = useNavigate()
    const onSubmit =  (data)=>{
    
      setLoder(true)
    
      let response = axiosInstance.put(REGESTORE_URLS.VERIFY_REGESTORE,data).then(res=>{
        navugation("/login")
        toast.success(res.data.message);
        setLoder(false);
        reset()
      }).catch(res=>{
        toast.error(res.response.data.message);
        setLoder(false)
      })
          
    }
  
  return (
    <div className='VerifyAccount'>
      <div className="auth-container" >
          <div className="container-fluid bg-overlay">
            <div className="row vh-100 justify-content-center align-items-center">
              <div className="col-md-9 flex-wrap bg-white rounded-2 py-5 px-3  col-md-4">
      
      
                <div className="logo-container text-center">
                    <img src={logo} alt="logo-food" className="w-50" />
                </div>
      
      
                  <div className="title my-3"> 
                    <h4 className="text-capitalize"> Verify Account  </h4> 
                    <span className="text-muted">Please Enter Your Otp  or Check Your Inbox</span>
                  </div>
      
      
      
                  <form action="" onSubmit={handleSubmit(onSubmit)}>
      
      
      
                    <div className="d-flex flex-wrap justify-content-between gap-1 group-input mb-2">
                        
                        
                          <div className="w-100 d-flex" >
      
                            <span className="input-group-text border-0" id="basic-addon1">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            <input {...register("email",EMAIL_VALIDION)} 
                            type="text"className="input-group-text border-0 form-control border bg-transparent text-start" placeholder="email" 
                            aria-label="Username" aria-describedby="basic-addon1" />
                          
                          </div>
                            {errors?.email&&<div className="text-danger mb-2 w-100">{errors?.email.message}</div>}
                    
                    </div>
      
      
                    <div className="d-flex flex-wrap justify-content-between gap-1 group-input mb-2">
      
                        <div className="w-100 d-flex" >
                          <span className="input-group-text border-0" id="basic-addon1">
                              <FontAwesomeIcon icon={faLock} />
                          </span>
                          <input {...register("code", {required:"country is required"   })} 
                          type="text" className="input-group-text border-0 form-control border bg-transparent text-start" placeholder="otb" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                           {errors?.code&&<div className="text-danger mb-2 w-100">{errors?.code.message}</div>}
      
      
                    </div>
      
          
                    
                    <button className="btn btn-success w-100"> <span>send</span> {loder&& <ClipLoader color="#fff" size={15}/>}</button>
                  </form>
      
      
      
              </div>
            </div>
          </div>
          </div>
    </div>
  )
}

import { faEnvelope, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../../assets/image/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import {  useState } from "react";
import { toast ,ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../services/urls";
import { EMAIL_VALIDION } from "../../../../services/validation";

export default function ResetPass() {
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(true)
  const [showPassCon, setShowPassCon] = useState(true)
  let {register, formState:{errors}, handleSubmit, watch ,reset} = useForm();
  const [loder ,setLoder] = useState(false);
  const onSubmit =  (data)=>{
    console.log(data);
    if(data.confirmPassword !== data.password){
      toast.warning("the password don't id confirm password")
      return;
    } 
    setLoder(true)
  
        let response = axiosInstance.post(USERS_URLS.RESET_PASSWORD ,data).then(res=>{
         
          toast.success(res.data.message);
          navigate("/login")
          setLoder(false);
          reset()
        }).catch(res=>{
          console.log(res.message);
          
          toast.error(res.response.data.message);
          setLoder(false)
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
              <h4 className="text-capitalize"> Reset  Password</h4> 
              <span className="text-muted">Please Enter Your Otp  or Check Your Inbox</span>
            </div>



            <form action="" onSubmit={handleSubmit(onSubmit)}>




              <div className="input-group mb-3 p-1 form-control">
                <span className="input-group-text border-0" id="basic-addon1">
                    <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input {...register("email",EMAIL_VALIDION
                )} type="text" className="form-control border-0 border bg-transparent" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              {errors.email&&<div className="text-danger mb-2">{errors.email.message}</div>}


              <div className="input-group mb-3 p-1 form-control">
                <span className="input-group-text border-0" id="basic-addon1">
                    <FontAwesomeIcon icon={faLock} />
                </span>
                <input {...register("seed",
                {
                  required:"seed is required"
                }
                )} type="text" className="form-control border-0 border bg-transparent" placeholder="otb" aria-label="Username" aria-describedby="basic-addon1" />
              </div>
              {errors.seed&&<div className="text-danger mb-2">{errors.seed.message}</div>}



              <div className="input-group mb-3 p-1 form-control">
                  <span className="input-group-text border-0" id="basic-addon1">
                      <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input {...register("password",
                  {
                    required: "password is required"
                  }
                  
                  )} type={showPass ? "password" : "text"} className="form-control border-0 border bg-transparent" placeholder=" New Password" aria-label="Username" aria-describedby="basic-addon1" />
              
              <span className="showPass input-group-text border-0 pointer" id="basic-addon1">
                      {showPass?( <FontAwesomeIcon icon={faEye} 
                            onClick={()=> setShowPass(false)}
                      /> ) :<FontAwesomeIcon icon={faEyeSlash}
                            onClick={()=> setShowPass(true)}
                      
                      /> }
                    </span>
              
              </div>
              {errors.password&&<div className="text-danger  mb-2">{errors.password.message}</div>}


            
              <div className="input-group mb-3 p-1 form-control">
                  <span className="input-group-text border-0" id="basic-addon1">
                      <FontAwesomeIcon icon={faLock} />
                  </span>
                  <input {...register("confirmPassword",
                  {
                    required: "password is required",
                    validate: (value) => value === watch("password") || "Passwords do not match"
                    
                  }
                  )} type={showPassCon? "password" :"text"} className="form-control border-0 border bg-transparent" placeholder="Confirm New Password" aria-label="Username" aria-describedby="basic-addon1" />

                    <span className="showPass input-group-text border-0 pointer" id="basic-addon1">
                      {showPassCon?( <FontAwesomeIcon icon={faEye} 
                            onClick={()=> setShowPassCon(false)}
                      /> ) :<FontAwesomeIcon icon={faEyeSlash}
                            onClick={()=> setShowPassCon(true)}
                      
                      /> }
                    </span>

              </div>
              
              {errors.confirmPassword&&<div className="text-danger mb-2">{errors.confirmPassword.message}</div>}


            
              <button className="btn btn-success w-100"> <span>Reset password</span> {loder&& <ClipLoader color="#fff" size={15}/>}</button>
            </form>



        </div>
      </div>
    </div>
    <ToastContainer /> 
</div>
  )
}

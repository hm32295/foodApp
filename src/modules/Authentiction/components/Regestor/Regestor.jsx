import "./Regestor.css"
import { faEnvelope, faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../../assets/image/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import {  useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance, REGESTORE_URLS } from "../../../../services/urls";
import { EMAIL_VALIDION } from "../../../../services/validation";


export default function Regestor() {

  const navigation = useNavigate()
  
  const [showPass, setShowPass] = useState(true)
  const [showPassCon, setShowPassCon] = useState(true)
  const [loder ,setLoder] = useState(false);
  const {register ,handleSubmit , formState: { errors} , watch, reset} = useForm();



  let handelDataToForm = (data) =>{
  
    let recipesForm = new FormData();
    recipesForm.append('userName', data.userName)
    recipesForm.append('email', data.email)
    recipesForm.append('country', data.country)
    recipesForm.append('confirmPassword', data.confirmPassword)
    recipesForm.append('password', data.password)
    recipesForm.append('phoneNumber', data.phoneNumber)
    recipesForm.append('profileImage', data.profileImage[0])
   
    return recipesForm
  
  }
  const onSubmit =  (data)=>{
    let recipcesData =  handelDataToForm(data);
    setLoder(true)
  
    let response = axiosInstance.post(REGESTORE_URLS.SET_REGESTORE,recipcesData,{headers: { "Content-Type": "multipart/form-data" }})
    .then(res=>{
          toast.success(res.data.message);
          setLoder(false);
          navigation("/verify-account")
          reset()
        }).catch(res=>{
          console.log(res.response.data);
          
          toast.error(res.response.data.message);
          setLoder(false)
        })
        
  }

  return (
    <div className="auth-container" >
    <div className="container-fluid bg-overlay">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-9 flex-wrap bg-white rounded-2 py-5 px-3">


          <div className="logo-container text-center">
              <img src={logo} alt="logo-food" className="w-50" />
          </div>


            <div className="title my-3"> 
              <h4 className="text-capitalize">Register</h4> 
              <span className="text-muted">Welcome Back! Please enter your details</span>
            </div>



            <form action="" onSubmit={handleSubmit(onSubmit)}>



              <div className="d-flex flex-wrap justify-content-between gap-1 group-input">
                  <div className="input-group">
                      <div className="input-group mb-3 p-1 form-control w-100 ">

                          <span className="input-group-text border-0" id="basic-addon1">
                          <FontAwesomeIcon icon={faUser} />
                          </span>
                          <input {...register("userName", {required:"userName is required" })} 
                            type="text" className="form-control border-0 border bg-transparent" placeholder="userName" 
                            aria-label="Username" aria-describedby="basic-addon1" />
                            
                      </div>
                      {errors?.userName&&<div className="text-danger mb-2">{errors?.userName.message}</div>}
                  </div>
                  
                  <div className="input-group ">
                    <div className="input-group mb-3 p-1 form-control w-100  ">

                      <span className="input-group-text border-0" id="basic-addon1">
                          <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <input {...register("email",EMAIL_VALIDION)} 
                      type="text" className="form-control border-0 border bg-transparent" placeholder="email" 
                      aria-label="Username" aria-describedby="basic-addon1" />
                    
                    </div>
                    {errors?.email&&<div className="text-danger mb-2">{errors?.email.message}</div>}
                  </div>
              </div>


              <div className="d-flex flex-wrap justify-content-between gap-1 group-input">

                  <div className="input-group mb-3 p-1 form-control">
                    <span className="input-group-text border-0" id="basic-addon1">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input {...register("country", {required:"country is required"   })} 
                    type="text" className="form-control border-0 border bg-transparent" placeholder="country" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  {errors?.country&&<div className="text-danger mb-2">{errors?.country.message}</div>}

                  <div className="input-group mb-3 p-1 form-control">
                    <span className="input-group-text border-0" id="basic-addon1">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input {...register("phoneNumber",{required:"phoneNumber is required" })} 
                    type="text" className="form-control border-0 border bg-transparent" placeholder="phoneNumber" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  {errors?.phoneNumber&&<div className="text-danger mb-2">{errors?.phoneNumber.message}</div>}


              </div>

              <div className="d-flex flex-wrap justify-content-between gap-1 group-input">

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
                  {errors?.password&&<div className="text-danger  mb-2">{errors?.password.message}</div>}


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
                  {errors?.confirmPassword&&<div className="text-danger mb-2">{errors?.confirmPassword.message}</div>}
              </div>

              <div className="d-flex justify-content-center mt-2 w-100" >
                <input {...register("profileImage")}  type="file" />
              </div>


              


            
              <div className="links d-flex justify-content-end mb-3">
                    <Link to="/login" className="text-black text-capitalize text-decoration-none">login now?</Link>
              </div>
              <button className="btn btn-success w-100"> <span>Register</span> {loder&& <ClipLoader color="#fff" size={15}/>}</button>
            </form>



        </div>
      </div>
    </div>
    </div>
  )

}

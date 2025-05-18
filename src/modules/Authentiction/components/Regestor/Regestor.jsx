import "./Regestor.css"
import { faEnvelope, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../../assets/image/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useForm } from "react-hook-form";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import {  useState } from "react";
import { toast ,ToastContainer} from "react-toastify";
import { Link } from "react-router-dom";


export default function Regestor() {

  
  // const [showPass, setShowPass] = useState(true)
  // const [showPassCon, setShowPassCon] = useState(true)
  // let {register, formState:{errors}, handleSubmit, watch ,reset} = useForm();
  // const [loder ,setLoder] = useState(false);
  const onSubmit =  (data)=>{
    console.log(data);
  
    // setLoder(true)
  
    //     let response = axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset" ,data).then(res=>{
         
    //       toast.success(res.data.message);
    //       setLoder(false);
    //       reset()
    //     }).catch(res=>{
    //       console.log(res.message);
          
    //       toast.error(res.response.data.message);
    //       setLoder(false)
    //     })
        
  }


  return (
    <div className="auth-container" > regestor
    {/* <div className="container-fluid bg-overlay">
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



              <div className="d-flex flex-wrap justify-content-between group-input">
                  <div className=" col-md-6">
                      <div className="input-group mb-3 p-1 form-control w-100 ">

                          <span className="input-group-text border-0" id="basic-addon1">
                              <FontAwesomeIcon icon={faEnvelope} />
                          </span>
                          <input {...register("userName",
                          {
                          
                            required:"userName is required"
                          }
                          )} type="text" className="form-control border-0 border bg-transparent" placeholder="userName" aria-label="Username" aria-describedby="basic-addon1" />
                            
                      </div>
                      {errors.userName&&<div className="text-danger mb-2">{errors.userName.message}</div>}
                  </div>
                  
                  
                  
                  <div className="w-100 d-flex col-md-6">
                    <div className="input-group mb-3 p-1 form-control w-100  ">

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
                  </div>
              </div>

              <div className="d-flex flex-wrap justify-content-between group-input">

                  <div className="input-group mb-3 p-1 form-control col-md-6">
                    <span className="input-group-text border-0" id="basic-addon1">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input {...register("country",
                    {
                      required:"country is required"
                    }
                    )} type="text" className="form-control border-0 border bg-transparent" placeholder="otb" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  {errors.country&&<div className="text-danger mb-2">{errors.country.message}</div>}

                  <div className="input-group mb-3 p-1 form-control col-md-6">
                    <span className="input-group-text border-0" id="basic-addon1">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input {...register("phoneNumber",
                    {
                      required:"phoneNumber is required"
                    }
                    )} type="text" className="form-control border-0 border bg-transparent" placeholder="otb" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  {errors.phoneNumber&&<div className="text-danger mb-2">{errors.phoneNumber.message}</div>}


              </div>


              <div className="d-flex flex-wrap justify-content-between group-input">

                  <div className="input-group mb-3 p-1 form-control col-md-6">
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


                  <div className="input-group mb-3 p-1 form-control col-md-6">
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
              </div>


              


            
              <div className="links d-flex justify-content-end mb-3">
                    <Link to="/login" className="text-black text-capitalize text-decoration-none">login now?</Link>
              </div>
              <button className="btn btn-success w-100"> <span>Reset password</span> {loder&& <ClipLoader color="#fff" size={15}/>}</button>
            </form>



        </div>
      </div>
    </div>
    <ToastContainer />  */}
</div>
  )

}

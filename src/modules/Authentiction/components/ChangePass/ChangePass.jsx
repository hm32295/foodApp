
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../../assets/image/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useContext, useState } from "react";
import { toast} from "react-toastify";
import { axiosInstance, CHANGEPASSWORD_URLS } from "../../../../services/urls";
import { AuthContext } from "../../../../context/AuthContext";



export default function ChangePass() {
  const navigate = useNavigate()


  let{saveLoginData} = useContext(AuthContext)

  let {register, formState:{errors}, handleSubmit,reset} = useForm();
  const [loder ,setLoder] = useState(false);
  const [showPass , setShowPass] = useState(true);
  const [newPass , setnewPass] = useState(true);
  const [confirmPass , setconfirmPass] = useState(true);

  const onSubmit = (data)=>{
    
        
        setLoder(true)
        let response = axiosInstance.put(CHANGEPASSWORD_URLS.CHANGEPASSWORD ,data).then(res=>{
          
          setTimeout(() => {
            saveLoginData();
            toast.success(res.data.message);
            setLoder(false);
            navigate("/login")
            reset();
          }, 100);

        }).catch(res=>{
          console.log(res.data)
          toast.error("email or password no correct");
          setLoder(false)
        })
       
      
  
  }

  return (
    <div className=" ChangePass auth-container" >
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center p-2">
            <div className="col-md-5 bg-white rounded-2 py-5 px-3">


              <div className="logo-container text-center">
                  <img src={logo} alt="logo-food" className="w-50" />
              </div>


                <div className="title my-3"> 
                  <h4 className="text-capitalize">change password</h4> 
                  <span className="text-muted">Welcome Back! Please enter your details</span>
                </div>



                <form action="" onSubmit={handleSubmit(onSubmit)}>


                

             


                  <div className="input-group mb-3 p-1 form-control">
                      <span className="input-group-text border-0" id="basic-addon1">
                          <FontAwesomeIcon icon={faLock} />
                      </span>
                      <input {...register("oldPassword",
                      {
                        required: "old Password is required"
                      }
                      )} type={showPass ?"password": "text"} 
                      className="form-control border-0 border bg-transparent" placeholder="old Password" 
                      aria-label="Username" aria-describedby="basic-addon1" />

                        <span className="showPass input-group-text border-0 pointer" id="basic-addon1">
                          {showPass?( <FontAwesomeIcon icon={faEye} 
                                onClick={()=> setShowPass(false)}
                          /> ) :<FontAwesomeIcon icon={faEyeSlash}
                                onClick={()=> setShowPass(true)}
                          
                          /> }
                        </span>
                    
                  </div>
                  {errors.oldPassword&&<div className="text-danger mb-2">{errors.oldPassword.message}</div>}



                  <div className="input-group mb-3 p-1 form-control">
                      <span className="input-group-text border-0" id="basic-addon1">
                          <FontAwesomeIcon icon={faLock} />
                      </span>
                      <input {...register("newPassword",
                      {
                        required: "new Password is required"
                      }
                      )} type={newPass ?"password": "text"} 
                      className="form-control border-0 border bg-transparent" placeholder="new Password" 
                      aria-label="Username" aria-describedby="basic-addon1" />

                        <span className="showPass input-group-text border-0 pointer" id="basic-addon1">
                          {newPass?( <FontAwesomeIcon icon={faEye} 
                                onClick={()=> setnewPass(false)}
                          /> ) :<FontAwesomeIcon icon={faEyeSlash}
                                onClick={()=> setnewPass(true)}
                          
                          /> }
                        </span>
                    
                  </div>
                  {errors.newPassword&&<div className="text-danger mb-2">{errors.newPassword.message}</div>}



                  <div className="input-group mb-3 p-1 form-control">
                      <span className="input-group-text border-0" id="basic-addon1">
                          <FontAwesomeIcon icon={faLock} />
                      </span>
                      <input {...register("confirmNewPassword",
                      {
                        required: "confirm New Password is required"
                      }
                      )} type={confirmPass ?"password": "text"} 
                      className="form-control border-0 border bg-transparent" placeholder="confirm New Password" 
                      aria-label="Username" aria-describedby="basic-addon1" />

                        <span className="showPass input-group-text border-0 pointer" id="basic-addon1">
                          {confirmPass?( <FontAwesomeIcon icon={faEye} 
                                onClick={()=> setconfirmPass(false)}
                          /> ) :<FontAwesomeIcon icon={faEyeSlash}
                                onClick={()=> setconfirmPass(true)}
                          
                          /> }
                        </span>
                    
                  </div>
                  {errors.confirmPass&&<div className="text-danger mb-2">{errors.confirmPass.message}</div>}


                  <div className="links d-flex justify-content-between mb-3">
                    <Link to="/login" className="text-black text-capitalize text-decoration-none">login now?</Link>
                  </div>
                  <button className="btn btn-success w-100"> <span>send</span> {loder&& <ClipLoader color="#fff" size={15}/>}</button>
                </form>



            </div>
          </div>
        </div>
        
    </div>
  )
}

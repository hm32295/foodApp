
import "./login.css"
import { faEnvelope, faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../../assets/image/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { useContext, useState } from "react";
import { toast ,ToastContainer} from "react-toastify";
import { axiosInstance, USERS_URLS } from "../../../../services/urls";
import { EMAIL_VALIDION } from "../../../../services/validation";
import { AuthContext } from "../../../../context/AuthContext";
// import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const navigate = useNavigate()


  let{saveLoginData} = useContext(AuthContext)

  let {register, formState:{errors}, handleSubmit,reset} = useForm();
  const [loder ,setLoder] = useState(false);
  const [showPass , setShowPass] = useState(true);

  const onSubmit = (data)=>{
    
    
        setLoder(true)
        let response = axiosInstance.post(USERS_URLS.LOGIN ,data).then(res=>{
          localStorage.setItem('token' , (res.data.token));
          saveLoginData();
          toast.success("Success!");
          setLoder(false);
          navigate("/dashboard")
          reset();

        }).catch(res=>{
          console.log(res.data)
          toast.error("email or password no correct");
          setLoder(false)
        })
       
      
  
  }

  return (
    <div className="auth-container" >
        <div className="container-fluid bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center p-2">
            <div className="col-md-5 bg-white rounded-2 py-5 px-3">


              <div className="logo-container text-center">
                  <img src={logo} alt="logo-food" className="w-50" />
              </div>


                <div className="title my-3"> 
                  <h4 className="text-capitalize">log in</h4> 
                  <span className="text-muted">Welcome Back! Please enter your details</span>
                </div>



                <form action="" onSubmit={handleSubmit(onSubmit)}>




                  <div className="input-group mb-3 p-1 form-control">
                    <span className="input-group-text border-0" id="basic-addon1">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                    <input {...register("email", EMAIL_VALIDION )} 
                    type="text" className="form-control border-0 border bg-transparent" 
                    placeholder="email" aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                  {errors.email&&<div className="text-danger mb-2">{errors.email.message}</div>}



                  <div className="input-group mb-3 p-1 form-control">
                      <span className="input-group-text border-0" id="basic-addon1">
                          <FontAwesomeIcon icon={faLock} />
                      </span>
                      <input {...register("password",
                      {
                        required: "password is required"
                      }
                      )} type={showPass ?"password": "text"} 
                      className="form-control border-0 border bg-transparent" placeholder="password" 
                      aria-label="Username" aria-describedby="basic-addon1" />

                        <span className="showPass input-group-text border-0 pointer" id="basic-addon1">
                          {showPass?( <FontAwesomeIcon icon={faEye} 
                                onClick={()=> setShowPass(false)}
                          /> ) :<FontAwesomeIcon icon={faEyeSlash}
                                onClick={()=> setShowPass(true)}
                          
                          /> }
                        </span>
                    
                  </div>
                  {errors.password&&<div className="text-danger mb-2">{errors.password.message}</div>}


                  <div className="links d-flex justify-content-between mb-3">
                    <Link to="/register" className="text-black text-capitalize text-decoration-none">register now?</Link>
                    <Link to="/forget-pass" className="text-success text-capitalize text-decoration-none">forget password?</Link>
                  </div>
                  <button className="btn btn-success w-100"> <span>login</span> {loder&& <ClipLoader color="#fff" size={15}/>}</button>
                </form>



            </div>
          </div>
        </div>
        
    </div>
  )
}

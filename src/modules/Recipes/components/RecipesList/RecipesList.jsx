import img from "../../../../assets/image/header receList.png"
import Header from '../../../Shared/componetns/Header/Header'
import NoData from '../../../Shared/componetns/NoData/NoData';
import { faEllipsis, faEye, faHeart, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';;
import { useContext, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { axiosInstance, beasImageURL, CATEGORIIES_URLS, FAV_URLS, RECIPES_URLS, TAG_URLS } from '../../../../services/urls';
import "./recipesList.css"
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../../Shared/componetns/DeleteConfirmation/DeleteConfirmation";
import PaginationPage from "../../../Shared/componetns/Pagination/PaginationPage";

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { AuthContext } from "../../../../context/AuthContext";
import { toast } from "react-toastify";


export default function RecipesList() {
  let{loginData} = useContext(AuthContext)

  
  const navigate = useNavigate()
  const[recipesList ,setRecipesList] = useState([]);
  const [res, setRes] = useState(1)
  const [pageNumber, setPageNumber] = useState([])
  const [loders ,setLoders] = useState(false);
  const [getName, setgetName] = useState("");
  const [getCatName, setgetCatName] = useState("");
  const [getTagName, setgetTagName] = useState("");

  const[tag, setTag] = useState([]);
  const[category, setCategory] = useState([]);
  const [ , setLoder] = useState(false)


 
  const getAllRecipes = async(pageSize , pageNumber , name ,tagId,categoryId)=>{
    setLoders(true)
    try{
        let res = await axiosInstance(RECIPES_URLS.GET_RECIPES,{params:{pageSize , pageNumber,name,tagId,categoryId}})
        .then((res)=>{
          setRecipesList(res.data.data);
          setRes(res.data)
          setPageNumber(Array(res.data.totalNumberOfPages).fill().map((_,i) => i+1))
          setLoders(false)
        })
    }catch(error){
      console.log(error);
      
    }
  }


  useEffect(()=>{
    getAllRecipes(3,1 ,"");
    getTag(setTag,setLoder)
    getCategory(setCategory,setLoder);
   
  },[])

  useEffect(()=>{
    getAllRecipes(3,1 ,getName,getTagName,getCatName)
   
  },[getName,getTagName,getCatName])



  return (
    <div className='categoriseList RecipesList'>
      <Header description={'You can now add your items that any user can order it from the Application and you can edit'}  
      title={'Welcome Recipes Items'} img={img}/>
      <div className="sub-categoriseList-title d-flex justify-content-between p-3 align-items-center">
        <div>
            <h4>Recipe Table Details</h4>
            <p>You can check all details</p>
        </div>
        
        {loginData?.userGroup !== "SystemUser" &&(
            <button onClick={()=>{navigate("../Recipes-data")}}>add new item</button>
        )}
      </div>

      <Row className="mb-3 row w-100">
        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridCity">
          <Form.Control placeholder={'search by name'} onChange={(e)=>{setgetName(e.target.value)}}/>
        </Form.Group>

        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridState">
          <Form.Select defaultValue="Choose..." onChange={(e)=>{setgetCatName(e.target.value)}}>
                {category.length&&(
                    category.map(ele=>{
                      return(
                        <option key={ele.id} value={ele.id} >{ele.name}</option>
                      )
                    })
                  )}
          </Form.Select>
        </Form.Group>

        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridState">
          <Form.Select defaultValue="Choose..." onChange={(e)=>{setgetTagName(e.target.value)}}>
                  {tag.length&&(
                            tag.map(ele=>{
                              return(

                                <option key={ele.id} value={ele.id} >{ele.name}</option>
                              )
                            })
                  )}
          </Form.Select>
        </Form.Group>

      </Row>
      <div className="sub-categoriseList-table mb-5 w-100 overflow-auto pb-5">

      { 
        
          !loders&&(
            <>
      
          
              <table className='w-100 rounded-2'>
                <thead >
                    <tr>
                      <th> Item Name</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>tag</th>
                      <th>Category</th>
                      <th>actions</th>
                    </tr>
                </thead>
              
                <tbody>

                { !loders&&(

                  recipesList.map((ele)=>{
                    return(
        
                        <tr key={ele.id || 2}>
                          <td>{ele.name}</td>
                          <td>
                            <img src={`${beasImageURL}${ele.imagePath}`} alt="img recipes" />
                          </td>
                          <td>{ele.price}</td>
                          <td>{ele.description}</td>
                          <td>{ele.tag.name}</td>
                          <td>{ele.category[0]?.name}</td>
                          {loginData?.userGroup === "SystemUser" ?
                            <td>
                             <FontAwesomeIcon icon={faHeart} className="text-danger" onClick={()=>{addFavs(ele.id,setLoders)}}/>
                            </td>
                          :
                              <td> 
                                <FontAwesomeIcon className='listIcon' icon={faEllipsis} />
                
                                  <div className="list">
                                    <div >
                                      <button>
                                        <FontAwesomeIcon className='subIcon' icon={faEye} />
                                        <span>View</span>
                                      </button>
                                      
                                    </div>
                                    <div>
                                      <button onClick={ ()=>{
                                            navigate("../Recipes-data" , {state : ele})
                                        }}>
                                        <FontAwesomeIcon className='subIcon' icon={faPenToSquare} />
                                        <span>edit</span>
                                      </button>
                                    </div>
                                    <div>
                                        <DeleteConfirmation id={ele.id} type='recipes' 
                                        nameEle={ele.name} getAllCategorise={getAllRecipes}/>
                                      
                                    </div>
                                  </div>
                              
                              </td>
                          }
                        </tr>
                    )
                    })
                  ) 
                }
            </tbody>
              
              </table>
              <PaginationPage pages={pageNumber} funData ={getAllRecipes} res={res}/>
            </>
          
       )}
        {
            !recipesList.length &&  (
              !loders && <NoData />
             )
        }
      

        {loders &&(

          <div className='mt-5 d-flex justify-content-center w-100'>
              <ClipLoader  size={50} color='#000'/>
          </div>
        )}
        
      </div>
        
    </div>
  )
}


let getTag = async (setTag,setLoder)=>{
  setLoder(true)
  try{
    let res = await axiosInstance(TAG_URLS.GET_TAG);

    setTag(res.data)
  }catch(errors){
    console.log(errors)
  }
  setLoder(false)
}


let getCategory = async (setCategory,setLoder)=>{
  setLoder(true)
  try{
    let res = await axiosInstance(CATEGORIIES_URLS.GET_CATEGORY);
    setCategory(res.data.data)
  }catch(errors){
    console.log(errors)
  }
  setLoder(false)
}


let addFavs =async (id,setLoder)=>{
  let recipeId = {
    recipeId: id
  }
  setLoder(true)
  try{
    let res = await axiosInstance.post(FAV_URLS.POST_FAV,recipeId).then(res=>{
     
      setLoder(false)
      
      toast.success(res.statusText)
    })
  }
  catch(errors){
    setLoder(false)
      console.log(errors);
      
  }
}

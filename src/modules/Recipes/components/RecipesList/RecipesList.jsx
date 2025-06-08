import img from "../../../../assets/image/header receList.png"
import Header from '../../../Shared/componetns/Header/Header'
import NoData from '../../../Shared/componetns/NoData/NoData';
import { faEllipsis, faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';;
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { axiosInstance, beasImageURL, RECIPES_URLS } from '../../../../services/urls';
import "./recipesList.css"
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../../Shared/componetns/DeleteConfirmation/DeleteConfirmation";
import PaginationPage from "../../../Shared/componetns/Pagination/PaginationPage";

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


export default function RecipesList() {
  
  const navigate = useNavigate()
  const[recipesList ,setRecipesList] = useState([]);
  const [res, setRes] = useState(1)
  const [pageNumber, setPageNumber] = useState([])
  const [loders ,setLoders] = useState(false);
  const [getName, setgetName] = useState("second")
 
  const getAllRecipes = async(pageSize , pageNumber , name)=>{
    try{
        let res = await  setLoders(true)
        axiosInstance(RECIPES_URLS.GET_RECIPES,{params:{pageSize , pageNumber,name}}).then((res)=>{
          setRecipesList(res.data.data);
          setRes(res.data)
          setPageNumber(Array(res.data.totalNumberOfPages).fill().map((_,i) => i+1))
          setLoders(false)
          console.log(res.data)
        })
    }catch(error){
      console.log(error);
      
    }
  }
  useEffect(()=>{
    getAllRecipes(3,1 ,"")
   
  },[])
  useEffect(()=>{
    getAllRecipes(3,1 ,getName)
   
  },[getName])



  return (
    <div className='categoriseList RecipesList'>
      <Header description={'You can now add your items that any user can order it from the Application and you can edit'}  
      title={'Welcome Recipes Items'} img={img}/>
      <div className="sub-categoriseList-title d-flex justify-content-between p-3 align-items-center">
        <div>
            <h4>Recipe Table Details</h4>
            <p>You can check all details</p>
        </div>
        
        <button onClick={()=>{navigate("../Recipes-data")}}>add new item</button>
      </div>

    <Row className="mb-3 row w-100">
        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridCity">
          <Form.Control placeholder={'search by name'} onChange={(e)=>{setgetName(e.target.value)}}/>
        </Form.Group>

        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridState">
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridState">
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

      </Row>
      <div className="sub-categoriseList-table mb-5 w-100">

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



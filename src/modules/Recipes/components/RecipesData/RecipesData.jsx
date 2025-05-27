import { faRightLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation, useNavigate } from "react-router-dom"
import "./recipesData.css"
import { Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { axiosInstance, CATEGORIIES_URLS, RECIPES_URLS, TAG_URLS } from "../../../../services/urls"
import { toast } from "react-toastify"
import { ClipLoader } from "react-spinners"

export default function RecipesData() {
  const [loder , setLoder] = useState(false)
  const[tag, setTag] = useState([]);
  const[category, setCategory] = useState([]);
  const navigate = useNavigate();
  
  const {register , handleSubmit,formState:{errors} ,reset} = useForm()


  const location = useLocation();
  const recipeItem = location.state
  useEffect(() => {
    if (recipeItem) {
      reset({
        name: recipeItem.name,
        price: recipeItem.price,
        description: recipeItem.description,
        tagId: recipeItem.tag?.id,    
        categoriesIds: recipeItem.category?.[0]?.id,
      });
    }
    
    
  }, [recipeItem,tag, category, reset]);

  let saveData = async (data)=>{
    let recipcesData =  handelDataToForm(data);
    setLoder(true)
    try{
      let res;
      if(recipeItem){
        res = await axiosInstance.put(RECIPES_URLS.UPDATE_RECIPES(recipeItem.id),recipcesData);
        toast.success('updated successfly');
      }else{

        res = await axiosInstance.post(RECIPES_URLS.CREATE_RECIPES,recipcesData);
        toast.success(res.data.message);
      }
        navigate("../Recipes-list")
     
      reset()
      
    }
    catch(error){console.log(error)}
    setLoder(false)
}
  


 
  useEffect(()=>{
    getTag(setTag,setLoder)
    getCategory(setCategory,setLoder);
  },[])
  
  return (
    <div className="RecipesData m-3">
        <div className="top d-flex p-4 align-items-center justify-content-between">
          <div className="left">
            <h3>Fill the <span className="text-success">Recipes</span> !</h3>
            <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
          </div>
          <button onClick={()=>{navigate("../Recipes-list")}} className="bg-success border-0 rounded-2 text-white p-2 px-3 text-capitalize d-flex gap-2 align-items-center justify-content-between">
            all recipes
            <FontAwesomeIcon className="m-2" icon={faRightLong}/>
          </button>
        </div>


        <div className="bottom mt-3 d-flex justify-content-center align-items-center ">

        {loder&& <ClipLoader color="#000" size={40}/>}
        {!loder&&(

            <form action="" onSubmit={handleSubmit(saveData)} className="col-md-8 col-11 col-lg-6">

              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control type="text" placeholder="rescipe name" 
                {...register("name",{required: "faid is required"} )}
                />
                {errors.name&&<div className="text-danger mb-2">{errors.name.message}</div>}
              </Form.Group>


              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Select aria-label="Default select example" {...register("tagId",{required: "faid is required"} )}>
                  {tag.length&&(
                    tag.map(ele=>{
                      return(

                        <option key={ele.id} value={ele.id}>{ele.name}</option>
                      )
                    })
                  )}
                </Form.Select>
                {errors.tagId&&<div className="text-danger mb-2">{errors.tagId.message}</div>}
              </Form.Group>


              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Control type="text" placeholder="price" {...register("price",{required: "faid is required"} )}/>
                {errors.price&&<div className="text-danger mb-2">{errors.price.message}</div>}
              </Form.Group>



              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Select aria-label="Default select example" {...register("categoriesIds",{required: "faid is required"} )}>
                  
                  {category.length&&(
                    category.map(ele=>{
                      return(
                        <option key={ele.id} value={ele.id}>{ele.name}</option>
                      )
                    })
                  )}
                </Form.Select>
                {errors.categoriesIds&&<div className="text-danger mb-2">{errors.categoriesIds.message}</div>}
              </Form.Group>



              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                <Form.Control as="textarea" rows={3} {...register("description",{required: "faid is required"} )}/>
                {errors.description&&<div className="text-danger mb-2">{errors.description.message}</div>}
              </Form.Group>


              <Form.Group className="mb-3" controlId="formGroupEmail" >
                <Form.Control type="file" placeholder="img" {...register("recipeImage" )} />
              </Form.Group>
              <div className="respices-data-button my-3 d-flex justify-content-end gap-3">
              
                <button className="btn btn-success">save</button>
              </div>
            </form>
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

let handelDataToForm = (data) =>{
  let recipesForm = new FormData();
  recipesForm.append('name', data.name)
  recipesForm.append('categoriesIds', data.categoriesIds)
  recipesForm.append('description', data.description)
  recipesForm.append('price', data.price)
  recipesForm.append('tagId', data.tagId)
  recipesForm.append('recipeImage', data.recipeImage[0])
 
  return recipesForm




}


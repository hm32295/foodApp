
import imgHeader from '../../../../assets/image/header receList.png';
import Header from '../../../Shared/componetns/Header/Header'
import { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { axiosInstance, beasImageURL, FAV_URLS } from '../../../../services/urls';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../../context/AuthContext';
import NoData from '../../../Shared/componetns/NoData/NoData';
import DeleteConfirmation from '../../../Shared/componetns/DeleteConfirmation/DeleteConfirmation';

export default function FavList() {
    const {loginData,isAuthLoading} = useContext(AuthContext)
    
    
    const [loders ,setLoders] = useState(false);
    const [allFav ,setAllFav] = useState([])

    // const deleteFav = async(id)=>{
      
    //   setLoders(true)
    //   try{
    //     const res = await axiosInstance.delete(FAV_URLS.DELETE_FAV(id))
    //     .then(res=>{
    //       getAllFav()
    //       toast.success('removed from fav')
          
    //     })
    //   }catch(errors){
    //     console.log(errors);
        
    //   }
    //   setLoders(false)
      
    // }
    
     const getAllFav = async()=>{
      setLoders(true)
        try{
          let response = await axiosInstance(FAV_URLS.GET_FAV).then((res)=>{
            
            setAllFav(res.data.data);
            setLoders(false)
            
            
            
          })
        }catch(error ){
          console.log(error)
        }
      }
      useEffect(()=>{
        if (isAuthLoading) return; 
        if (!loginData) return;
        getAllFav()
      },[loginData,isAuthLoading])
  return (
    <div className='FavList'>
      <Header description={"You can now add your items that any user can order it from the Application and you can edit"} img={imgHeader} 
            title={"Favorite Itmes!"} />
    
        {!loders&&(

          <div className='d-flex justify-content-center gap-2 flex-wrap p-3'>

        
                  {allFav.length?(
                    allFav.map(ele=>{
                      return(
                        <Card style={{ width: '18rem' }} key={ele.id} className='w-25 position-relative'>
                            <Card.Img variant="top" src={`${beasImageURL}${ele.recipe.imagePath}`} />

                              <DeleteConfirmation 
                                getAllCategorise={getAllFav} id={ele.id} nameEle={ele.recipe.name} type={"fave"} icon={faHeart}/>
                            <Card.Body> 
                              <Card.Title>{ele.recipe.name}</Card.Title>
                              <Card.Text>{ele.recipe.description}</Card.Text>
                            </Card.Body>
                          </Card>
                      )
                    })
                  ):(
                    <NoData />
                  )}
                  
          </div>
        )}
        {loders &&(
        
                  <div className='mt-5 d-flex justify-content-center w-100'>
                      <ClipLoader  size={50} color='#000'/>
                  </div>
                )}
    
    </div>
  )
}


import { Col, Form, Row } from 'react-bootstrap';
import imgHeader from '../../../../assets/image/header receList.png';
import Header from '../../../Shared/componetns/Header/Header'
import { useEffect, useState } from 'react';
import PaginationPage from '../../../Shared/componetns/Pagination/PaginationPage';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { axiosInstance, FAV_URLS } from '../../../../services/urls';

export default function FavList() {
    const [getName, setgetName] = useState("");
    const [getCatName, setgetCatName] = useState("");
    const [getTagName, setgetTagName] = useState("");
    
    const [loders ,setLoders] = useState(false);
    const [allFav ,setAllFav] = useState([])
    const [res ,setRes] = useState(1);
    const [pageNumber, setPageNumber] = useState([])
// const getAllCategorise = async(pageSize , pageNumber,name)=>{
//     try{
//       let response = await setLoders(true)
//       axiosInstance(CATEGORIIES_URLS.GET_CATEGORY, {params:{pageSize , pageNumber,name}} ).then((res)=>{
//         setCategorise(res.data.data);
//         setRes(res.data)
//         setPageNumber(Array(res.data.totalNumberOfPages).fill().map((_,i) => i+1))
//         setLoders(false)
        
//       })
//     }catch(error ){
//       console.log(error)
//     }
//   }
    
     const getAllFav = async(pageNumber,pageSize)=>{
      setLoders(true)
        try{
          let response = await axiosInstance(FAV_URLS.GET_FAV,{params:{pageNumber,pageSize}}).then((res)=>{
            
            setAllFav(res.data.data);
            setRes(res.data)
            setPageNumber(Array(res.data.totalNumberOfPages).fill().map((_,i) => i+1))
            setLoders(false)
            
            
            
          })
        }catch(error ){
          console.log(error)
        }
      }
      useEffect(()=>{
        getAllFav()
      },[])
  return (
    <div className='FavList'>
      <Header description={"You can now add your items that any user can order it from the Application and you can edit"} img={imgHeader} title={"Favorite Itmes!"} />
      <Row className="mb-3 row w-100">
        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridCity">
          <Form.Control placeholder={'search by name'} onChange={(e)=>{setgetName(e.target.value)}}/>
        </Form.Group>

        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridState">
          <Form.Select defaultValue="Choose..." onChange={(e)=>{setgetCatName(e.target.value)}}>
                <option value=""></option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='col-md-4 col-sm-8 mx-auto my-2' as={Col} controlId="formGridState">
          <Form.Select defaultValue="Choose..." onChange={(e)=>{setgetTagName(e.target.value)}}>
                 <option value=""></option>
          </Form.Select>
        </Form.Group>

      </Row>
        {allFav.length&&(
          allFav.map(ele=>{
            return(
              <Card style={{ width: '18rem' }} key={ele.id}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
            )
          })
        )}
       


      <PaginationPage funData={getAllFav} pages={pageNumber} res={res}/>
    
    </div>
  )
}

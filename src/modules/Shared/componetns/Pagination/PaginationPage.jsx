import Pagination from 'react-bootstrap/Pagination';

export default function PaginationPage({pages,funData}) {
  return (

        <Pagination className='m-3 d-flex justify-content-center'>
          {pages.map(page=>{
            return(
              <Pagination.Item onClick={()=>{funData(3,page)}} key={page} >{page} </Pagination.Item>

            )
          })}
        </Pagination>
      );
  
    
   
}

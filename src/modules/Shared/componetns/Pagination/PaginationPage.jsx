import Pagination from 'react-bootstrap/Pagination';

export default function PaginationPage({pages,funData, res}) {
 if(pages.length > 1){

   return (
 
         <Pagination className='m-3 d-flex justify-content-center'>
           {pages.map((page)=>{
             return(
               <Pagination.Item onClick={()=>{funData(3,page, "")}} key={page} active={res.pageNumber ===page} >{ page} </Pagination.Item>
 
             )
           })}
         </Pagination>
       );
 }
  
    
   
}

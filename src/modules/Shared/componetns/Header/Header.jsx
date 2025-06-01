import "./Header.css"

export default function Header({title , description , img}) {
  return (
    <div className='container-fluid header d-flex justify-content-center p-2'>
      <div className="row align-items-center justify-content-around px-3 w-100" >
        <div className="col-md-8">
          <h3>  <span>{title}</span></h3>
          <p>{description}</p>
        </div>
        <div className="img-header col-md-4 d-flex justify-content-end">
            <img src={img} alt="img Header" className="w-auto"/>
        </div>
      </div>
    </div>
  )
}

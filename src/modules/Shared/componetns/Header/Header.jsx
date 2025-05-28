import "./Header.css"

export default function Header({title , description , img}) {
  return (
    <div className='container-fluid header d-flex justify-content-center p-2'>
      <div className="row align-items-center justify-content-around px-3" >
        <div className="col-md-8">
          <h3> Welcome <span>{title}</span></h3>
          <p>{description}</p>
        </div>
        <div className="img-header col-md-4 d-flex justify-content-center">
            <img src={img} alt="img Header" className="w-auto"/>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

export default function Header({title , description , img}) {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-8">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="col-md-4">
            <img src={img} alt="img Header" />
        </div>
      </div>
    </div>
  )
}

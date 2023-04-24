import React from 'react'

const Card = ({property}) => {
    const {name, comment, index} = property
    
  return (
    <div className="bg-[#F3F3F3]    px-3 py-6" id={`card-${index}`}>
    <div className="details">
      <p className="text-sm">{comment}</p>
      <hr />
      <p className="text-semibold">{name}</p>
    </div>
  </div>  )
}

export default Card
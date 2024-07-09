import React from 'react'
import  arrow_icon from '../Assets/breadcrum_arrow.png';
function Breadcrum(props){
 
    const{product}=props;
  return (
    <div className='flex'>
        Home<img src={arrow_icon}/> 
        Shop<img src={arrow_icon}/>
        {product.category}<img src={arrow_icon}/>
        {product.name}
      
    </div>
  )
}

export default Breadcrum

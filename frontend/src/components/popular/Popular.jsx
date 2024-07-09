import React from 'react'
import data_product from "../Assets/data";
import Item from '../item/Item';
function Popular() {
  return (
    <div className='popular flex flex-col items-center gap-3 h-[90vh]'>
    <h1 className='text-red-700 text-5xl'>POPULAR IN WOMEN</h1>
    <hr  className=' w-52 h-1 rounded-sm bg-black'/>
    <div className="popular-item mt-14 flex ">
      {data_product.map((item,i)=>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
      })}
    </div>
  </div>
  )
}

export default Popular

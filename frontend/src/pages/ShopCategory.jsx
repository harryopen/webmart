import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Item from '../components/item/Item';

function ShopCategory(props) {
  const {allProduct} = useContext(ShopContext);
 
  return (
    <div className='mb-[150px]'>
        <img src={props.banner}/>
        <div className='popular flex flex-col items-center gap-3 h-auto '>
     
    <div className="popular-item  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 ">
      {allProduct.map((item,i)=>{
          return item.category===props.category?<Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>:<></>
      })}
    </div>
  </div>
      
    </div>
  )
}

export default ShopCategory

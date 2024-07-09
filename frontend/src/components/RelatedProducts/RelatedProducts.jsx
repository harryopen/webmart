import React from 'react'
import data_product from '../Assets/data';
import Item from '../item/Item';

export default function RelatedProducts() {
  return (
    <div className='relatedproducts flex flex-col  item-center  gap-2  h-auto'>
      <h1 className='text-5xl text-red-500'>Related Products </h1>
      <hr className='w-52 h-2  rounded-sm'/>
      <div className='mt-[50px] flex gap-[30px]'>
        {data_product.map((item,i)=>{
          return <Item  key={i}
          id={item.id}
          name={item.name}
          image={item.image}
          new_price={item.new_price}
          old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

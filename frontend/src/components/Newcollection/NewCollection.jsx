import React from 'react';
import products from '../Assets/new_collections';
import Item from '../item/Item'; 
function NewCollection() {
  return (
    <div className='popular flex flex-col items-center gap-3 mb-[100px]'>
      <h1 className='text-red-700 text-5xl'>New Collections </h1>
      <hr className='w-52 h-1 rounded-sm bg-black' />
      <div className="collections grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
       
        {products.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default NewCollection;

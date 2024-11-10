import React, { useEffect, useState } from 'react';
import Item from '../item/Item';

export default function RelatedProducts({ category }) {
  const [data, setData] = useState([]);
  const API = `${import.meta.env.VITE_API_URL}allproducts`;
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="relatedproducts flex flex-col  item-center  gap-2  h-auto">
      <h1 className="text-5xl text-red-500">Related Products </h1>
      <hr className="w-52 h-2  rounded-sm" />
      <div className="mt-[50px]a flex gap-[30px]">
        {data
          .filter((item) => item.category === category)
          .map((item, i) => (
            <Item
              key={i}
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

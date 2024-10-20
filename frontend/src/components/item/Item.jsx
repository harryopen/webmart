import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const apiUrl = import.meta.VITE_API_URL;
  return (
    <div className="item flex flex-col items-center justify-center text-center">
      <Link to={`/product/${props.id}`}>
        {' '}
        <img
          onClick={window.scrollTo(0, 0)}
          src={`${apiUrl}` + props.image}
          alt={props.name}
          className="w-full h-auto object-contain mb-4 max-h-48 lg:max-h-full"
        />
      </Link>
      <p className="text-lg font-bold mb-2">{props.name}</p>
      <div className="flex justify-center items-center mb-2">
        <div className="text-gray-700 text-2xl font-semibold">
          ${props.new_price}
        </div>
        <div className="text-gray-600 text-2xl font-medium line-through ml-2">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;

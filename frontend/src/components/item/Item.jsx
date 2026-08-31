import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const apiUrl = "https://webmart.onrender.com";
  const imageUrl = props.image?.startsWith('http')
    ? props.image
    : `${apiUrl}${props.image}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
      <Link to={`/product/${props.id}`} onClick={scrollToTop} className="block overflow-hidden rounded-xl bg-slate-50 relative aspect-square mb-4">
        <img
          src={imageUrl}
          alt={props.name || 'Product'}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300" />
      </Link>

      <div className="flex flex-col flex-1 justify-between">
        <Link to={`/product/${props.id}`} onClick={scrollToTop}>
          <h3 className="text-slate-800 font-semibold text-base line-clamp-2 hover:text-red-500 transition-colors mb-2">
            {props.name}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mt-auto pt-2 border-t border-slate-50">
          <span className="text-red-500 font-extrabold text-lg">
            ${props.new_price ? Number(props.new_price).toFixed(2) : '0.00'}
          </span>
          {props.old_price && (
            <span className="text-slate-400 font-medium text-sm line-through">
              ${Number(props.old_price).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;

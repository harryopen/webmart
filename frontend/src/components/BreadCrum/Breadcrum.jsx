import React from 'react';
import arrow_icon from '../Assets/breadcrum_arrow.png';
import { Link } from 'react-router-dom';

function Breadcrum(props) {
  const { product } = props;

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 capitalize">
      <Link to="/" className="hover:text-slate-900 transition-colors">HOME</Link>
      <img src={arrow_icon} alt=">" className="w-2.5 h-2.5 opacity-60" />
      <Link to="/" className="hover:text-slate-900 transition-colors">SHOP</Link>
      {product?.category && (
        <>
          <img src={arrow_icon} alt=">" className="w-2.5 h-2.5 opacity-60" />
          <Link to={`/${product.category}`} className="hover:text-slate-900 transition-colors font-bold text-slate-700">
            {product.category}
          </Link>
        </>
      )}
      {product?.name && (
        <>
          <img src={arrow_icon} alt=">" className="w-2.5 h-2.5 opacity-60" />
          <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
        </>
      )}
    </nav>
  );
}

export default Breadcrum;

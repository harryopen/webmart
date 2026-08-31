import React, { useEffect, useState } from 'react';
import Item from '../item/Item';
import './Popular.css';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://webmart.onrender.com/popularinwomen')
      .then((res) => res.json())
      .then((data) => {
        setPopularProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching popular products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="popular-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-xs font-extrabold uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1 rounded-full mb-3">
          Trending Now
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Popular In Women
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-full mt-3"></div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-slate-100 animate-pulse rounded-2xl h-80"></div>
          ))}
        </div>
      ) : popularProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {popularProducts.map((item, i) => (
            <Item
              key={item.id || i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 text-sm">No popular products found.</p>
      )}
    </section>
  );
};

export default Popular;

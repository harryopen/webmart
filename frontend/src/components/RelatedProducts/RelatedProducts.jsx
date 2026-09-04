import React, { useEffect, useState } from 'react';
import Item from '../item/Item';

export default function RelatedProducts({ category, currentId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_URL || 'https://webmart.onrender.com/';
    const endpoint = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}allproducts`;

    setLoading(true);
    fetch(endpoint)
      .then((response) => response.json())
      .then((result) => {
        setData(Array.isArray(result) ? result : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching related products:', error);
        setLoading(false);
      });
  }, [category]);

  const relatedProducts = data
    .filter((item) => item.category === category && item.id !== Number(currentId))
    .slice(0, 4);

  return (
    <section className="related-products-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 pb-12">
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-xs font-extrabold uppercase tracking-widest text-red-500 bg-red-50 px-3 py-1 rounded-full mb-3">
          You Might Also Like
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Related Products
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-full mt-3"></div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-slate-100 animate-pulse rounded-2xl h-80"></div>
          ))}
        </div>
      ) : relatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {relatedProducts.map((item, i) => (
            <Item
              key={item.id || i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
              stock={item.stock}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 text-sm">No related products found in this category.</p>
      )}
    </section>
  );
}

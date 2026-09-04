import React, { useEffect, useState } from 'react';
import Item from '../item/Item';

function NewCollection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = `${import.meta.env.VITE_API_URL}allproducts`;

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((result) => {
        setData(Array.isArray(result) ? result : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching new collections:', error);
        setLoading(false);
      });
  }, [API]);

  return (
    <section id="latest" className="new-collection-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col items-center text-center mb-12">
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3">
          Fresh Arrivals
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          New Collections
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-red-500 rounded-full mt-3"></div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-slate-100 animate-pulse rounded-2xl h-80"></div>
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {data.map((item, i) => (
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
        <p className="text-center text-slate-500 text-sm">No new collection items available right now.</p>
      )}
    </section>
  );
}

export default NewCollection;

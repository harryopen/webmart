import { useState, useEffect } from 'react';
import Item from '../item/Item';
import './Popular.css';

function Popular() {
  const [popularWomen, setpopularWomen] = useState([]);
  const endpoint = `${import.meta.env.VITE_API_URL}women`;

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setpopularWomen(data));
  }, []);

  // Debugging
  console.log('The value in popular women: ', popularWomen);

  return (
    <div className="popular flex flex-col items-center gap-3 h-[90vh]">
      <h1 className="text-red-700 text-5xl">POPULAR IN WOMEN</h1>
      <hr className="w-52 h-1 rounded-sm bg-black" />

      {/* Render popular items */}
      <div className="popular-item mt-14 flex">
        {popularWomen.length > 0 ? (
          popularWomen.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Popular;

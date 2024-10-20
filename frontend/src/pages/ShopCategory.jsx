import { useContext, useEffect, useState } from 'react';

import Item from '../components/item/Item';

function ShopCategory(props) {
  // Handle case when no category is provided
  const [allProduct, setallProduct] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
   const apiUrl = `${import.meta.VITE_API_URL}${props}`;
  console.log(apiUrl);
  const category = props.category || '';

  const fetchData = async () => {
    try {
      const apiUrl = `${import.meta.VITE_API_URL}${props}`;
      console.log("the url is ",apiUrl);
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok ');
      }
      const result = await  response.json();
      setallProduct(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Filter products based on category
  console.log(allProduct);
  const filteredProducts = allProduct.filter(
    (item) => item.category === category,
  );

  return (
    <div className="mb-[150px]">
      {props.banner && <img src={props.banner} alt="Category Banner" />}
      <div className="popular flex flex-col items-center gap-3 h-auto">
        <div className="popular-item grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, i) => (
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
            <p>No products available in this category.</p> // Handle case when no products are found
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopCategory;

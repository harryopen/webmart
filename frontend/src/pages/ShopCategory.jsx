import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/item/Item';

function ShopCategory(props) {
  const { allProduct } = useContext(ShopContext);

  // Handle case when no category is provided
  const category = props.category || '';
  console.log('Selected Category:', category);
  console.log('All Products:', allProduct);

  // Filter products based on category
  const filteredProducts = allProduct.filter(item => item.category === category);

  return (
    <div className='mb-[150px]'>
      {props.banner && <img src={props.banner} alt="Category Banner" />}
      <div className='popular flex flex-col items-center gap-3 h-auto'>
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

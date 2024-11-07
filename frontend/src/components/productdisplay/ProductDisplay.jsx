import './ProductDisplay.css';
import { ShopContext } from '../../context/ShopContext';

function ProductDisplay(props) {
  const { Product } = props;
  // const { addtocart, cartItems } = useContext(ShopContext);

  return (
    <div className="flex ">
      <p> {Product.name}</p>
      <img src={Product.image} />
      <p>${Product.new_price}</p>
      <button
        onClick={() => {
          addtocart(Product.id);
        }}
      >
        {' '}
        Add to cart
      </button>
    </div>
  );
}

export default ProductDisplay;

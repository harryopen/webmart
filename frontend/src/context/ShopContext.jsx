import { createContext, useEffect, useState } from 'react';
// import allProduct from '../components/Assets/all_product';
// import all_product from "../components/Assets/all_product";
export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  function addtocart(itemid) {
    setCartItem((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetch('http://localhost:8001/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json', // Corrected the Accept header
          'auth-token': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemID: itemid }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) =>
          console.error(
            'There was a problem with your fetch operation:',
            error,
          ),
        );
    }
  }

  function removetocart(itemid) {
    setCartItem((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
    const token = localStorage.getItem('auth-token');
    if (token) {
      fetch('http://localhost:8001/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json', // Corrected the Accept header
          'auth-token': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemID: itemid }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) =>
          console.error(
            'There was a problem with your fetch operation:',
            error,
          ),
        );
    }
  }

  const [allProduct, setallProduct] = useState([]);
  const [cartItems, setCartItem] = useState(getDefaultCart());
  const [count, setCount] = useState(0);
  const endpointAllProduct = `${import.meta.env.VITE_API_URL}allproduct`;
  useEffect(() => {
    fetch('http://localhost:8001/allproducts')
      .then((response) => response.json())
      .then((data) => setallProduct(data));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:8001/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: '',
      })
        .then((response) => response.json())
        .then((data) => setCartItem(data));
    }
  }, []);

  const getTotalcart = () => {
    let total = 0;
    for (let index = 0; index < allProduct.length + 1; index++) {
      if (cartItems[index] > 0) {
        let iteminfo = allProduct.find(
          (product) => product.id == Number(index),
        );
        total += cartItems[index] * iteminfo.new_price;
      }
    }
    return total;
  };
  const contextValue = {
    getTotalcart,
    count,
    allProduct,
    cartItems,
    addtocart,
    removetocart,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;

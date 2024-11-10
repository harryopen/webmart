import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/BreadCrum/Breadcrum';
import Item from '../components/item/Item';
import ProductDisplay from '../components/productdisplay/ProductDisplay';
import Description from '../components/Description/Description';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

function Product() {
  const [allProduct, setallProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  const fetchData = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}allproducts`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok ');
      }
      const result = await response.json();
      setallProduct(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [productId]);
  console.log("The product sent by all product route",allProduct);
  const product =
    allProduct && allProduct.length > 0
      ? allProduct.find((e) => e.id === Number(productId))
      : [];

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay Product={product} />
      <Description />
     <RelatedProducts category={product.category} />
    </div>
  );
}

export default Product;

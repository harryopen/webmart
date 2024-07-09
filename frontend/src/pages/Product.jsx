import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/BreadCrum/Breadcrum';
import Item from '../components/item/Item';
import ProductDisplay from '../components/productdisplay/ProductDisplay';
import Description from '../components/Description/Description';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';

function Product() {
  const {allProduct} = useContext(ShopContext);
  const {productId}   = useParams();
  const product       =   allProduct.find((e)=> e.id === Number(productId))
  
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay Product={product}/>
      <Description/>
      <RelatedProducts/>
                  
    </div>
  )
}

export default Product

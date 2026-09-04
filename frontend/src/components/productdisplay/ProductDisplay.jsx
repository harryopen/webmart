import React, { useContext, useEffect, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';

function ProductDisplay(props) {
  const { addToCart } = useContext(ShopContext);
  const { Product } = props;

  const [selectedSize, setSelectedSize] = useState('M');
  const [added, setAdded] = useState(false);
  const [stock, setStock] = useState(1);
  const [buying, setBuying] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState(null);

  useEffect(() => {
    if (Product?.stock !== undefined) {
      setStock(Product.stock);
    }
  }, [Product]);

  if (!Product) return null;

  const apiUrl = import.meta.env.VITE_API_URL || 'https://webmart.onrender.com/';
  const imageUrl = Product.image?.startsWith('http')
    ? Product.image
    : `${apiUrl}${Product.image?.startsWith('/') ? Product.image.slice(1) : Product.image}`;

  const handleAddToCart = () => {
    addToCart(Product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = async () => {
    setBuying(true);
    setPurchaseMessage(null);
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8001/';
      const buyEndpoint = `${apiBase.endsWith('/') ? apiBase : apiBase + '/'}buy-safe`;

      const response = await fetch(buyEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: Product.id }),
      });

      const data = await response.json();
      if (data.success) {
        setStock(data.remainingStock);
        setPurchaseMessage({
          type: 'success',
          text: `🎉 ${data.message} Remaining stock: ${data.remainingStock}`,
        });
      } else {
        setStock(0);
        setPurchaseMessage({
          type: 'error',
          text: `⚠️ ${data.message || 'Out of stock!'}`,
        });
      }
    } catch (err) {
      console.error('Buy error:', err);
      setPurchaseMessage({
        type: 'error',
        text: '⚠️ An error occurred during purchase.',
      });
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left: Gallery & Main Image */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 justify-center">
            {[1, 2, 3, 4].map((thumb, idx) => (
              <div
                key={idx}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-200 cursor-pointer hover:border-red-500 transition-all p-1"
              >
                <img
                  src={imageUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/80?text=Image';
                  }}
                />
              </div>
            ))}
          </div>

          {/* Main Display Image */}
          <div className="flex-1 bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden p-6 flex items-center justify-center shadow-sm max-h-[500px]">
            <img
              className="w-full h-full object-contain max-h-[440px] drop-shadow-md hover:scale-105 transition-transform duration-300"
              src={imageUrl}
              alt={Product.name || 'Product Image'}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/450?text=No+Image';
              }}
            />
          </div>
        </div>

        {/* Right: Details & Actions */}
        <div className="flex flex-col items-start">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {Product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              <img src={star_icon} alt="star" className="w-4 h-4" />
              <img src={star_icon} alt="star" className="w-4 h-4" />
              <img src={star_icon} alt="star" className="w-4 h-4" />
              <img src={star_icon} alt="star" className="w-4 h-4" />
              <img src={star_dull_icon} alt="star" className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              (122 Reviews)
            </span>
          </div>

          {/* Prices & Stock Badge */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-3xl font-black text-red-500">
              ${Product.new_price ? Number(Product.new_price).toFixed(2) : '0.00'}
            </span>
            {Product.old_price && (
              <span className="text-xl font-medium text-slate-400 line-through">
                ${Number(Product.old_price).toFixed(2)}
              </span>
            )}
            
            {/* Live Stock Indicator */}
            {stock > 0 ? (
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                In Stock: <span className="font-black text-emerald-900">{stock}</span> left
              </span>
            ) : (
              <span className="bg-rose-50 text-rose-600 text-xs font-extrabold px-3.5 py-1.5 rounded-full border border-rose-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                Out of Stock
              </span>
            )}
          </div>

          {/* Purchase Result Message Banner */}
          {purchaseMessage && (
            <div
              className={`w-full p-4 rounded-2xl mb-6 text-sm font-bold border transition-all ${
                purchaseMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-sm'
                  : 'bg-rose-50 text-rose-800 border-rose-200 shadow-sm'
              }`}
            >
              {purchaseMessage.text}
            </div>
          )}

          {/* Description */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 border-b border-slate-100 pb-6 w-full">
            {Product.description ||
              'A lightweight, knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.'}
          </p>

          {/* Size Selector */}
          <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">Select Size</span>
              <span className="text-xs font-semibold text-red-500 cursor-pointer hover:underline">Size Guide</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-xl font-bold text-sm transition-all border ${
                    selectedSize === size
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons (Add To Cart + Buy Now) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full mb-8">
            <button
              onClick={handleAddToCart}
              disabled={stock <= 0}
              className={`flex-1 py-4 rounded-full font-bold text-base tracking-wide transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2 ${
                stock <= 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border border-slate-200'
                  : added
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
              }`}
            >
              {added ? '✓ ADDED TO CART!' : 'ADD TO CART'}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={buying || stock <= 0}
              className={`flex-1 py-4 rounded-full font-bold text-base tracking-wide transition-all shadow-lg active:scale-98 flex items-center justify-center gap-2 ${
                stock <= 0
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                  : buying
                  ? 'bg-red-400 text-white cursor-wait'
                  : 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25'
              }`}
            >
              {buying ? 'BUYING...' : stock <= 0 ? 'OUT OF STOCK' : '⚡ BUY NOW'}
            </button>
          </div>

          {/* Category & Tags */}
          <div className="space-y-2 text-xs font-medium text-slate-500 pt-4 border-t border-slate-100 w-full">
            <p>
              <span className="font-bold text-slate-800">Category:</span> {Product.category || 'Apparel'}, Casual, Top
            </p>
            <p>
              <span className="font-bold text-slate-800">Tags:</span> Modern, Latest Collection, Trending
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDisplay;

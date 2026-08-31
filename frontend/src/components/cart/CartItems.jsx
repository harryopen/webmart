import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import './Cartitems.css';

function CartItems() {
  const {
    getTotalCartItems,
    cartItems,
    products,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(ShopContext);

  const totalCartCount = getTotalCartItems();
  const totalCartAmount = getTotalCartAmount();

  const hasItems = totalCartCount > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Shopping Cart</h1>
          <p className="text-sm text-slate-500 mt-1">Review items in your cart before checking out</p>
        </div>
        <span className="bg-red-50 text-red-600 font-bold text-xs px-3 py-1.5 rounded-full border border-red-100">
          {totalCartCount} {totalCartCount === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {!hasItems ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200/80 flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-3xl mb-4">
            🛒
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-sm">
            Looks like you haven't added any products to your shopping cart yet.
          </p>
          <Link
            to="/"
            className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-md active:scale-95"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Cart Table Container */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              <span className="col-span-6 sm:col-span-5">Product</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-2 text-center">Qty</span>
              <span className="col-span-2 text-right sm:text-center">Total</span>
            </div>

            <div className="divide-y divide-slate-100">
              {products.map((e) => {
                if (cartItems[e.id] > 0) {
                  const imageUrl = e.image?.startsWith('http')
                    ? e.image
                    : `https://webmart.onrender.com${e.image}`;

                  const itemTotal = Number(e.new_price) * cartItems[e.id];

                  return (
                    <div key={e.id} className="grid grid-cols-12 gap-4 p-4 sm:p-6 items-center hover:bg-slate-50/50 transition-colors">
                      {/* Product Image & Name */}
                      <div className="col-span-6 sm:col-span-5 flex items-center gap-3 sm:gap-4">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                          <img
                            src={imageUrl}
                            alt={e.name}
                            className="w-full h-full object-cover"
                            onError={(err) => {
                              err.target.onerror = null;
                              err.target.src = 'https://via.placeholder.com/80?text=Image';
                            }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <Link to={`/product/${e.id}`} className="font-bold text-slate-800 text-sm hover:text-red-500 transition-colors line-clamp-2">
                            {e.name}
                          </Link>
                          <span className="text-xs text-slate-400 mt-1 capitalize">Category: {e.category || 'Apparel'}</span>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="col-span-2 text-center font-bold text-sm text-slate-700">
                        ${Number(e.new_price).toFixed(2)}
                      </div>

                      {/* Quantity Control */}
                      <div className="col-span-2 flex items-center justify-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-center border border-slate-200">
                          {cartItems[e.id]}
                        </span>
                      </div>

                      {/* Total Price & Remove Button */}
                      <div className="col-span-2 flex items-center justify-end sm:justify-between gap-2">
                        <span className="font-extrabold text-sm text-red-500">
                          ${itemTotal.toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(e.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <img src={remove_icon} alt="Remove" className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Cart Summary & Promo Box */}
          <div className="flex flex-col gap-6">
            
            {/* Totals Box */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">${totalCartAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span className="font-medium text-slate-400">Calculated at checkout</span>
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-extrabold text-slate-900">
                  <span>Total</span>
                  <span className="text-xl text-red-500">${totalCartAmount.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => alert('Proceeding to checkout payment portal...')}
                className="w-full py-4 rounded-full bg-slate-900 hover:bg-red-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>

            {/* Promo Code Box */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Have a promo code?</h3>
              <p className="text-xs text-slate-500 mb-4">Enter your coupon code below to redeem discounts.</p>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-red-500 uppercase font-semibold text-slate-800"
                />
                <button
                  onClick={() => alert('Promo code applied!')}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default CartItems;

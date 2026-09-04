import React, { useContext, useEffect, useState } from 'react';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

function Navbar() {
  const location = useLocation();
  const { getTotalCartItems } = useContext(ShopContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/login' && location.pathname !== '/login-success') {
      sessionStorage.setItem('lastVisitedPath', location.pathname + location.search);
    }
  }, [location]);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'shop';
    if (path === '/mens') return 'men';
    if (path === '/women') return 'women';
    if (path === '/kids') return 'kids';
    return '';
  };

  const activeTab = getActiveTab();
  const cartCount = getTotalCartItems();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.replace('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Shopper Logo"
            className="h-10 w-auto transform group-hover:scale-105 transition-transform duration-200"
          />
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            SHOPPER
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
          <Link
            to="/"
            className={`relative py-2 transition-colors hover:text-slate-900 ${
              activeTab === 'shop' ? 'text-red-500 font-semibold' : ''
            }`}
          >
            Shop
            {activeTab === 'shop' && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-red-500 rounded-full animate-fade-in" />
            )}
          </Link>

          <Link
            to="/mens"
            className={`relative py-2 transition-colors hover:text-slate-900 ${
              activeTab === 'men' ? 'text-red-500 font-semibold' : ''
            }`}
          >
            Men
            {activeTab === 'men' && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-red-500 rounded-full animate-fade-in" />
            )}
          </Link>

          <Link
            to="/women"
            className={`relative py-2 transition-colors hover:text-slate-900 ${
              activeTab === 'women' ? 'text-red-500 font-semibold' : ''
            }`}
          >
            Women
            {activeTab === 'women' && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-red-500 rounded-full animate-fade-in" />
            )}
          </Link>

          <Link
            to="/kids"
            className={`relative py-2 transition-colors hover:text-slate-900 ${
              activeTab === 'kids' ? 'text-red-500 font-semibold' : ''
            }`}
          >
            Kids
            {activeTab === 'kids' && (
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-red-500 rounded-full animate-fade-in" />
            )}
          </Link>
        </nav>

        {/* Actions (Login/Logout + Cart) */}
        <div className="flex items-center gap-5">
          {localStorage.getItem('auth-token') ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full border border-slate-300 text-slate-700 hover:border-red-500 hover:text-red-500 hover:bg-red-50 text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" state={{ from: location }}>
              <button className="px-6 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95">
                Login
              </button>
            </Link>
          )}

          {/* Cart Icon & Badge */}
          <Link to="/cart" className="relative p-2 text-slate-700 hover:text-slate-900 transition-colors">
            <img src={cart_icon} alt="Cart" className="w-7 h-7" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse-subtle border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

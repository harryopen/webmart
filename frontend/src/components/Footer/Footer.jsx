import React from 'react';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Brand Header */}
        <div className="flex items-center gap-4 mb-8 group cursor-pointer">
          <img src={footer_logo} alt="Shopper Logo" className="w-12 h-12 object-contain group-hover:scale-105 transition-transform" />
          <span className="text-3xl font-black tracking-tight text-white">SHOPPER</span>
        </div>

        {/* Quick Links */}
        <ul className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-sm font-medium text-slate-300 mb-10">
          <li className="hover:text-red-400 transition-colors cursor-pointer"><Link to="/">Shop</Link></li>
          <li className="hover:text-red-400 transition-colors cursor-pointer"><Link to="/mens">Men's Collection</Link></li>
          <li className="hover:text-red-400 transition-colors cursor-pointer"><Link to="/women">Women's Collection</Link></li>
          <li className="hover:text-red-400 transition-colors cursor-pointer"><Link to="/kids">Kids Collection</Link></li>
          <li className="hover:text-red-400 transition-colors cursor-pointer">About Us</li>
          <li className="hover:text-red-400 transition-colors cursor-pointer">Contact</li>
        </ul>

        {/* Social Links */}
        <div className="flex items-center gap-4 mb-12">
          <a href="#" className="w-11 h-11 rounded-full bg-slate-800 hover:bg-red-500 border border-slate-700 flex items-center justify-center transition-all hover:scale-110 shadow-sm">
            <img src={instagram_icon} alt="Instagram" className="w-5 h-5 filter brightness-0 invert" />
          </a>
          <a href="#" className="w-11 h-11 rounded-full bg-slate-800 hover:bg-red-500 border border-slate-700 flex items-center justify-center transition-all hover:scale-110 shadow-sm">
            <img src={pintester_icon} alt="Pinterest" className="w-5 h-5 filter brightness-0 invert" />
          </a>
          <a href="#" className="w-11 h-11 rounded-full bg-slate-800 hover:bg-red-500 border border-slate-700 flex items-center justify-center transition-all hover:scale-110 shadow-sm">
            <img src={whatsapp_icon} alt="WhatsApp" className="w-5 h-5 filter brightness-0 invert" />
          </a>
        </div>

        {/* Copyright Divider */}
        <div className="w-full border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} SHOPPER Inc. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-200 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import React from 'react';
import exclusive_image from '../Assets/exclusive_image.png';
import './Offer.css';

function Offer() {
  return (
    <section className="offers-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="offers-card rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
        <div className="offers-left z-10 flex flex-col items-start max-w-lg mb-8 md:mb-0">
          <span className="text-xs font-extrabold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 mb-4">
            LIMITED TIME PROMO
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-3">
            Exclusive <span className="text-red-500">Offers</span> For You
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-medium mb-8">
            Get up to 50% OFF on selected best-selling fashion collections.
          </p>
          <button className="px-8 py-4 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0">
            CHECK NOW
          </button>
        </div>

        <div className="offers-right z-10 relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl -z-10" />
          <img
            src={exclusive_image}
            alt="Exclusive Offer Fashion"
            className="w-full max-w-[320px] sm:max-w-[400px] h-auto object-contain drop-shadow-2xl animate-float"
          />
        </div>
      </div>
    </section>
  );
}

export default Offer;

import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="newsletter-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="newsletter-card rounded-3xl bg-gradient-to-br from-indigo-50 via-pink-50 to-amber-50 border border-slate-200/60 p-8 sm:p-14 text-center relative overflow-hidden shadow-sm">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-xs font-extrabold tracking-widest text-red-500 uppercase bg-white/80 backdrop-blur px-4 py-1.5 rounded-full border border-red-100 shadow-sm mb-4">
            JOIN OUR VIP CLUB
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Get Exclusive Offers On Your Email
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-lg">
            Subscribe to our newsletter to receive secret flash discounts, weekly style updates, and early access to new collections.
          </p>

          {subscribed ? (
            <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold border border-emerald-200 animate-fade-in">
              🎉 Thank you for subscribing! Check your inbox soon for your promo code.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-3.5 rounded-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all shadow-sm"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-red-500 text-white font-bold text-sm transition-all shadow-md active:scale-95 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          {/* Value Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-200/60 w-full text-left sm:text-center text-xs font-semibold text-slate-600">
            <div className="flex items-center sm:justify-center gap-2">
              <span className="text-base">🚀</span> Fast & Free Shipping
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <span className="text-base">🛡️</span> 100% Genuine Products
            </div>
            <div className="flex items-center sm:justify-center gap-2">
              <span className="text-base">💬</span> 24/7 Dedicated Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;

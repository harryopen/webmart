import React, { useState } from 'react';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';

function Description({ product }) {
  const [activeTab, setActiveTab] = useState('description');

  const sampleReviews = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2 days ago',
      verified: true,
      title: 'Absolutely love the quality!',
      comment:
        'The fabric feels incredibly soft and high quality. The fit is true to size and looks even better in person than in the photos. Would definitely recommend!',
    },
    {
      id: 2,
      author: 'David K.',
      rating: 5,
      date: '1 week ago',
      verified: true,
      title: 'Great purchase & fast shipping',
      comment:
        'Product arrived quickly in great packaging. Material is breathable and super comfortable for everyday wear.',
    },
    {
      id: 3,
      author: 'Emily R.',
      rating: 4,
      date: '2 weeks ago',
      verified: true,
      title: 'Very comfortable and stylish',
      comment:
        'Super stylish piece! Color matches the picture accurately. Sizing is slightly relaxed which makes it really comfortable.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Tab Navigation Bar */}
        <div className="flex border-b border-slate-100 bg-slate-50/60 p-2 sm:p-3 gap-2">
          <button
            onClick={() => setActiveTab('description')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 ${
              activeTab === 'description'
                ? 'bg-white text-slate-900 shadow-md border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            <span>Description</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all duration-200 ${
              activeTab === 'reviews'
                ? 'bg-white text-slate-900 shadow-md border border-slate-200/60'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            <span>Reviews</span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-extrabold ${
                activeTab === 'reviews'
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              122
            </span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-10">
          {activeTab === 'description' ? (
            <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                {product?.description ||
                  'An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.'}
              </p>
              <p>
                Designed with precision and crafted from premium grade materials, this item combines high durability with effortless everyday style. Each piece features reinforced stitching, breathable fabric technology, and ergonomic tailored cuts for optimal mobility and comfort.
              </p>

              {/* Highlight Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 font-bold flex items-center justify-center text-lg">
                    ✨
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Premium Quality</h4>
                    <p className="text-xs text-slate-500">100% inspected materials</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-lg">
                    🚚
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Fast Dispatch</h4>
                    <p className="text-xs text-slate-500">Ships within 24 hours</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center text-lg">
                    🔄
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Easy Returns</h4>
                    <p className="text-xs text-slate-500">30-day hassle-free return</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Rating Overview */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50 p-6 rounded-2xl border border-slate-100 gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900">4.8</span>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4].map((n) => (
                        <img key={n} src={star_icon} alt="star" className="w-4 h-4" />
                      ))}
                      <img src={star_dull_icon} alt="star" className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-semibold text-slate-500">Based on 122 customer reviews</p>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm">
                  Write a Review
                </button>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4">
                {sampleReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                          {review.author.slice(0, 2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">{review.author}</h4>
                            {review.verified && (
                              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-100">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <img key={i} src={star_icon} alt="star" className="w-3.5 h-3.5" />
                        ))}
                      </div>
                    </div>
                    <h5 className="font-bold text-slate-800 text-sm mb-1">{review.title}</h5>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Description;

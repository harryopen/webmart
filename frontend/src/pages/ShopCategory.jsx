import { useEffect, useState } from 'react';
import Item from '../components/item/Item';

function ShopCategory(props) {
  const [allProduct, setallProduct] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { category } = props;

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}${category}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setallProduct(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const filteredProducts =
    allProduct && allProduct.length > 0
      ? allProduct.filter((item) => item.category?.toLowerCase() === category?.toLowerCase())
      : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Banner Container */}
      {props.banner && (
        <div className="relative rounded-3xl overflow-hidden shadow-lg mb-10 border border-slate-100">
          <img
            src={props.banner}
            alt={`${category} Banner`}
            className="w-full h-auto object-cover max-h-[300px] sm:max-h-[360px]"
          />
        </div>
      )}

      {/* Filter / Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-extrabold capitalize text-slate-900">
            {category}'s Collection
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing <span className="font-semibold text-slate-800">{filteredProducts.length}</span> products
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sort by:</span>
          <select className="px-4 py-2 rounded-full border border-slate-300 text-sm font-semibold text-slate-700 bg-white shadow-sm outline-none focus:border-red-500">
            <option value="relevant">Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-slate-100 animate-pulse rounded-2xl h-80"></div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((item, i) => (
            <Item
              key={item.id || i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
          <p className="text-lg font-bold text-slate-800 mb-2">No products available</p>
          <p className="text-sm text-slate-500">Check back soon for new additions to our {category} catalog.</p>
        </div>
      )}
    </div>
  );
}

export default ShopCategory;

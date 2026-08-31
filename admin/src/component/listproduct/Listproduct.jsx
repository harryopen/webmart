import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Listproduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    setLoading(true);
    const endpointAllProduct = `${import.meta.env.VITE_API_URL}allproducts`;
    fetch(endpointAllProduct)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this product?')) return;
    const endpointRemoveProduct = `${import.meta.env.VITE_API_URL}removeproduct`;
    try {
      await fetch(endpointRemoveProduct, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      fetchProducts();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const getCategoryClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'men':
        return 'cat-badge cat-men';
      case 'women':
        return 'cat-badge cat-women';
      case 'kids':
        return 'cat-badge cat-kids';
      default:
        return 'cat-badge cat-default';
    }
  };

  return (
    <div className="listproduct-container">
      <div className="listproduct-header">
        <div>
          <h2>All Products List</h2>
          <p>Manage and track all inventory items in your store</p>
        </div>
        <div className="product-count-badge">
          <span>{allproducts.length} Products</span>
        </div>
      </div>

      <div className="listproduct-card">
        <div className="listproduct-table-header">
          <p className="col-img">Product</p>
          <p className="col-title">Title</p>
          <p className="col-oldprice">Original</p>
          <p className="col-newprice">Offer Price</p>
          <p className="col-category">Category</p>
          <p className="col-action">Action</p>
        </div>

        <div className="listproduct-body">
          {loading ? (
            <div className="listproduct-loading">
              <div className="spinner"></div>
              <p>Loading products catalog...</p>
            </div>
          ) : allproducts.length === 0 ? (
            <div className="listproduct-empty">
              <p className="empty-title">No products found</p>
              <p className="empty-sub">Get started by adding your first product to the catalog.</p>
              <Link to="/addproduct" className="add-first-btn">
                Add New Product
              </Link>
            </div>
          ) : (
            allproducts.map((product, index) => {
              const imageUrl = product.image?.startsWith('http')
                ? product.image
                : `https://webmart.onrender.com${product.image}`;

              return (
                <div key={product.id || index} className="listproduct-row">
                  <div className="col-img img-wrapper">
                    <img
                      className="listproduct-product-icon"
                      src={imageUrl}
                      alt={product.name || 'Product Image'}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/60?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="col-title">
                    <p className="product-name">{product.name}</p>
                  </div>
                  <div className="col-oldprice">
                    <span className="price-old">
                      ${product.old_price ? Number(product.old_price).toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="col-newprice">
                    <span className="price-new">
                      ${product.new_price ? Number(product.new_price).toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <div className="col-category">
                    <span className={getCategoryClass(product.category)}>
                      {product.category || 'General'}
                    </span>
                  </div>
                  <div className="col-action">
                    <button
                      className="remove-btn"
                      onClick={() => removeProduct(product.id)}
                      title="Remove Product"
                    >
                      <img
                        className="listproduct-remove-icon"
                        src={cross_icon}
                        alt="Remove"
                      />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;

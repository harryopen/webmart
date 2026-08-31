import { useState } from 'react';
import upload_area from '../../assets/upload_area.svg';
import './Addproduct.css';

const Addproduct = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({
    name: '',
    image: '',
    old_price: '',
    new_price: '',
    category: '',
  });

  const image_handler = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const form_handler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Add_Product = async () => {
    if (!formdata.name || !formdata.old_price || !formdata.new_price || !formdata.category || !image) {
      alert('Please fill out all fields and select an image.');
      return;
    }
    setLoading(true);
    try {
      let responseData;
      let product = { ...formdata };
      let formData = new FormData();
      const endpoint = `${import.meta.env.VITE_API_URL}upload`;
      formData.append('product', image);

      const uploadResp = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      responseData = await uploadResp.json();

      if (responseData.success) {
        product.image = responseData.image_url;
        const addResp = await fetch(`${import.meta.env.VITE_API_URL}addproduct`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
        const addData = await addResp.json();
        if (addData.success) {
          alert('Product Added Successfully!');
          setFormData({ name: '', image: '', old_price: '', new_price: '', category: '' });
          setImage(null);
        } else {
          alert('Failed to add product');
        }
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addproduct-container">
      <div className="addproduct-header">
        <h2>Add New Product</h2>
        <p>Create a new product listing for your e-commerce store catalog.</p>
      </div>

      <div className="addproduct-card">
        <div className="addproduct-itemfield">
          <label className="field-label">Product Title</label>
          <input
            value={formdata.name}
            onChange={form_handler}
            type="text"
            name="name"
            placeholder="e.g. Premium Cotton Oversized T-Shirt"
            className="styled-input"
          />
        </div>

        <div className="addproduct-price-row">
          <div className="addproduct-itemfield">
            <label className="field-label">Original Price ($)</label>
            <input
              value={formdata.old_price}
              onChange={form_handler}
              type="number"
              name="old_price"
              placeholder="e.g. 99.99"
              className="styled-input"
            />
          </div>
          <div className="addproduct-itemfield">
            <label className="field-label">Offer / Sale Price ($)</label>
            <input
              value={formdata.new_price}
              onChange={form_handler}
              type="number"
              name="new_price"
              placeholder="e.g. 69.99"
              className="styled-input"
            />
          </div>
        </div>

        <div className="addproduct-itemfield">
          <label className="field-label">Product Category</label>
          <select
            value={formdata.category}
            onChange={form_handler}
            name="category"
            className="styled-select"
          >
            <option value="">Select a category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="addproduct-itemfield">
          <label className="field-label">Product Image</label>
          <div className="upload-dropzone">
            <label htmlFor="file-input" className="dropzone-label">
              <div className="preview-container">
                <img
                  src={image ? URL.createObjectURL(image) : upload_area}
                  className={`addproduct-thumbnail-img ${image ? 'has-image' : ''}`}
                  alt="Upload Thumbnail"
                />
              </div>
              <div className="dropzone-text">
                <span className="primary-text">{image ? 'Change product image' : 'Click to upload image'}</span>
                <span className="secondary-text">PNG, JPG or WEBP (Max 5MB)</span>
              </div>
            </label>
            <input
              onChange={image_handler}
              type="file"
              name="image"
              id="file-input"
              accept="image/*"
              hidden
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            onClick={Add_Product}
            className="addproduct-btn"
            disabled={loading}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;

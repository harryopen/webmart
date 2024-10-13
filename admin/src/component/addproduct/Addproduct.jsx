import { useState } from 'react';
import upload_area from '../../assets/upload_area.svg';
import './Addproduct.css';

const Addproduct = () => {
  const [image, setImage] = useState();
  const [formdata, setFormData] = useState({
    name: '',
    image: '',
    old_price: '',
    new_price: '',
    category: '',
  });

  const image_handler = (e) => {
    setImage(e.target.files[0]);
  };

  const form_handler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Function to handle Form data
  const Add_Product = async () => {
    let responseData;
    let product = formdata;
    let formData = new FormData();
    const endpoint = `${import.meta.env.VITE_API_URL}upload`;
    console.log('The URL is ', endpoint);
    formData.append('product', image);
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.image_url;
      await fetch('http://localhost:8001/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert('Product  Added') : alert('failed');
        })
        .catch((error) => console.error('The error message is ', error));
    }
  };
  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>product title</p>
        <input
          value={formdata.name}
          onChange={form_handler}
          type="text"
          name="name"
          placeholder="type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={formdata.old_price}
            onChange={form_handler}
            type="text"
            name="old_price"
            placeholder="type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={formdata.new_price}
            onChange={form_handler}
            type="text"
            name="new_price"
            placeholder="type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>product Category</p>
        <select
          value={formdata.category}
          onChange={form_handler}
          name="category"
          className="add-product-selector"
        >
          <option value="">Select a category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            onChange={form_handler}
            value={formdata.image}
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={image_handler}
          value={formdata.image}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button onClick={Add_Product} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default Addproduct;

import { NavLink } from 'react-router-dom';
import product_Cart from '../../assets/Product_Cart.svg';
import Product_list_icon from '../../assets/Product_list_icon.svg';
import './sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section-title">MANAGEMENT</div>
      <nav className="sidebar-nav">
        <NavLink
          to="/addproduct"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <div className="sidebar-icon-wrapper">
            <img src={product_Cart} alt="Add Product" />
          </div>
          <span className="sidebar-label">Add Product</span>
        </NavLink>

        <NavLink
          to="/listproduct"
          className={({ isActive }) =>
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <div className="sidebar-icon-wrapper">
            <img src={Product_list_icon} alt="Product List" />
          </div>
          <span className="sidebar-label">Products List</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
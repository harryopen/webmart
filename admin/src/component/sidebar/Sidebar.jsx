import { Link } from 'react-router-dom';
import product_Cart from '../../assets/Product_Cart.svg';
import Product_list_icon from '../../assets/Product_list_icon.svg';
import './sidebar.css'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
          <img src={product_Cart} ></img>
          <p>Add products</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className='sidebar-item'>
          <img src={Product_list_icon} ></img>
          <p>  List products</p>
        </div>
      </Link>

    </div>
  )
}

export default Sidebar
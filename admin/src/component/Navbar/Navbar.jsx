import navlogo from '../../assets/nav-logo.svg';
import navprofile from '../../assets/nav-profile.svg';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <img src={navlogo} className="nav-logo" alt="Shopper Admin Logo" />
        <span className="nav-badge">Admin Workspace</span>
      </div>
      <div className="nav-profile-container">
        <div className="nav-status">
          <span className="status-dot"></span>
          <span className="status-text">Online</span>
        </div>
        <div className="avatar-wrapper">
          <img src={navprofile} className="nav-profile" alt="Admin Profile" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
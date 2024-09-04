import navlogo from '../../assets/nav-logo.svg'
import navprofile from '../../assets/nav-profile.svg';
import './Navbar.css'
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} className="nav-logo"></img>
      <img src={navprofile}  className='nav-profile'></img>
    </div>
  )
}

export default Navbar
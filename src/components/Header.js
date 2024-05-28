import logo from "../images/Flogo.png";
import { Link } from "react-router-dom";
import { UserLogo, ContactLogo, HomeLogo, CartLogo, SearchLogo } from "../images/SvgIcon";
import Search from "./Search";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react"; 

const Header =() => {
  // Subscribing the Store
  const cartItems = useSelector((store) => store.cart.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userLogin, setUserLogin]=useState('login');

  useEffect(()=>{
    const fetchAuthStatus=async()=>{
      try {
        const response = await fetch('http://localhost:3000/api/user/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
          credentials: 'include',
        });
        const apiRespose = await response.json();
        if(apiRespose.login){
          setUserLogin('logout')
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAuthStatus();
  },[])
 
 
  return (
    <section className="shadow-xl rounded-b-xl">
      <div className="headerContainer flex justify-between items-center mx-10 my-4 ">
        <div className="logoContainer">
          <div className="logo">
            <img src={logo} alt="" className="h-[70px] -mt-4" />
          </div>
        </div>
        {/* Responsive Menu Icon */}
        <div className="menuIcon cursor-pointer md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </div>
        <div className={`navLinksContainer ${isMenuOpen ? 'block' : 'hidden'} md:flex justify-between space-x-16 text-lg font-semibold text-fuchsia-600`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <div className="navItem flex gap-x-2 hover:text-orange-500">
              {HomeLogo}Home
            </div>
          </Link>
          <Link to="/search" onClick={() => setIsMenuOpen(false)}>
            <div className="navItem flex gap-x-2 hover:text-orange-500">
              {SearchLogo}Search
            </div>
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            <div className="navItem flex gap-x-2 hover:text-orange-500">
              {ContactLogo}Contact
            </div>
          </Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
            <div className="navItem flex gap-x-2 hover:text-orange-500 relative">
              {CartLogo}Cart<span className="absolute bottom-4 left-2">{cartItems.length}</span>
            </div>
          </Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            <div className="navItem flex gap-x-2 hover:text-orange-500">
              {UserLogo}{userLogin}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;

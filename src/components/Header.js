import logo from "../images/Flogo.png";
import { Link } from "react-router-dom";
import { UserLogo, ContactLogo, HomeLogo, CartLogo, SearchLogo } from "../images/SvgIcon";
import Search from "./Search";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "../utils/userLogSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogStatus = useSelector((store) => store.userlog.userState);

  const cartItems = useSelector((store) => store.cart.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogAndMenu = async () => {
    setIsMenuOpen(false);
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
      if (apiRespose.success) {
        dispatch(userLogout("logout"));
        try {
          const response = await fetch('http://localhost:3000/api/user/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
            credentials: 'include',
          });
          const apiRespose = await response.json();
          if (apiRespose.success) {
            toast.success(apiRespose.message);
            dispatch(userLogin("login"))
            navigate('/');
          } else {
            toast.error(apiRespose.message);
          }

        } catch (error) {
          console.log("Error in logout", error.message);
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section className="shadow-xl rounded-b-xl">
      <div className="headerContainer flex justify-between items-center mx-10 my-4 ">
        <div className="logoContainer">
          <div className="logo">
            <img src={logo} alt="" className="h-[70px] -mt-4" />
          </div>
        </div>
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
          <Link to="/login" onClick={handleLogAndMenu}>
            <div className="navItem flex gap-x-2 hover:text-orange-500">
              {UserLogo}{userLogStatus}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;

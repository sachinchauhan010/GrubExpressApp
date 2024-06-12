import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import logo from "../images/Flogo.png";
import { UserLogo, ContactLogo, HomeLogo, CartLogo, SearchLogo, resLogo } from "../images/SvgIcon";
import UserTypeDialog from './dialog/userType';
import { userLogin, userLogout } from "../utils/userLogSlice";
import { clearCart } from '../utils/CartSlice.js';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userType, setUserType] = useState('user');
  const userLogStatus = useSelector((store) => store.userlog.userState);
  const cartItems = useSelector((store) => store.cart.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartLength, setCartLength] = useState(0)



  useEffect(() => {
    const getCartLength = async () => {
      const response = await fetch(process.env.API_URI+'/api/user/get-user-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
        credentials: 'include',
      });
      const apiResponse = await response.json();
      if (apiResponse.success) {
        setCartLength(apiResponse.userCart.length)
      } else {
        console.log(apiResponse.message);
      }
    }
    getCartLength()
  }, [])   

  useEffect(()=>{
   const getUserType=async ()=>{
    try {
      const response = await fetch(process.env.API_URI+"/api/distributor/get-user-type-token", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
        credentials: 'include',
      });
      const apiResponse = await response.json();
      console.log(apiResponse, "TOken")

      if(apiResponse.distributorToken){
        setUserType('distributor')
      }else if(apiResponse.token){
        setUserType('user')
      }
    } catch (error) {
      console.log("Error in Finding Token", error.message)
    }
   }
   getUserType()
  }, [])

  const handleDialogClose = (selectedValue) => {
    setDialogOpen(false);
    if (selectedValue) {
      if (selectedValue === 'Login as distributor') {
        setUserType('distributor')
        navigate('/distributor/login')
      } else {
        setUserType('user')
        navigate('/user/login');
      }
    }
  };

  const handleLogAndMenu = async () => {
    setIsMenuOpen(false);
    setDialogOpen(true);

    try {
      const response = await fetch(process.env.API_URI+`/api/${userType}/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
        credentials: 'include',
      });
      const apiResponse = await response.json();
      if (apiResponse.success) {
        dispatch(userLogout("logout"));
        try {
          const response = await fetch(process.env.API_URI+`/api/${userType}/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
            credentials: 'include',
          });
          const apiResponse = await response.json();
          if (apiResponse.success) {
            toast.success(apiResponse.message);
            dispatch(userLogin("login"))
            dispatch(clearCart());
            setCartLength(0)
            navigate('/');
            // setDialogOpen(true);
          } else {
            toast.error(apiResponse.message);
          }
        } catch (error) {
          console.log("Error in logout", error.message);
        }
      } else {
        dispatch(userLogin("login"));
        // openDialog();  // Open the dialog when the user is not authenticated
        setDialogOpen(true)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section className="rounded-b-xl bg-transparent">
      <div className="headerContainer flex justify-between items-center mx-10 mt-4 ">
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
        <div className={`navLinksContainer ${isMenuOpen ? 'block' : 'hidden'} md:flex justify-between space-x-16 text-lg font-medium text-fuchsia-600`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="relative group">
            <div className="navItem flex gap-x-2 hover:text-blue-900">
              {HomeLogo}Home
            </div>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-right group-hover:origin-bottom-left"></span>
          </Link>

          {userType === 'user' && (
            <Link to="/search" onClick={() => setIsMenuOpen(false)} className='relative group'>
              <div className="navItem flex gap-x-2 hover:text-blue-900">
                {SearchLogo}Search
              </div>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-right group-hover:origin-bottom-left"></span>
            </Link>
          )}
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className='relative group'>
            <div className="navItem flex gap-x-2 hover:text-blue-900">
              {ContactLogo}Contact
            </div>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-right group-hover:origin-bottom-left"></span>

          </Link>
          {(userType == 'distributor') ? (
            <Link to='/distributor/restaurant' className='relative group'>
              <div className="navItem flex gap-x-2 hover:text-blue-900 relative">
                <span className=''>{resLogo}</span> Restaurant
              </div>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-right group-hover:origin-bottom-left"></span>
            </Link>
          ) : (
            <Link to="/cart" onClick={() => setIsMenuOpen(false)} className='relative group'>
              <div className="navItem flex gap-x-2 hover:text-blue-900 relative">
                {CartLogo}Cart<span className="absolute bottom-4 left-2">{cartLength || cartItems.length}</span>
              </div>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-right group-hover:origin-bottom-left"></span>

            </Link>
          )
          }

          <Link to="#" onClick={handleLogAndMenu} className='relative group'>
            <div className="navItem flex gap-x-2 hover:text-blue-900">
              {UserLogo}{userLogStatus}
            </div>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-right group-hover:origin-bottom-left"></span>
          </Link>
        </div>
      </div>
      <UserTypeDialog open={dialogOpen} onClose={handleDialogClose} />
    </section>
  );
};

export default Header;

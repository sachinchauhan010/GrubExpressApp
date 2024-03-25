import logo from "../images/Flogo.png";
import { Link } from "react-router-dom";
import {
  UserLogo,
  ContactLogo,
  HomeLogo,
  CartLogo,
  SearchLogo,
} from "../images/SvgIcon";
import Search from "./Search";
import { useSelector } from "react-redux";
const Header = () => {

  // Subscribing the Store
  const cartItems=useSelector((store)=>store.cart.items);
  return (
    <section className="shadow-xl rounded-b-xl">
      <div className="headerContainer flex justify-around items-center mx-10 my-4 ">
        <div className="logoContainer">
          <div className="logo">
            <img src={logo} alt="" className="h-[70px] -mt-4" />
          </div>
        </div>
        <div className="navLinksContainer flex justify-around space-x-16 text-lg font-semibold text-fuchsia-600 cursor-pointer">
          <Link to="/">
            <div className="navItem flex gap-x-2 hover:text-orange-500">
              {HomeLogo}Home
            </div>
          </Link>
          <Link to="/search">
            <div
              className="navItem flex gap-x-2 hover:text-orange-500"
              onClick={() => {
                console.log("Search Clicked");
                return <Search />;
              }}
            >
              {SearchLogo}Search
            </div>
          </Link>

          <Link to="/contact">
            <div className="navItem flex gap-x-2 hover:text-orange-500">
              {ContactLogo}Contact
            </div>
          </Link>
          <Link to="/cart">
            <div className="navItem flex gap-x-2 hover:text-orange-500">
              {CartLogo}Cart({cartItems.length} items)
            </div>
          </Link>
          <Link to="/login">
            <div className="navItem flex gap-x-2 hover:text-orange-500">
              {UserLogo}LogIn
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Header;

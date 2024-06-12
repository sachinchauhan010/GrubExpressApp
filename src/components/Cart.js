import { useDispatch, useSelector } from "react-redux";
import CartList from "./CartList";
import { clearCart } from "../utils/CartSlice";
import { useState, useEffect } from "react";

const Cart = () => {

  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [totalCost, setTotalCost] = useState(0);
  const [cartItem, setCartItem]=useState([])

  useEffect(() => {
    const newTotalCost = cartItems.reduce((total, item) => total + item.price, 0);
    setTotalCost(newTotalCost);
  }, [cartItems]);

  useEffect(()=>{
    const fetchItem=async ()=>{
      const response = await fetch(process.env.API_URI+'/api/user/get-user-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
        credentials: 'include',
      });
      
      const apiResponse = await response.json();
      const cartDetails=apiResponse.userCart || [];
      setCartItem(cartDetails);
    };
    fetchItem();
  },[])

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const updateTotalCost = (priceChange) => {
    setTotalCost((prevTotal) => prevTotal + priceChange);
  };
  console.log(cartItem," cartItems");
  return (
    <section>
      <h2 className="text-2xl md:text-4xl font-bold text-gray-600 text-center pt-6">
        Cart
      </h2>
      <button
        className="clearCartBtn bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 ml-[84%] border border-blue-500 hover:border-transparent rounded"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>
      {cartItem.map((item) => (
        <CartList item={item.itemId} updateTotalCost={updateTotalCost} />
      ))}
      <p className="totalPrice md:text-xl text-lg font-bold text-center text-orange-400 mb-10">
        Total Price: ₹{totalCost}
      </p>
    </section>
  );
};

export default Cart;

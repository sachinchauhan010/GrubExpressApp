import { useDispatch, useSelector } from "react-redux";
import MenuList from "./MenuList";
import CartList from "./CartList";
// import { clearCart, removeItem } from "../utils/CartSlice";
const Cart = () => {
  const cartItem = useSelector((store) => store.cart.items);
  console.log(cartItem);
  
  return (
    <section>
      <h2 className="text-2xl md:text-4xl font-bold text-blue-500 text-center pt-6">Cart</h2>
      {cartItem.map((item) => (
        <CartList items={item} />
      ))}
    </section>
  );
};
export default Cart;

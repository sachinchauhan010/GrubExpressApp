import { useDispatch } from "react-redux";
import { clearCart, removeItem } from "../utils/CartSlice";
const Cart = () => {
  const dispatch=useDispatch();
  const handleRemoveItem=()=>{
    dispatch(removeItem());
  }

  const handleClearCart=()=>{
    dispatch(clearCart());
  }
  
  return (
    <section>
      <button onClick={handleRemoveItem}>Remove</button>
      <button onClick={handleClearCart}>Clear Cart</button>
    </section>
  );
};
export default Cart;

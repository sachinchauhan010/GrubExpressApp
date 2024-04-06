import { useDispatch, useSelector } from "react-redux";
import CartList from "./CartList";
import { clearCart } from "../utils/CartSlice";

const Cart = () => {
  const cartItem = useSelector((store) => store.cart.items);
  let totalCost = 0;
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

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
        <CartList key={item.id} items={item} />
      ))}

      {cartItem.map((item) => {
        totalCost = totalCost + parseInt(item?.price / 100);
      })}
      <p className="totalPrice md:text-xl text-lg font-bold text-center text-orange-400 mb-10">
        Total Price: {totalCost}
      </p>
    </section>
  );
};

export default Cart;

import { IMG_URL } from "../utils/Constant";
import { useState } from "react";
import { removeItem } from "../utils/CartSlice";
import { useDispatch } from "react-redux";

const CartList = ({ item, updateTotalCost }) => {
  const { name, category, description, imageId, price } = item;
  const [counter, setCounter] = useState(1);
  const [cost, setCost] = useState(price);

  const dispatch = useDispatch();

  const handleDecrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      setCost((prevCost) => prevCost - price);
      updateTotalCost(-price);
    }
  };

  const handleIncrement = () => {
    setCounter(counter + 1);
    setCost((prevCost) => prevCost + price);
    updateTotalCost(price);
  };

  const handleRemove = () => {
    dispatch(removeItem(item));
    updateTotalCost(-cost);
  };

  return (
    <section className="mx-4 md:mx-20">
      <div className="md:grid md:grid-cols-4 text-center items-center px-4 my-4 border-orange-50">
        <div className="relative w-full">
          <img src={IMG_URL + imageId} className="h-36 w-full rounded-t-md" alt={name} />
        </div>
        <div className="flex flex-col items-start text-start px-4">
          <h4 className="text-xl md:text-2xl font-bold">{name}</h4>
          <h4 className="text-md font-semibold text-blue-600 my-1 md:m-1">
            Category: {category}
          </h4>
          <h4 className="text-md font-semibold text-blue-600 my-1 md:m-1">
            Description: {description?.slice(0, 40) + "..."}
          </h4>
        </div>
        <h4 className="text-md font-semibold text-blue-600 my-1 md:m-1">₹{cost / 100}</h4>
        <div className="flex justify-center items-center">
          <button
            onClick={handleDecrement}
            className="text-2xl px-4 font-semibold border-x-2 rounded bg-blue-400 text-gray-700"
          >
            -
          </button>
          <span className="text-xl font-semibold px-4">{counter}</span>
          <button
            onClick={handleIncrement}
            className="text-2xl px-4 font-semibold border-x-2 rounded bg-blue-400 text-gray-700"
          >
            +
          </button>
          <button
            className="ml-6 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartList;

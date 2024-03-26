import { IMG_URL } from "../utils/Constant";
import Counter from "./Counter";
import { useState } from "react";

const CartList = ({ items }) => {
  let total=0;
  const { name, category, defaultPrice, description, imageId, price } = items;
  const [counter, setCounter] = useState(1);
  const [cost, setCost] = useState(price);
  const [totalCost, setTotalCost]=useState(total);
  
  const handleDecrement = () => {
    setCounter(counter - 1);
    setCost(cost - price);
    setTotalCost(totalCost-cost);
  };
  const handleIncrement = () => {
    setCounter(counter + 1);
    setCost(cost + price);
    setTotalCost(totalCost+cost);
  };
  total=total+cost;
  return (
    <section>
      
      <div className="flex flex-row space-y-2 w-full min-h-52 items-center px-4 my-4 border-orange-50 justify-around">
        <div className="relative w-1/4">
          <img
            src={IMG_URL + imageId}
            className="max-h-36 w-full rounded-t-md"
          />
        </div>
        <div className="flex flex-col items-start">
          <h4 className="text-xl md:2xl font-bold ">{name}</h4>
          <h4 className="text-md font-semibold text-blue-600 m-y-1">
            Category: {category}
          </h4>

          <h4 className="text-md font-semibold text-blue-600 m-y-1">
            Description: {description?.slice(0, 40) + "..."}
          </h4>
        </div>
        <h4 className="text-md font-semibold text-blue-600 m-y-1">
           ₹{cost}
        </h4>
        <div className="border-2 rounded-lg">
          <button onClick={handleDecrement} className="text-2xl px-4 font-semibold border-x-2 rounded bg-blue-400 text-gray-700">-</button>
          <span className="text-xl font-semibold px-4">{counter}</span>
          <button onClick={handleIncrement} className="text-2xl px-4 font-semibold border-x-2 rounded bg-blue-400 text-gray-700">+</button>
        </div>
      </div>
      <p>{totalCost}</p>
    </section>
  );
};
export default CartList;

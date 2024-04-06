import { useDispatch } from "react-redux";
import { IMG_URL } from "../utils/Constant";
import { addItem } from "../utils/CartSlice";

const MenuList = ({ items }) => {
  const { name, category, defaultPrice, description, imageId, price } = items;
  const dispatch = useDispatch();

  const handleCartItem = (items) => {
    dispatch(addItem(items));
  };

  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full border-b-2 border-gray-200 py-4 px-4 md:min-h-52">
      <div className="relative w-full md:w-1/4">
        <img src={IMG_URL + imageId} className="w-full rounded-md" alt={name} />
      </div>
      <div className="flex flex-col items-start justify-between">
        <div>
          <h4 className="text-xl md:text-2xl font-bold">{name}</h4>
          <h4 className="text-md font-semibold text-blue-600 my-1">
            Category: {category}
          </h4>
          <h4 className="text-md font-semibold text-blue-600 my-1">
            Price: ₹{price ? price / 100 : defaultPrice / 100}
          </h4>
          <h4 className="text-md font-semibold text-blue-600 my-1">
            Description: {description?.slice(0, 40) + "..."}
          </h4>
        </div>
        <button
          className="text-md font-semibold text-gray-700 mt-2 md:mt-0 bg-green-400 py-2 px-4 rounded-md hover:bg-orange-500"
          onClick={() => handleCartItem(items)}
        >
          Add +
        </button>
      </div>
      
    </div>
  );
};

export default MenuList;

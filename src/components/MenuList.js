
import {IMG_URL} from "../utils/Constant"
const MenuList = ({
  
  name,
  category,
  defaultPrice,
  description,
  imageId,
  price
}) => {
  return (
    <>
      
      <div className="flex flex-row space-y-2 w-full min-h-52 justify-between px-4 my-4 border-orange-50">
        <div className="flex flex-col items-start">
          <h4 className="text-xl md:2xl font-bold ">{name}</h4>
          <h4 className="text-md font-semibold text-blue-600 m-y-1">
            Category: {category}
          </h4>
          <h4 className="text-md font-semibold text-blue-600 m-y-1">
            Price: ₹{price? price/100 : defaultPrice / 100}
          </h4>
          <h4 className="text-md font-semibold text-blue-600 m-y-1">
            Description: {description?.slice(0, 40) + "..."}
          </h4>
        </div>
        <div className="relative w-1/4">
          <img
            src={IMG_URL + imageId}
            className="max-h-36 w-full rounded-t-md"
          />
          <button className="text-md font-semibold text-gray-700 m-y-1 absolute bottom-16 left-0 bg-green-400 w-full text-center rounded-md hover:bg-orange-500">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};
export default MenuList;

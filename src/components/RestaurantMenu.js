import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import { IMG_URL } from "../utils/Constant";
import RestaurantCategory from "./RestaurantCategory";
// import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";
const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(-1);
  const { resId } = useParams();
  const restaurantInfo = useRestaurantInfo(resId);

  if (restaurantInfo === null) {
    return <Shimmer />;
  }
  const {
    name,
    cuisines,
    costForTwo,
    avgRating,
    cloudinaryImageId,
    city,
    locality,
    message,
  } = restaurantInfo?.cards[0]?.card?.card?.info;
  const itemCards =
    restaurantInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card?.itemCards;
  const categoryData =
    restaurantInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  const itemInfo = itemCards.map((item) => item.card.info);
  console.log(itemInfo, "###");

  return (
    <section className="bg-blue-50">
      <div className="flex justify-around mb-10 border-b-orange-300 border-b-2 py-10">
        <div>
          <p className="text-xl font-bold md:text-2xl text-blue-700 ">{name}</p>
          <p className="text-md md:text-lg font-semibold text-fuchsia-700">
            {cuisines.join(", ")}
          </p>
          <p className="text-md font-semibold text-fuchsia-700 m-y-1">
            {city},{locality}
          </p>
          <p className="text-md font-semibold text-fuchsia-700 m-y-1">
            {message}
          </p>
          <p className="text-md font-semibold text-fuchsia-700 m-y-1">
            ₹ {costForTwo / 100} FOR TWO
          </p>
        </div>
        <div className="relative w-1/5">
          <img
            src={IMG_URL + cloudinaryImageId}
            alt=""
            className="max-h-36 w-full rounded-lg"
          />
          <p className="text-md font-semibold text-gray-700 m-y-1 absolute bottom-2 left-0 bg-green-400 w-full text-center rounded-md">
            {avgRating} Star
          </p>
        </div>
      </div>

      <div className="flex flex-col flex-wrap p-3">
        {categoryData.map((resCategory, index) => (
          <RestaurantCategory
            menu={resCategory?.card?.card}
            showItems={index === showIndex ? true : false}
            setShowIndex={setShowIndex}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default RestaurantMenu;

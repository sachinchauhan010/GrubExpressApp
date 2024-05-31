import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import { IMG_URL } from "../utils/Constant";
import RestaurantCategory from "./RestaurantCategory";
import { useEffect, useState } from "react";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(-1);
  const { resId } = useParams();
  // const restaurantInfo = useRestaurantInfo(resId);
  const [restaurantDishes, setRestaurantDishes] = useState([]);

  useEffect(() => {
    const fetchRestaurantDishes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/distributor/get-restaurant-dish', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resid: resId }), 
          credentials: 'include',
        });
        const data = await response.json();
        setRestaurantDishes(data.data.rescuisine);
        console.log(data.data);
      } catch (error) {
        console.error("Error fetching restaurant dishes:", error);
      }
    };
    console.log(restaurantDishes, "*****");
    fetchRestaurantDishes();
  }, [resId]); // Fetch dishes whenever the restaurant ID changes

  if (restaurantDishes === null) {
    return <Shimmer />;
  }

  return (
    <section className="bg-blue-50">
      {restaurantDishes.map((dish) => (
        <div className="flex justify-around mb-10 border-b-2 py-10">
          <div>
            <p className="text-xl font-bold md:text-2xl text-blue-700 ">{dish.itemid.itemname}</p>
            
            <p className="text-md font-semibold text-fuchsia-700 m-y-1">
              {dish.itemid.itemdescription}
            </p>
            <p className="text-md font-semibold text-fuchsia-700 m-y-1">
              {dish.itemid.itemprice}
            </p>
            <p className="text-md font-semibold text-fuchsia-700 m-y-1">
              In Stock: {dish.itemid.iteminstock}
            </p>
          </div>
          <div className="relative w-1/5">
            <img
              src={dish.itemid.itemphoto}
              alt="dish Image"
              className="max-h-36 w-full rounded-lg"
            />
          </div>
        </div>
      ))}


      {/* <div className="flex flex-col flex-wrap p-3">
        {restaurantDishes.map((dish, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg font-bold">{dish.itemname}</p>
            <p className="text-md text-gray-700">{dish.itemdescription}</p>
            <p className="text-md font-semibold text-fuchsia-700">₹ {dish.itemprice}</p>
            <p className="text-md font-semibold text-fuchsia-700">In Stock: {dish.iteminstock}</p>
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default RestaurantMenu;

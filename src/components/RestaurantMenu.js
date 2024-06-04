import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/CartSlice.js";
const RestaurantMenu = () => {
  const navigate=useNavigate();
  const dispatch= useDispatch();
  const { resId } = useParams();
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
      } catch (error) {
        console.error("Error fetching restaurant dishes:", error);
      }
    };
    fetchRestaurantDishes();
  }, [resId]);

  const handleCartItem = async (item) => {
    const response = await fetch('http://localhost:3000/api/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
      credentials: 'include',
    });

    const apiRespose = await response.json();
    if (apiRespose.success) {
      dispatch(addItem(item));
      const response = await fetch('http://localhost:3000/api/user/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: item }),
        credentials: 'include',
      });
      const apiRespose = await response.json();
      if (apiRespose.success) {
        toast.success(apiRespose.message);
      }

    } else {
      toast.error('You are not logged in');
      navigate('/user/login');
    }
  };

  if (restaurantDishes === null) {
    return <Shimmer />;
  }
  console.log(restaurantDishes, "&&&&&&&&&& Dish");
  return (
    <section className="bg-blue-50">
      {restaurantDishes.map((dish) => (
        <div className="flex justify-around mb-10 border-b-2 py-10">
          {console.log(dish, "$$$$$$$$$$$")}
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
            <button className="absolute bottom-1 left-0 bg-gray-400 w-full hover:text-white hover:bg-green-300 font-semibold" onClick={() => handleCartItem(dish?.itemid)}>ADD TO CART</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RestaurantMenu;

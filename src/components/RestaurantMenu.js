import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/CartSlice.js";
const RestaurantMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resId } = useParams();
  const [restaurantDishes, setRestaurantDishes] = useState([]);

  useEffect(() => {
    const fetchRestaurantDishes = async () => {
      try {
        const response = await fetch(process.env.API_URI + `/api/distributor/get-restaurant-dish/${resId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ resid: resId }),
          credentials: 'include',
        });
        const data = await response.json();
        setRestaurantDishes(data.dish.rescuisine);
        console.log(restaurantDishes, "&&&&")
      } catch (error) {
        console.error("Error fetching restaurant dishes:", error);
      }
    };
    fetchRestaurantDishes();
  }, [resId]);

  const handleCartItem = async (item) => {
    const response = await fetch(process.env.API_URI + '/api/user/auth', {
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
      const response = await fetch(process.env.API_URI + '/api/user/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
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
  return (
    <section className="bg-blue-50">
      {restaurantDishes.map((dish) => (
        <div className="flex justify-around mb-10 border-b-2 py-10">
          <div>
            <p className="text-xl font-bold md:text-2xl text-blue-700 ">{dish?.itemname}</p>
            <p className="text-md font-semibold text-fuchsia-700 m-y-1">
              {dish?.itemdescription}
            </p>
            <p className="text-md font-semibold text-fuchsia-700 m-y-1">
              {dish?.itemprice}
            </p>
            <p className="text-md font-semibold text-fuchsia-700 m-y-1">
              In Stock: {dish?.iteminstock}
            </p>
          </div>
          <div className="relative w-1/5">
            <img
              src={dish?.itemimage}
              alt="dish Image"
              className="max-h-36 w-full rounded-lg"
            />
            <button className="absolute bottom-1 left-0 bg-gray-400 w-full hover:text-white hover:bg-green-300 font-semibold" onClick={() => handleCartItem(dish)}>ADD TO CART</button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RestaurantMenu;

import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react";
import Title from "./Title";
import { Link } from "react-router-dom";

const Body = () => {
  const [restaurants, setRestaurants] = useState(null);

  const fetchRestaurant = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/distributor/get-restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
        credentials: 'include',
      });
      const data = await response.json();
      setRestaurants(data.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  if (restaurants === null) {
    return <Shimmer />;
  }

  return (
    <section>
      <Title />
      <div className="flex flex-wrap justify-center md:mx-8 mx-2 text-wrap my-4 sm:flex-row flex-col">
        {restaurants?.map((restaurant) => (
          <Link to={`/restaurant/${restaurant?.resid}`} key={restaurant?.resid} className="lg:w-1/4 md:w-1/3 sm:w-1/2 xs:w-2/3 xs:m-auto w-[100%] flex flex-wrap flex-row box-border">
            <RestaurantCard {...restaurant} key={restaurant.resid} />
          </Link>
        ))}

      </div>
    </section>
  );
};

export default Body;

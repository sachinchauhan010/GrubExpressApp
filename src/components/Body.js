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
    <section className="bg-blue-50 text-blue-900">
      <div className="section flex flex-col md:flex-row justify-around items-center h-[100vh] px-10">
      <div className="">
        <h1 className="text-5xl font-bold mb-5">
          It's Not Just Food, <br />
          It's an <span>Experience</span>
        </h1>

        <p className="text-lg font-normal mb-5 pr-20 text-blue-900">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa,
          provident dolorum. Voluptatum ducimus minima quasi unde, voluptatibus
          soluta eligendi. Enim, architecto autem.
        </p>

        <a href="#menu" className="btn">Explore Menu</a>
      </div>
      <div className="" >
        <img src="https://raw.githubusercontent.com/sachinchauhan010/GrubExpressApp/master/src/images/chef.jpeg?token=GHSAT0AAAAAACLYQ7CYPW5MQZ2HV2JHGEKQZTG7SBQ" alt="" className="" />
      </div>
    </div>
      <Title />
      <div className="flex flex-wrap justify-center md:mx-8 mx-2 text-wrap my-4 sm:flex-row flex-col">
        {restaurants?.map((restaurant) => (
          <Link to={`/restaurant/${restaurant?.resid}`} key={restaurant?.resid} className="lg:w-1/3 md:w-1/2 sm:w-1/1 xs:w-2/3 xs:m-auto w-[100%] flex flex-wrap flex-row box-border">
            <RestaurantCard {...restaurant} key={restaurant.resid} />
          </Link>
        ))}

      </div>
    </section>
  );
};

export default Body;

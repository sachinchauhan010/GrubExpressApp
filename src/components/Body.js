import RestaurantCard from "./RestaurantCard";
import useData from "../utils/useData";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react";
import Search from "./Search";
import Title from "./Title";
import { Link } from "react-router-dom";
const Body = () => {
  const [filteredList, setFilteredList]=useState(null);
  const resData = useData();
  if (resData === null) {
    return <Shimmer />;
  }
  const itemCard = resData?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants || resData?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || resData?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  
  console.log(itemCard, "item card")  
  return (
    <section>
      <Title/>
      <div className="flex flex-wrap justify-center md:mx-8 mx-2 text-wrap my-4 sm:flex-row flex-col">
        {itemCard?.map((restaurant) => (
          <Link to={"/restaurant/"+restaurant?.info?.id} key={restaurant?.info?.id} className="lg:w-1/4 md:w-1/3 sm:w-1/2 xs:w-2/3 xs:m-auto w-[100%] flex flex-wrap flex-row box-border">
            <RestaurantCard {...restaurant.info} />
          </Link>
        ))}
      </div>
    </section>
  );
};
export default Body;

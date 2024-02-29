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
  const itemCard =
    resData?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  
  console.log(itemCard, "item card")  
  return (
    <section>
      <Title/>
      <div className="resContainer flex flex-wrap mx-16 gap-x-14">
        {itemCard?.map((restaurant) => (
          <Link to={"/restaurant/"+restaurant?.info?.id} key={restaurant?.info?.id}>
            <RestaurantCard {...restaurant.info} />
          </Link>
        ))}
      </div>
    </section>
  );
};
export default Body;

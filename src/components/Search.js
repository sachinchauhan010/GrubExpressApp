import useData from "../utils/useData";
import Items from "./Items";
import Shimmer from "./Shimmer";
import ItemData from "../utils/ItemsData";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const Search = () => {
  const [filteredList, setFilteredList] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const cuisinesData = ItemData;
  const resData = useData();

  if (resData === null) {
    return <Shimmer />;
  }

  const resList =
    resData?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants||resData?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

  const handleSearch = () => {
    const filteredRes = resList.filter((res) => {
      return res?.info?.name?.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilteredList(filteredRes);
  };

  return (
    <section className="flex flex-col">
      <div className="flex justify-center">
        <div className="SearchRes h-12 border-2 border-fuchsia-300 rounded-lg w-full md:w-[600px] shadow-md pl-4 flex justify-between items-center bg-slate-50">
          <input
            type="text"
            className="searchBox h-full w-[500px] focus:outline-none bg-slate-50"
            placeholder="item, Food"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="Search text-gray-500 bg-fuchsia-300 w-[100px] h-full rounded-md shadow-xl font-semibold text-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {!filteredList ? (
        <div className="itemContainer flex gap-x-4 flex-wrap mt-10 mx-4 md:mx-16 border-2 border-red-900">
          {cuisinesData?.map((item) => (
            <div key={item?.id}>
              <Items {...item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap mx-4 md:mx-8 my-4">
          {filteredList?.map((restaurant) => (
            <Link to={"/restaurant/" + restaurant?.info?.id} key={restaurant?.info?.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
              <RestaurantCard {...restaurant.info} />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Search;

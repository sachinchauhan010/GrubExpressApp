import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import { IMG_URL } from "../utils/Constant";
const RestaurantMenu = () => {
  // const [restaurantInfo, setRestaurantInfo] = useState(null);
  const { resId } = useParams();
  const restaurantInfo = useRestaurantInfo(resId);

  if (restaurantInfo === null) {
    return <Shimmer />;
  }
  const { name, cuisines, costForTwo, avgRating } = restaurantInfo?.cards[0]?.card?.card?.info;
  const  itemCards = restaurantInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards;

  console.log(itemCards);


    const itemInfo = itemCards.map(item => item.card.info)
    console.log(itemInfo,'###')
    
  return (
    <section>
      <div className="info">
        <h2>{name}</h2>
        <h3>{cuisines.join(", ")}</h3>
        <h3>{costForTwo}</h3>
        <h3>{avgRating} Star</h3>
      </div>

      <div className="flex flex-row flex-wrap p-3">
        {
          itemInfo.map((item) => (
            <div key={item.id} className="flex flex-col space-y-2 w-1/4 p-3 min-h-52">
              <img src={IMG_URL+item.imageId} className="max-h-44"/>
              <h4 className="text-2xl">{item.name}</h4>
              <h4>Category: {item.category}</h4>
              <h4>Price: {item.defaultPrice/100}</h4>
              <h4>Description: {item.description?.slice(0,80) + '...'}</h4>
              <button className="p-2 bg-green-400">+ Cart</button>
            </div>
          ))
        }
      </div>
    </section>
  );
};


export default RestaurantMenu;

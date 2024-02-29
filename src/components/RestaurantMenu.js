import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantInfo from "../utils/useRestaurantInfo";
import { IMG_URL } from "../utils/Constant";
const RestaurantMenu = () => {
  // const [restaurantInfo, setRestaurantInfo] = useState(null);
  const { resId } = useParams();
  const restaurantInfo = useRestaurantInfo(resId);
  console.log(restaurantInfo)

  if (restaurantInfo === null) {
    return <Shimmer />;
  }
  console.log(restaurantInfo);
  const { name, cuisines, costForTwo, avgRating } =
    restaurantInfo?.cards[0]?.card?.card?.info;
  const  itemCards =
    restaurantInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    console.log(itemCards);
    
  return (
    <section>
      <div className="info">
        <h2>{name}</h2>
        <h3>{cuisines.join(", ")}</h3>
        <h3>{costForTwo}</h3>
        <h3>{avgRating} Star</h3>
      </div>

      <div className="recommeneded">
          {
            itemCards.map((item)=>(
              <>
              <h4>Hi</h4>
              <h4>{console.log(item)}</h4>
              </>
            )
            )
          }
      </div>
    </section>
  );
};
export default RestaurantMenu;

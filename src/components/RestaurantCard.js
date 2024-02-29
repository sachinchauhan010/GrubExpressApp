import useData from "../utils/useData";
import Shimmer from "./Shimmer";
import { IMG_URL } from "../utils/Constant";
const RestaurantCard = ({
  name,
  avgRating,
  sla,
  cuisines,
  cloudinaryImageId,
  locality,
}) => {
  const resData = useData();
  if (resData === null) {
    return <Shimmer />;
  }

  return (
    <section>
      <div className="title text-xl font-bold md:text-2xl m-10"></div>
      <div className="resCardContainer">
        <div className="w-64 h-[380px] p-1 rounded-md shadow-xl bg-gray-100">
          <div className="space-y-4">
            <div className="space-y-2">
              <img
                src={IMG_URL + cloudinaryImageId}
                alt=""
                className="h-44 w-full"
              />
            </div>
            <div className="space-y-2 text-fuchsia-600 px-1">
              <h3 className="text-xl font-semibold">{name}</h3>
              <div className="flex justify-between font-medium">
                <h4>⭐{avgRating} Star</h4>
                <h4 className="">{sla.slaString}</h4>
              </div>
                <h4 className="font-medium">{cuisines.join(",")}</h4>
                <h4 className="font-medium">{locality}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RestaurantCard;

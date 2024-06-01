import { IMG_URL } from "../utils/Constant";

const RestaurantCard = ({
  resname,
  reslocation,
  resdescription,
  restype,
  resowner,
  resopentime,
  resclosetime,
  rescuisine,
  resimage,
}) => {
  return (
    <div className="md:h-[380px] md:w-[90%] sm:h-[380px] sm:w-[100%] w-full overflow-hidden p-4 m-6 my-3 rounded-md space-x-2 shadow-xl bg-gray-200">
      <div className="space-y-4">
        <div className="space-y-2">
          <img
            src={resimage}
            alt=""
            className="h-44 w-full rounded-t-md"
          />
        </div>
        <div className="space-y-2 text-blue-800 px-1">
          <h3 className="text-lg font-semibold"><span>Name</span>{resname}</h3>
          <div className="font-medium text-base">
            {/* <h4>{restype}</h4> */}
            <h4 className="overflow-hidden">
            <span>Cuisines:</span> {rescuisine.map((item)=>(
                <span>{item.itemname}</span>
              ))}
              </h4>
              <h4><span>Location:</span> {reslocation.length > 30 ? reslocation.slice(0, 30) + '...' : reslocation}</h4>

           
            <h4><span>Time:</span> {resopentime} -  {resclosetime}</h4>
          </div>
          <div className="font-medium text-sm text-gray-700">
            <p>{resdescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

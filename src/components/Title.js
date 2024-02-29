import useData from "../utils/useData";
import Shimmer from "./Shimmer";
const Title = () => {
  const resData = useData();
  if (resData === null) {
    return <Shimmer />;
  }
  const { title } = resData?.cards[2]?.card?.card;
  return (
    <section>
      <div className="title text-xl font-bold md:text-2xl mx-16 mt-10 text-pink-500">{title}</div>
    </section>
  );
};
export default Title;

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
      <div className="title text-xl font-bold md:text-3xl md:mx-16 mx-3 text-center mt-10 text-blue-800">{title}</div>
    </section>
  );
};
export default Title;

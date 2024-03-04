import MenuList from "./MenuList";

const RestaurantCategory = ({menu, index, setShowIndex, showItems}) => {
  const {title, itemCards } = menu;
  const flag = showItems;
  const handleShow=()=>{
    setShowIndex(index);
  }
  return (
    <>
      <div className="text-center text-lg font-semibold text-fuchsia-800 w-8/12 mx-auto my-3 flex flex-col">
        <div className="flex flex-row cursor-pointer justify-between shadow-xl px-4 py-4" onClick={handleShow}>
          <span className="text-xl font-bold">
            {title}({itemCards.length})
          </span>
          <span>🔽</span>
        </div>
        {flag && itemCards.map((item) => (
          <MenuList key={title} {...item?.card?.info}/>
        ))}
      </div>
    </>
  );
};
export default RestaurantCategory;

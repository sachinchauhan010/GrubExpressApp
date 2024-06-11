import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Dish() {
  const { resId } = useParams();
  const [dish, setDish] = useState([])
  useEffect(() => {
    const fetchRegisteredDish = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/distributor/get-restaurant-dish/${resId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const apiresponse = await response.json();
        if (!response.ok) {
          throw new Error(apiresponse.message || 'Network response was not ok');
        }
        setDish(apiresponse?.dish?.rescuisine);
        console.log(dish, "Dish")
      } catch (error) {
        console.error("Error in fetching API data:", error.message);
      }
    };
    fetchRegisteredDish();
  }, []);
  return (
    <div>

      {dish.map((dish) => (
        <div className='flex justify-around items-center'>
          <img src={dish.itemimage} alt="" />
          <div className='flex flex-col justify-center'>
            <p>{dish.itemname}</p>
            <p>{dish.itemdescription}</p>
            <p>{dish.itemprice}</p>
          </div>

        </div>
      ))}
    </div>
  )
}

export default Dish

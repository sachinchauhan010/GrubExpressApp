import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";


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
        <div className='flex justify-around items-center mt-20 relative'>
          <Card className="w-full max-w-[54rem] flex-row justify-start space-x-10 h-[270px] bg-blue-100">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
              <img
                src={dish.itemimage}
                alt="dish image"
                className="h-full w-full object-cover p-2"
              />
            </CardHeader>
            <CardBody className='p-2'>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                {dish.itemname}
              </Typography>
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {dish.itemprice}
              </Typography>
              <Typography color="gray" className="mb-8 font-normal">
                {dish.itemdescription}
              </Typography>
              <div className='absolute -bottom-1 right-0 flex justify-between space-x-10'>
                <Link to="#" className="inline-block py-2 px-4 bg-blue-400 text-white rounded rounded-b-xl">
                  Edit Details
                </Link>
                <Link to="#" className="inline-block py-2 px-4 bg-red-500 text-white rounded rounded-b-xl">
                  Remove Dish
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>


      ))}
    </div>
  )
}

export default Dish

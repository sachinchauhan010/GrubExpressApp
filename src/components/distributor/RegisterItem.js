import React, { useEffect, useState } from 'react';
import RegisterRestaurant from './RegisterRes';
import RegisterDish from './RegisterItem';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

function Restaurant() {
  const [registeredRes, setRegisteredRes] = useState([]);

  useEffect(() => {
    const fetchRegisteredRes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/distributor/get-registered-restaurant', {
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
        console.log(apiresponse, "api Response");
        setRegisteredRes(apiresponse);
      } catch (error) {
        console.error("Error in fetching API data:", error.message);
      }
    };
    fetchRegisteredRes();
  }, [registeredRes]);

  return (
    <section>
      <RegisterRestaurant />
      <div>
        <h2>Registered Restaurant</h2>
        {console.log(registeredRes, "res")}
        {registeredRes.length > 0 ? (
          registeredRes.map((restaurant) => {
            const { resid, resimage, resname, reslocation, restype, rescuisine, resopentime, resclosetime, resowner } = restaurant;
            return (
                <div key={resid} className='shadow-xl'>
                <div>
                <RegisterDish resId={resid}/>
                </div>
                <Link to={`/distributor/restaurant-dish/${resid}`}>
                  <div className='flex justify-around items-center'>
                    <div className='flex justify-around items-center mt-20 relative'>
                      <Card className="w-full max-w-[54rem] flex-row justify-start space-x-10 h-[270px] bg-blue-100">
                        <CardHeader
                          shadow={false}
                          floated={false}
                          className="m-0 w-2/5 shrink-0 rounded-r-none"
                        >
                          <img
                            src={resimage}
                            alt="Restaurant Image"
                            className="h-full w-full object-cover p-2"
                          />
                        </CardHeader>
                        <CardBody className='p-2'>
                          <Typography variant="h6" color="gray" className="mb-4 uppercase">
                            {resname}
                          </Typography>
                          <Typography variant="h4" color="blue-gray" className="mb-2">
                            {reslocation}
                          </Typography>
                          <Typography variant="h4" color="blue-gray" className="mb-2">
                            {restype}
                          </Typography>
                          <Typography variant="h4" color="blue-gray" className="mb-2">
                            {rescuisine}
                          </Typography>
                          <Typography variant="h4" color="blue-gray" className="mb-2">
                            {resopentime}
                          </Typography>
                          <Typography variant="h4" color="blue-gray" className="mb-2">
                            {resclosetime}
                          </Typography>
                          <Typography variant="h4" color="blue-gray" className="mb-2">
                            {resowner}
                          </Typography>
                          <div className='absolute -bottom-1 right-0 flex justify-between space-x-10'>
                            <Link to="#" className="inline-block py-2 px-4 bg-blue-400 text-white rounded rounded-b-xl">
                              Edit Details
                            </Link>
                            <Link to="#" className="inline-block py-2 px-4 bg-red-500 text-white rounded rounded-b-xl">
                              Remove Restaurant
                            </Link>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p>No registered restaurants found.</p>
        )}
      </div>
    </section>
  );
}

export default Restaurant;

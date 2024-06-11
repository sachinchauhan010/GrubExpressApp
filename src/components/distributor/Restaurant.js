import React, { useEffect, useState } from 'react';
import RegisterRestaurant from './RegisterRes';
import RegisterDish from './RegisterItem';
import { Link } from 'react-router-dom';

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
        setRegisteredRes(apiresponse);
        console.log(apiresponse, "restaurant")
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
        {registeredRes.length > 0 ? (
          registeredRes.map((restaurant, index) => {
            const { resid, resimage, resname, reslocation, restype, rescuisine, resopentime, resclosetime, resowner } = restaurant;
            console.log(resid, "resid")
            return (
              <div className='shadow-xl'>
                <RegisterDish resId={resid}/>

                <Link to={`/distributor/restaurant-dish/${resid}`} key={resid}>
                  <div key={index} className=' flex justify-around items-center'>
                    <img src={resimage} alt={`${resname} image`} />
                    <div>
                      <p>{resname}</p>
                      <p>{reslocation}</p>
                      <p>{restype}</p>
                      {/* <p>{rescuisine}</p> */}
                      <p>{resopentime} - {resclosetime}</p>
                      <p>{resowner}</p>
                    </div>
                    <div className='flex flex-col justify-center'>
                      <button>Edit</button>
                      <button>Delete</button>
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

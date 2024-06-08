import React, { useEffect, useState } from 'react';
import RegisterRestaurant from './RegisterRes';

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
      } catch (error) {
        console.error("Error in fetching API data:", error.message);
      }
    };
    fetchRegisteredRes();
  }, []);

  return (
    <section>
      <RegisterRestaurant />
      <div>
        <h2>Registered Restaurant</h2>
        {registeredRes.length > 0 ? (
          registeredRes.map((restaurant, index) => {
            const { resimage, resname, reslocation, restype, rescuisine, resopentime, resclosetime, resowner } = restaurant;
            return (
              <div key={index}>
                <img src={resimage} alt={`${resname} image`} />
                <div>
                  <p>{resname}</p>
                  <p>{reslocation}</p>
                  <p>{restype}</p>
                  <p>{rescuisine}</p>
                  <p>{resopentime} - {resclosetime}</p>
                  <p>{resowner}</p>
                </div>
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

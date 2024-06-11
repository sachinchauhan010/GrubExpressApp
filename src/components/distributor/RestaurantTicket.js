import React from 'react'
import { Button } from '@mui/material';
import RegisterDish from './RegisterItem';

function RestaurantTicket({resData}) {
  const { resimage, resname, reslocation, restype, rescuisine, resopentime, resclosetime, resowner }= resData
  console.log(resname, "name")
  return (
    <div>
      <div className='flex justify-around items-center shadow-md'>
        <img src={resimage} alt={`${resname} image`} />
        <div>
          <p>{resname}</p>
          <p>{reslocation}</p>
          <p>{restype}</p>
          <p>{rescuisine}</p>
          <p>{resopentime} - {resclosetime}</p>
          <p>{resowner}</p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          {/* <RegisterDish/> */}
          <Button>Edit Restaurant</Button>
          <Button>Delete Restaurant</Button>
        </div>
      </div>
    </div>

  )
}

export default RestaurantTicket

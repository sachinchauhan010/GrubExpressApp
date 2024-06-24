import React from 'react'
import RestaurantDetailsCard from '../components/resDetails/resDetailsCard'
import RestaurantMenu from '../components/RestaurantMenu'
import Reviews from '../components/resDetails/Review'

function RestaurantDetails() {
  return (
    <div>
      <RestaurantMenu/>
      <Reviews/>
    </div>
  )
}

export default RestaurantDetails

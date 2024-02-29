import { useState } from 'react'
import { IMG_URL } from '../utils/Constant';
import useData from '../utils/useData';
const WhatInMind=()=>{
    const foodInfo=useData();
    // console.log(foodInfo);
    // const {title}=foodInfo?.cards[0]?.card?.card;
    // const {id,imageId,action}=foodInfo?.cards[0]?.card?.card?.imageGridCards?.info;
    // const {text}=action;
    return(
        <section>
            {/* <h1>{title}</h1>
            <img src={IMG_URL+imageId} alt="" />
            <h3>{text}</h3> */}
        </section>
    )
}
export default WhatInMind;
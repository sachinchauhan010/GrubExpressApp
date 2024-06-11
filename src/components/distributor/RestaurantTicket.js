import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';


function RestaurantTicket({ resid, resimage, resname, reslocation, restype, rescuisine, resopentime, resclosetime, resowner }) {
    return (
        <div>
            <Link to={`/distributor/restaurant-dish/${resid}`}>
                <div className='flex justify-around items-center'>
                    <div className='flex justify-around items-center relative'>
                        <Card className="w-[1000px] flex-row justify-start space-x-10  bg-blue-100">
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
                                <Typography variant="h4" color="gray" className="mb-4 uppercase">
                                    {resname}
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    {reslocation}
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    {restype}
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    {rescuisine.map((cuisine) => (cuisine.itemname))}
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    {resopentime}
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    {resclosetime}
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-2">
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
    )
}

export default RestaurantTicket

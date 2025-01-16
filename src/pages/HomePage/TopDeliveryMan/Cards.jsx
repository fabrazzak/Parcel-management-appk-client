import { Card, CardContent, CardHeader } from '@/src/components/ui/card';
import React from 'react';

const Cards = ({man,controls,index}) => {
  const {name, image, averageRating,parcelsDelivered
  }=man
  console.log(man)
    return (
        <Card
              key={index}
              className="w-80 max-w-xs bg-white shadow-lg rounded-lg transition-transform"
              style={{
                transform: "translateX(-50%)",
                opacity: 0,
              }}
              initial={{ x: "-50%", opacity: 0 }}
              animate={controls}
              transition={{ duration: 1, delay: index * 0.3 }}
            >
              <CardHeader>
                <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 rounded-full mx-auto object-cover"
                />
                <h3 className="text-lg font-medium mt-4">{name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Parcels Delivered: {parcelsDelivered}</p>
                <p className="text-gray-600">Average Rating: {averageRating}</p>
              </CardContent>
            </Card>
    );
};

export default Cards;
import Loading from "@/src/components/custom/Loading/Loading";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { useAnimation } from "framer-motion"; // For animation
import { useState, useEffect } from "react";
import Cards from "./Cards";

const TopDeliveryMan = () => {

    const [deliveryMen, setDeliveryMen] = useState([]);
  const controls = useAnimation();

  console.log(deliveryMen)

  useEffect(() => {
   
    fetch("top-delivery.json")
    .then(res=> res.json())
    .then(data => setDeliveryMen(data))
   

    // const sortedData = data
    //   .sort((a, b) => {
    //     const ratingA = a.averageRating || 0;
    //     const ratingB = b.averageRating || 0;
    //     const parcelsA = a.parcelsDelivered || 0;
    //     const parcelsB = b.parcelsDelivered || 0;

    //     return (
    //       b.parcelsDelivered - a.parcelsDelivered ||
    //       b.averageRating - a.averageRating
    //     );
    //   })
    //   .slice(0, 3); // Get top 3 delivery men

    


    // Trigger animation after the data is set
    controls.start({ x: 0, opacity: 1 });
  }, []);

  
 
    return (
        <section className="flex flex-col items-center py-10">
      <h2 className="text-4xl font-bold mb-6">Top 3 Delivery Men</h2>
      <div className="flex justify-center gap-6">
        {
        deliveryMen?.length === 0 ?
         <Loading></Loading>
         : 
         deliveryMen?.map((man,index)=><Cards key={index} man={man} controls={controls}></Cards>)

          
          }
      </div>
    </section>
    );
};

export default TopDeliveryMan;
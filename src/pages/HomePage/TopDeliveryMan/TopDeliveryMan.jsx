import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecures from "@/src/hooks/useAxiosSecures";
import Loading from "@/src/components/custom/Loading/Loading";

const TopDeliveryMen = () => {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  console.log(deliveryMen,"top deliveryman")

  useEffect(() => {
    // Fetch data from the backend API
    const fetchDeliveryMen = async () => {
      try {
        const response = await axios.get('https://percel-management-app-server.vercel.app/top-delivery-men' );
        setDeliveryMen(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchDeliveryMen();
  }, []);

  if (loading) return <p><Loading></Loading></p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-[1200px] mx-auto py-12 px-4">
  <h1 className="text-center text-3xl font-extrabold text-gray-800 dark:text-white mb-8 tracking-wide">
    Top Delivery Men
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...deliveryMen]?.map((man,index) => (
      <div
        key={index}
        className="bg-gradient-to-r from-purple-500 to-purple-700 dark:from-black dark:to-black shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
      >
        <div className="relative w-24 h-24 mb-4">
          <img referrerPolicy="no-referrer"
            src={man?.photoURL}
            alt={man?.name}
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
          />
        </div>
        <h2 className="text-lg font-bold text-white">{man?.name}</h2>
        <p className="text-sm text-gray-200 font-semibold mt-2">
          Parcels Delivered:{" "}
          <span className="font-semibold text-white">{man?.totalParcels}</span>
        </p>
        <p className="text-sm text-gray-200 font-semibold mt-1">
          Average Rating:{" "}
          <span className="font-semibold text-yellow-400">
            {man?.averageRating?.slice(0,4)}
          </span>
        </p>
        <button className="mt-4 bg-white text-purple-700 px-4 py-3 rounded-full text-sm font-bold shadow-md hover:bg-gray-100 transition">
          View Details
        </button>
      </div>
    ))}
  </div>
</div>

  );
};

export default TopDeliveryMen;

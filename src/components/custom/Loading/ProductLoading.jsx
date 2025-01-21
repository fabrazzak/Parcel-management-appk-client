import React, { useEffect, useState } from 'react';

const ProductLoading = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCount((prev) => (prev < 50 ? prev + 10 : 100));
      }, 100);
  
      return () => clearInterval(timer);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center space-y-2 content-center">
        <div className="spinner-border animate-spin flex justify-center items-center content-center w-12 h-12 border-4 border-t-blue-500 rounded-full" />
        <p className='mx-auto text-center flex justify-center items-end'>Loading {count}%</p>
      </div>
    );
};

export default ProductLoading;
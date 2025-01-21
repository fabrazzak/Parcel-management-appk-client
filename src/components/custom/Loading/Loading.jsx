import React, { useEffect, useState } from 'react';

const Loading = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCount((prev) => (prev < 50 ? prev + 10 : 100));
      }, 100);
  
      return () => clearInterval(timer);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center space-y-2 h-screen content-center">
        <div className="spinner-border animate-spin w-12 h-12 border-4 border-t-blue-500 rounded-full" />
        <p>Loading {count}%</p>
      </div>
    );
};

export default Loading;
import { useQuery } from '@tanstack/react-query';
import { ActivityIcon, BookParcelIcon, DeliveryListIcon, DeliveryManIcon, ParcelIcon, ReviewIcon, UsersIcon } from '../components/icons/Icon';
import useLoadUser from './useLoadUser';
import { useEffect, useState } from 'react';

const useAllMenuItems = () => {
  const [webUser] = useLoadUser(); // Assuming this hook fetches the user data
  const [navItem, setNavItems] = useState([]);

  const menuItems = [
    {
      role: "admin",
      items: [
        { id: "home", label: "Home", icon: <ParcelIcon />, to: "/" },{ id: "statistics", label: "Statistics", icon: <ActivityIcon />, to: "statistics" },
        { id: "all-parcels", label: "All Parcels", icon: <ParcelIcon />, to: "all-parcels" },
        { id: "all-users", label: "All Users", icon: <UsersIcon />, to: "all-users" },
        { id: "all-delivery-man", label: "All Delivery Men", icon: <DeliveryManIcon />, to: "all-delivery-man" },
        
      ]
    },
    {
      role: "user",
      items: [
        { id: "home", label: "Home", icon: <ParcelIcon />, to: "/" },
        { id: "book-parcel", label: "Book Parcel", icon: <BookParcelIcon />, to: "book-parcel" },
        { id: "my-parcels", label: "My Parcels", icon: <ParcelIcon />, to: "my-parcels" },
        { id: "my-profile", label: "My Profile", icon: <UsersIcon />, to: "my-profile" },
      ]
    },
    {
      role: "delivery-man",
      items: [
        { id: "home", label: "Home", icon: <ParcelIcon />, to: "/" },
        { id: "my-delivery-list", label: "My Delivery List", icon: <DeliveryListIcon />, to: "my-delivery-list" },
        { id: "my-reviews", label: "My Reviews", icon: <ReviewIcon />, to: "my-reviews" },
      ]
    }
  ];

  let foundMenu

  if (webUser?.role) {
   foundMenu = menuItems.find((menu) => menu.role === webUser.role);   
  }

  useEffect(() => {
    setNavItems(foundMenu?.items || []); 
    
  }, [webUser?.role]); // Include webUser?.role in dependencies

  return navItem; // Return the final menu items
};

export default useAllMenuItems;

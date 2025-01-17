import MainLayout from "@/src/MainLayout/MainLayout";
import AdminDashBoard from "@/src/pages/Admin/AdminDashboard/AdminDashboard";
import AllDeliveryMen from "@/src/pages/Admin/AllDeliveryMen/AllDeliveryMen";
import AllParcels from "@/src/pages/Admin/AllParcels/AllParcels";
import AllUsers from "@/src/pages/Admin/AllUsers/AllUsers";
import Statistics from "@/src/pages/Admin/Statistics/Statistics";
import DashBoard from "@/src/pages/DashBoard/DashBoard";
import DeliveryMenDashboard from "@/src/pages/DeliveryMen/DeliveryMenDashboard/DeliveryMenDashboard";
import MyDeliveryList from "@/src/pages/DeliveryMen/MyDeliveryList/MyDeliveryList";
import MyReviews from "@/src/pages/DeliveryMen/MyReviews/MyReviews";
import HomePage from "@/src/pages/HomePage/HomePage";
import Login from "@/src/pages/Login/Login";
import NotFound from "@/src/pages/NotFound/NotFound";
import SignUp from "@/src/pages/SignUp/SignUp";
import BookParcel from "@/src/pages/Users/BookParcel/BookParcel";
import MyParcel from "@/src/pages/Users/MyParcel/MyParcel";
import MyProfile from "@/src/pages/Users/MyProfile/MyProfile";
import UserDashboard from "@/src/pages/Users/UserDashboard/UserDashboard";
import {
    createBrowserRouter,
  } from "react-router-dom";
  


  const Routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>, 
      children:[
        {
            index: true,
            element: <HomePage></HomePage>
        },
        {
            path:"/login",
            element: <Login></Login>
        },
        {
            path:"/sign-up",
            element: <SignUp></SignUp>
        },
        {
            path:"*",
            element: <NotFound></NotFound>
        }
      ]
    },{
      path:"dashboard",
      element:<DashBoard></DashBoard>,
      children:[
        {
        path:"book-parcel",
        element:<BookParcel></BookParcel>
      },{
        path:"my-parcels",
        element:<MyParcel></MyParcel>
      },{
        path:"my-profile",
        element:<MyProfile></MyProfile>
      },
        
      {
        path:"all-parcels",
        element:<AllParcels></AllParcels>
      },{
        path:"all-users",
        element:<AllUsers></AllUsers>
      },{
        path:"all-delivery-man",
        element:<AllDeliveryMen></AllDeliveryMen>
      },{
        path:"statistics",
        element:<Statistics></Statistics>
      },{
        path:"my-delivery-list",
        element:<MyDeliveryList></MyDeliveryList>
      },{
        path:"my-reviews",
        element:<MyReviews></MyReviews>
      }     
      


      ]
    }

  ]);


  export default Routes;
import MainLayout from "@/src/MainLayout/MainLayout";
import AllDeliveryMen from "@/src/pages/Admin/AllDeliveryMen/AllDeliveryMen";
import AllParcels from "@/src/pages/Admin/AllParcels/AllParcels";
import AllUsers from "@/src/pages/Admin/AllUsers/AllUsers";
import Statistics from "@/src/pages/Admin/Statistics/Statistics";
import DashBoard from "@/src/pages/DashBoard/DashBoard";
import MyDeliveryList from "@/src/pages/DeliveryMen/MyDeliveryList/MyDeliveryList";
import MyReviews from "@/src/pages/DeliveryMen/MyReviews/MyReviews";
import HomePage from "@/src/pages/HomePage/HomePage";
import Login from "@/src/pages/Login/Login";
import NotFound from "@/src/pages/NotFound/NotFound";
import SignUp from "@/src/pages/SignUp/SignUp";
import BookParcel from "@/src/pages/Users/BookParcel/BookParcel";
import MyParcel from "@/src/pages/Users/MyParcel/MyParcel";
import UpdateMyParcel from "@/src/pages/Users/MyParcel/UpdateMyParcel";
import MyProfile from "@/src/pages/Users/MyProfile/MyProfile";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <DashBoard />
      </PrivateRoutes>
    ),
    children: [
      { path: "book-parcel", element: <PrivateRoutes><BookParcel /></PrivateRoutes> },
      { path: "my-parcels", element: <PrivateRoutes><MyParcel /></PrivateRoutes> },
      { path: "my-parcels/:id", element: <PrivateRoutes><UpdateMyParcel /></PrivateRoutes> },
      { path: "my-profile", element: <PrivateRoutes><MyProfile /></PrivateRoutes> },
      { path: "all-parcels", element: <PrivateRoutes><AllParcels /></PrivateRoutes> },
      { path: "all-users", element: <PrivateRoutes><AllUsers /></PrivateRoutes> },
      { path: "all-delivery-man", element: <PrivateRoutes><AllDeliveryMen /></PrivateRoutes> },
      { path: "statistics", element: <PrivateRoutes><Statistics /></PrivateRoutes> },
      { path: "my-delivery-list", element: <PrivateRoutes><MyDeliveryList /></PrivateRoutes> },
      { path: "my-reviews", element: <PrivateRoutes><MyReviews /></PrivateRoutes> },
    ],
  }
]);

export default Routes;

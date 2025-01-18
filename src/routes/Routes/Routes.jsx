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
    element: <DashBoard />,
    children: [
      { path: "book-parcel", element: <BookParcel /> },
      { path: "my-parcels", element: <MyParcel /> },
      { path: "my-parcels/:id", element: <UpdateMyParcel /> },
      { path: "my-profile", element: <MyProfile /> },
      { path: "all-parcels", element: <AllParcels /> },
      { path: "all-users", element: <AllUsers /> },
      { path: "all-delivery-man", element: <AllDeliveryMen /> },
      { path: "statistics", element: <Statistics /> },
      { path: "my-delivery-list", element: <MyDeliveryList /> },
      { path: "my-reviews", element: <MyReviews /> },
    ],
  },
]);

export default Routes;

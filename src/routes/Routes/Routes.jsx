import MainLayout from "@/src/MainLayout/MainLayout";
import HomePage from "@/src/pages/HomePage/HomePage";
import Login from "@/src/pages/Login/Login";
import NotFound from "@/src/pages/NotFound/NotFound";
import SignUp from "@/src/pages/SignUp/SignUp";
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
    },

  ]);


  export default Routes;
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Body from "./components/Body";
import { default as Cart, default as Cart } from "./components/Cart";
import Contact from "./components/Contact";
import Dish from "./components/distributor/Dish";
import DistributorLogin from "./components/distributor/login";
import Restaurant from "./components/distributor/Restaurant";
import DistributorRegister from "./components/distributor/Signup";
import Error from "./components/Error";
import Header from "./components/Header";
import Login from "./components/Login";
import RestaurantMenu from "./components/RestaurantMenu";
import Search from "./components/Search";
import SignUp from "./components/Signup";
import AppStore from "./utils/AppStore";

const AppLayout = () => {
  return (
    <Provider store={AppStore}>
      <section>
          <ToastContainer
           style={{ marginTop: '50px' }}  />
          <Header />
          <Outlet />
      </section>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/distributor/register",
        element: <DistributorRegister />,
      },
      {
        path: "/distributor/login",
        element: <DistributorLogin />,
      },
      {
        path: "/user/signup",
        element: <SignUp />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/distributor/restaurant",
        element: <Restaurant/>
      },
      {
        path: "/distributor/restaurant-dish/:resId",
        element: <Dish/>
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

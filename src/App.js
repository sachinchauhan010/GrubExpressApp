import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Search from "./components/Search";
import { Contact } from "./images/SvgIcon";
import Login from "./components/Login";
import Cart from "./components/Cart";
import { Outlet } from "react-router-dom";
import Error from "./components/Error";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import { Provider } from "react-redux";
import AppStore from "./utils/AppStore";
import Cart from "./components/Cart";
import SignUp from "./components/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DistributorRegister from "./components/distributor/Signup";
import DistributorLogin from "./components/distributor/login";
import Restaurant from "./components/distributor/Restaurant"
const AppLayout = () => {
  return (
    <Provider store={AppStore}>
      <section>
          <ToastContainer />
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
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

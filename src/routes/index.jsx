import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/Landing/Landing";
// import RegisterOwner from "../pages/owners-register/RegisterOwners";
// import RegisterCustomer from "../pages/customer-register/RegisterCustomer";
import CustomerDashboard from "../pages/customer-dashboard/CustomerDashboard";
import LocationFetcher from "../pages/location/LocationFetcher";
// import Home from "../pages/login/Login";
// import Dashboard from "../pages/dashboard/Dashboard";
import Ulogin from "../pages/Ulogin";
import Layout from "../components/Layout";
import MapPage from "../pages/customer-dashboard/Map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Ulogin />,
  },
  {
    path: "/location",
    element: <LocationFetcher />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <LocationFetcher />,
      },
      {
        path:"facilities",
        element: <MapPage />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>Page not found</h1>,
    status: 404,
    fallback: true, // This will render the page when no other route matches. 404 is the status code for page not found.
  },
]);

export default router;

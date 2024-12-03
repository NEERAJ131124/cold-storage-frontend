import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/Landing/Landing";
import RegisterOwner from "../pages/owners-register/RegisterOwners";
import RegisterCustomer from "../pages/customer-register/RegisterCustomer";
import CustomerDashboard from "../pages/customer-dashboard/CustomerDashboard";
import LocationFetcher from "../pages/location/LocationFetcher";
import Home from "../pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register-owner",
    element: <RegisterOwner />,
  },
  {
    path: "/register-customer",
    element: <RegisterCustomer />,
  },
  {
    path: "/location",
    element: <LocationFetcher />,
  },
  // customer dashbaord
  {
    path: "/customer-dashboard",
    element: <CustomerDashboard />,
  },
  {
    path:"/home",
    element:<Home/>
  },
  {
    path: "*",
    element: <h1>Page not found</h1>,
    status: 404,
    fallback: true, // This will render the page when no other route matches. 404 is the status code for page not found.
  },
]);

export default router;

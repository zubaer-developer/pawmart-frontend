import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import ListingDetails from "../pages/ListingDetails";
import CategoryPage from "../pages/CategoryPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

// Dashboard Pages
import DashboardOverview from "../pages/dashboard/DashboardOverview";
import AddListing from "../pages/dashboard/AddListing";
import MyListings from "../pages/dashboard/MyListings";
import UpdateListing from "../pages/dashboard/UpdateListing";
import MyOrders from "../pages/dashboard/MyOrders";
import Profile from "../pages/dashboard/Profile";

// Admin Pages
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageListings from "../pages/dashboard/admin/ManageListings";
import ManageOrders from "../pages/dashboard/admin/ManageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/pets-and-supplies",
        element: <PetsAndSupplies />,
      },
      {
        path: "/listing/:id",
        element: <ListingDetails />,
      },
      {
        path: "/category/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: "add-listing",
        element: <AddListing />,
      },
      {
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "update-listing/:id",
        element: <UpdateListing />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // Admin Routes
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-listings",
        element: (
          <AdminRoute>
            <ManageListings />
          </AdminRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <AdminRoute>
            <ManageOrders />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

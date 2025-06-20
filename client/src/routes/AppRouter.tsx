import ForgotPassword from "@/auth/ForgotPassword";
import { AdminRoute, AuthenticatedRoute, ProtectedRoute } from "./RouteGuards";
import ResetPassword from "@/auth/ResetPassword";
import VerifyEmail from "@/auth/VerifyEmail";
import Signup from "@/auth/Signup";
import Login from "@/auth/Login";
import Orders from "@/admin/Orders";
import AddMenu from "@/admin/AddMenu";
import Resturant from "@/admin/Resturant";
import OrderSuccess from "@/components/OrderSuccess";
import Cart from "@/components/Cart";
import ResturantDetails from "@/components/ResturantDetails";
import SearchPage from "@/components/SearchPage";
import Profile from "@/components/pages/Profile";
import HeroSection from "@/components/pages/HeroSection";
import MainLayout from "@/layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/resturant/:id",
        element: <ResturantDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <OrderSuccess />,
      },
      // admin
      {
        path: "/admin/restaurant",
        element: (
          <AdminRoute>
            <Resturant />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRoute>
            <AddMenu />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoute>
            {" "}
            <Orders />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenticatedRoute>
        <Login />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenticatedRoute>
        <Signup />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenticatedRoute>
        <ForgotPassword />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: (
      <AuthenticatedRoute>
        <VerifyEmail />
      </AuthenticatedRoute>
    ),
  },
]);

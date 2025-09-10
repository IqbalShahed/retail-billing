import React, { useContext } from "react";
import Navbar from "./componants/Navbar";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import ManageCategories from "./pages/ManageCategories";
import ManageItems from "./pages/ManageItems";
import ManageUsers from "./pages/ManageUsers";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import OrderHistory from "./pages/OrderHistory";
import { AppContext } from "./context/AppContext";
import NotFound from "./pages/NotFound";

const App = () => {
  const location = useLocation();
  const { auth } = useContext(AppContext);

  const LoginRoute = ({ element }) => {
    if (auth.token) {
      return <Navigate to="/" replace />
    }
    return element;
  }

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!auth.token) {
      return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/" replace />
    }
    return element;
  }
  return (
    <div className="px-4 sm:px-[5%] md:px-[7%] lg:px-[9%]">
      {
        location.pathname !== "/login" && auth.token &&
        <div>
          <Navbar />
          <hr className="border border-gray-300" />
        </div>
      }
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} allowedRoles={["ROLE_ADMIN", "ROLE_USER"]} />} />
        <Route path="/login" element={<LoginRoute element={<Login />} />} />
        <Route path="/explore" element={<ProtectedRoute element={<Explore />} allowedRoles={["ROLE_ADMIN", "ROLE_USER"]} />} />
        {/**Admin Only */}
        <Route path="/manage-items" element={<ProtectedRoute element={<ManageItems />} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/manage-categories" element={<ProtectedRoute element={<ManageCategories />} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/manage-users" element={<ProtectedRoute element={<ManageUsers />} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/orders-history" element={<ProtectedRoute element={<OrderHistory />} allowedRoles={["ROLE_ADMIN", "ROlE_USER"]} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
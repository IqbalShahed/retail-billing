import React from "react";
import Navbar from "./componants/Navbar";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import ManageCategories from "./pages/ManageCategories";
import ManageItems from "./pages/ManageItems";
import ManageUsers from "./pages/ManageUsers";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="px-4 sm:px-[5%] md:px-[7%] lg:px-[9%]">
      <ToastContainer />
      <Navbar />
      <hr className="border border-gray-300" />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/manage-items" element={<ManageItems />} />
        <Route path="/manage-categories" element={<ManageCategories />} />
        <Route path="/manage-users" element={<ManageUsers />} />
      </Routes>
    </div>
  )
}

export default App;
import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProducts from "../../Components/ListProducts/ListProducts";
import ManageReviews from "../../Components/ManageReviews/ManageReviews";
import ManageRatings from "../../Components/ManageRatings/ManageRatings";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProducts />} />
        <Route path="/reviews" element={<ManageReviews />} />
        <Route path="/ratings" element={<ManageRatings />} />
      </Routes>
    </div>
  );
};

export default Admin;

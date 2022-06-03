import { Routes, Route } from "react-router-dom";
import Employees from "./Employees";
import Form from "./Form";
import React from "react";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/employees" element={<Employees />} />
    </Routes>
  );
};

export default Router;

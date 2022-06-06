import React from "react";
import FormContainer from "./FormContainer";
import { Routes, Route } from "react-router-dom";
import EmployeesContainer from "./EmployeesContainer";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<FormContainer />} />
      <Route path="/employees" element={<EmployeesContainer />} />
    </Routes>
  );
};

export default Router;

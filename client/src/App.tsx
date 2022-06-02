import { Routes, Route, Link } from "react-router-dom";
import Employees from "./components/Employees";
import Form from "./components/Form";
import React from "react";

export default function App() {
  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center mt-3">
        <span className="text-3xl">Employees Management</span>
        <nav className="flex items-center">
          <Link className="p-3 text-lg rounded-lg bg-slate-300 mr-3" to="/">
            Add employee
          </Link>
          <Link className="p-3 text-lg rounded-lg bg-slate-300" to="/employees">
            Employees
          </Link>
        </nav>
      </header>
      <main className="mt-20 w-6/12 mx-auto">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </main>
    </div>
  );
}

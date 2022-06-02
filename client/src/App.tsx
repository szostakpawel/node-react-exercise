import { Routes, Route } from "react-router-dom";
import Employees from "./pages/Employees";
import Homepage from "./pages/Homepage";
import React from "react";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">header</header>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="employees" element={<Employees />} />
      </Routes>
      <footer>footer</footer>
    </div>
  );
}

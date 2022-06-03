import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
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
  );
};

export default Header;

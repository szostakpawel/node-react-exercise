import EmployeeCard from "../components/EmployeeCard";
import { IEmployeesProps } from "../types";
import Loader from "./Loader";
import React from "react";

export default function Employees({
  loading,
  employees,
  handleDeleteEmployee,
}: IEmployeesProps) {
  return (
    <div>
      <span className="text-2xl">Registered employees</span>
      {loading && <Loader />}
      <div className="grid mt-2 grid-cols-2 gap-2">
        {employees.length ? (
          employees.map(employee => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              deleteEmployee={handleDeleteEmployee}
            />
          ))
        ) : (
          <p>No employees registered yet</p>
        )}
      </div>
    </div>
  );
}

import EmployeeCard from "../components/EmployeeCard";
import React, { useEffect, useState } from "react";
import { deleteEmployee, getEmployees } from "../services";
import { EmployeeI } from "../types";
import Loader from "./Loader";

export default function Employees() {
  const [employees, setEmployees] = useState<Array<EmployeeI>>([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees().catch(error => console.error(error)); // use try catch
  }, []);

  const handleDeleteEmployee = async (id: string): Promise<void> => {
    setLoading(true);
    const deleted = await deleteEmployee(id);
    if (deleted) {
      await fetchEmployees();
    } else {
      alert("Something went wrong :c");
    }
    setLoading(false);
  };

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

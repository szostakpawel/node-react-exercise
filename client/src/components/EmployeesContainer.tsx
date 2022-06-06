import React, { useEffect, useState } from "react";
import { deleteEmployee, getEmployees } from "../services";
import { IEmployee } from "../types";
import Employees from "./Employees";

export default function EmployeesContainer() {
  const [employees, setEmployees] = useState<Array<IEmployee>>([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
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
    <Employees
      loading={loading}
      employees={employees}
      handleDeleteEmployee={handleDeleteEmployee}
    />
  );
}

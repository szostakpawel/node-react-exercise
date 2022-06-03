import React from "react";
import { EmployeeI } from "../types";

interface Props { // rename it to EmployeeCardProps
  employee: EmployeeI; // IEmployee
  deleteEmployee: (id: string) => Promise<void>;
}

export default function EmployeeCard({ employee, deleteEmployee }: Props) {
  return (
    <div className="border-2 border-slate-300 rounded-md p-4">
      <span className="block text-lg"> // use like a component (copy paste)
        <span className="font-medium">Name: </span>
        {employee.name}
      </span>
      <span className="block text-lg"> // use like a component (copy paste)
        <span className="font-medium">Last name: </span>
        {employee.lastName}
      </span>
      <span className="block text-lg"> // use like a component (copy paste)
        <span className="font-medium">Occupation: </span>
        {employee.occupation}
      </span>
      {/* <span>{employee.id}</span> */}
      <button
        className="py-1 px-2 rounded-lg mt-2 bg-red-200"
        onClick={() => deleteEmployee(employee?.id || "")} // don't use empty || ""
      >
        Delete
      </button>
    </div>
  );
}

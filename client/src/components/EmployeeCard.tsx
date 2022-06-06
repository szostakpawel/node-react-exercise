import React from "react";
import CardTextField from "./CardTextField";
import { IEmployeeCardProps } from "../types";

export default function EmployeeCard({
  employee,
  deleteEmployee,
}: IEmployeeCardProps) {
  return (
    <div className="border-2 border-slate-300 rounded-md p-4">
      <CardTextField title="Name" value={employee.name} />
      <CardTextField title="Last name" value={employee.lastName} />
      <CardTextField title="Occupation" value={employee.occupation} />
      <CardTextField title="Age" value={employee.age} />
      <button
        className="py-1 px-2 rounded-lg mt-2 bg-red-200"
        onClick={() => deleteEmployee(employee?.id || "")}
      >
        Delete
      </button>
    </div>
  );
}

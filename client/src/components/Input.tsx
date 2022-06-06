import React from "react";
import { IInputProps } from "../types";

export default function Input({ type, label, value, onChange }: IInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label}*</label>
      <input
        id={label}
        type={type}
        value={value}
        className="border-2 border-slate-300 rounded py-2 px-3"
        onChange={onChange}
      />
    </div>
  );
}

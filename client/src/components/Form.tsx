import React from "react";
import Input from "./Input";
import { IFormProps } from "../types";

export default function Form({ data, submit }: IFormProps) {
  return (
    <div>
      <span className="text-2xl mb-2 block">Add new employee</span>
      <form
        className="grid gap-3 grid-cols-2 grid-rows-3 max-w-2xl"
        onSubmit={submit}
      >
        {data.map((item, idx) => (
          <Input
            key={idx}
            type={item.type}
            label={item.label}
            value={item.value}
            onChange={item.onChange}
          />
        ))}
        <button
          className="py-2 px-6 text-lg w-fit h-fit bg-slate-300 rounded-2xl"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

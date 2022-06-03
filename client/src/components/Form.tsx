import React, { FormEvent, useState } from "react";
import { InputChangeEvent } from "../types";
import { addEmployee } from "../services";
import Input from "./Input";

export default function Form() {
  const [age, setAge] = useState(16);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleSetName = ({ target }: InputChangeEvent) => setName(target.value);
  const handleSetLastName = ({ target }: InputChangeEvent) =>
    setLastName(target.value);
  const handleSetOccupation = ({ target }: InputChangeEvent) =>
    setOccupation(target.value);
  const handleSetAge = ({ target }: InputChangeEvent) =>
    setAge(Number(target.value) || 0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (age > 0 && name.length && lastName.length && occupation.length) {
      const added = await addEmployee({ name, lastName, occupation, age });
      alert(
        added ? "Employee has been added!" : "Something went wrong, try again."
      );
    } else {
      alert("Something is missing or filled incorrectly :c");
    }
    setAge(16);
    setName("");
    setLastName("");
    setOccupation("");
  };

  return (
    <div>
      <span className="text-2xl mb-2 block">Add new employee</span>
      <form
        className="grid gap-3 grid-cols-2 grid-rows-3 max-w-2xl"
        onSubmit={handleSubmit}
      >
        <Input label="Name" type="text" value={name} onChange={handleSetName} />
        <Input
          type="text"
          label="Last name"
          value={lastName}
          onChange={handleSetLastName}
        />
        <Input
          label="Occupation"
          type="text"
          value={occupation}
          onChange={handleSetOccupation}
        />
        <Input label="Age" type="number" value={age} onChange={handleSetAge} />
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

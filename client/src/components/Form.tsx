import React, { ChangeEvent, FormEvent, useState } from "react";
import { addEmployee } from "../services";
import { SetterT, InputPropsI } from "../types";

export default function Form() {
  const [age, setAge] = useState(16);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");

  const handleTextInputChange = (
    setter: SetterT,
    { target }: ChangeEvent<HTMLInputElement>
  ) => {
    // !FIXME
    // Don't know why setter below makes React.SetStateAction<string> & React.SetStateAction<number>
    // when setter parameter is typed as React.SetStateAction<string> | React.SetStateAction<number>
    // Typescript complains but everything works correctly
    // @ts-ignore
    setter(target.value);
  };

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
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={handleTextInputChange}
          setter={setName}
        />
        <Input
          type="text"
          label="Last name"
          value={lastName}
          onChange={handleTextInputChange}
          setter={setLastName}
        />

        <Input
          label="Occupation"
          type="text"
          value={occupation}
          onChange={handleTextInputChange}
          setter={setOccupation}
        />
        <Input
          label="Age"
          type="number"
          value={age}
          onChange={handleTextInputChange}
          setter={setAge}
        />
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

function Input({ type, label, value, onChange, setter }: InputPropsI) {
  return (
    <div className="flex flex-col">
      <label>{label}*</label>
      <input
        type={type}
        value={value}
        className="border-2 border-slate-300 rounded py-2 px-3"
        onChange={event => onChange(setter, event)}
      />
    </div>
  );
}

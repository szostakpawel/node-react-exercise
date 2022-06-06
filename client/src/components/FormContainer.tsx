import React, { useState, FormEvent } from "react";
import { addEmployee } from "../services";
import { InputChangeEvent } from "../types";
import Form from "./Form";

export default function FormContainer() {
  const [age, setAge] = useState(16);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");

  const formData = [
    {
      value: name,
      type: "text",
      label: "Name",
      onChange: ({ target }: InputChangeEvent) => setName(target.value),
    },
    {
      type: "text",
      value: lastName,
      label: "Last name",
      onChange: ({ target }: InputChangeEvent) => setLastName(target.value),
    },
    {
      type: "text",
      value: occupation,
      label: "Occupation",
      onChange: ({ target }: InputChangeEvent) => setOccupation(target.value),
    },
    {
      value: age,
      label: "Age",
      type: "number",
      onChange: ({ target }: InputChangeEvent) => setAge(Number(target.value)),
    },
  ];

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

  return <Form data={formData} submit={handleSubmit} />;
}

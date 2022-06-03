import { ChangeEvent } from "react";

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export interface IInputProps {
  type: string;
  label: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IEmployee {
  age: number;
  id?: string;
  name: string;
  lastName: string;
  occupation: string;
}

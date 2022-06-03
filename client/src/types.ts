import { ChangeEvent, SetStateAction } from "react";

export type NumberSetterT = (value: SetStateAction<number>) => void;
export type StringSetterT = (value: SetStateAction<string>) => void;

export type SetterT = StringSetterT | NumberSetterT;

export interface IInputProps {
  type: string;
  label: string;
  setter: SetterT;
  value: string | number;
  onChange: (setter: SetterT, event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IEmployee {
  age: number;
  id?: string;
  name: string;
  lastName: string;
  occupation: string;
}

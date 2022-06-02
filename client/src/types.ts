import { ChangeEvent, SetStateAction } from "react";

export type NumberSetterT = (value: SetStateAction<number>) => void;
export type StringSetterT = (value: SetStateAction<string>) => void;

export type SetterT = StringSetterT | NumberSetterT;

export interface InputPropsI {
  type: string;
  label: string;
  setter: SetterT;
  value: string | number;
  onChange: (setter: SetterT, event: ChangeEvent<HTMLInputElement>) => void;
}

export interface EmployeeI {
  age: number;
  name: string;
  lastName: string;
  occupation: string;
}

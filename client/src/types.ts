import { ChangeEvent, FormEvent } from "react";

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

// Components props

export interface IEmployeeCardProps {
  employee: IEmployee;
  deleteEmployee: (id: string) => Promise<void>;
}

export interface ICardSpanProps {
  title: string;
  value: string | number;
}

export interface IFormProps {
  submit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  data: Array<{
    type: string;
    label: string;
    value: string | number;
    onChange: ({ target }: InputChangeEvent) => void;
  }>;
}

export interface IEmployeesProps {
  loading: boolean;
  employees: Array<IEmployee>;
  handleDeleteEmployee: (id: string) => Promise<void>;
}

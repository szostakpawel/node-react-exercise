import { IEmployee } from "./types";

const OK_STATUS_CODE = 200;
const url = "http://localhost:3000/api";

export const addEmployee = async (employee: IEmployee): Promise<boolean> => {
  try {
    const { status } = await fetch(`${url}/employee`, {
      method: "POST",
      body: JSON.stringify(employee),
    });
    if (status === OK_STATUS_CODE) {
      return true;
    } else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getEmployees = async (): Promise<Array<IEmployee>> => {
  const response = await fetch(`${url}/employees`);
  const data = await response.json();
  return data;
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  try {
    const { status } = await fetch(`${url}/employee?id=${id}`, {
      method: "DELETE",
    });
    if (status === OK_STATUS_CODE) {
      return true;
    } else return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

import { IEmployee } from "./types";

const url = "http://localhost:3000/api";

export const addEmployee = async (employee: IEmployee): Promise<boolean> => {
  let added = false;
  try {
    const { statusText } = await fetch(`${url}/add-employee`, {
      method: "POST",
      body: JSON.stringify(employee),
    });
    if (statusText === "OK") added = true;
  } catch (error) {
    console.error(error);
  }
  return added;
};

export const getEmployees = async (): Promise<Array<IEmployee>> => {
  return await (await fetch(`${url}/employees`)).json();
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  let deleted = false;
  try {
    const { statusText } = await fetch(`${url}/delete-employee?id=${id}`, {
      method: "DELETE",
    });
    if (statusText === "OK") deleted = true;
  } catch (error) {
    console.error(error);
  }
  return deleted;
};

import * as fs from "fs";
import * as url from "url";
import * as http from "http";
import * as uuid from "uuid";
import { IEmployee } from "./types";
import { readdir, readFile, unlink, writeFile } from "node:fs/promises";

const uploadDir = `${__dirname}/../upload/`;
const HOST = "localhost";
const PORT = 3500;

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const ENDPOINTS = {
  employee: "/api/employee",
  employees: "/api/employees",
};

const validateEmployeeObject = (obj: IEmployee): boolean => {
  return !!obj?.name && !!obj?.lastName && !!obj?.occupation && !!obj?.age;
};

const parseAllFiles = async (): Promise<Array<IEmployee>> => {
  const data: Array<IEmployee> = [];
  const files = await readdir(uploadDir);
  for (const file of files) {
    const buffer = await readFile(`${uploadDir}/${file}`);
    const content = JSON.parse(buffer.toString());
    data.push(content);
  }
  return data;
};

const deleteEmployee = async (id: string): Promise<string | null> => {
  try {
    await unlink(`${uploadDir}${id}.json`);
    return id;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};

const addEmployee = async (
  content: Required<IEmployee>
): Promise<string | null> => {
  const { id } = content;
  const stringify = JSON.stringify(content);
  try {
    await writeFile(`${uploadDir}${id}.json`, stringify);
    return id;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};

const requestListenner = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const { url: endpoint, method } = req;

  switch (endpoint) {
    case ENDPOINTS.employees:
      try {
        const files = await parseAllFiles();
        const stringify = JSON.stringify(files);
        res.end(stringify);
      } catch (error) {
        res.writeHead(500);
        res.end("An error occured when parsing files.");
      }
      break;
    case ENDPOINTS.employee:
      if (method === "POST") {
        const body: Array<Uint8Array> = [];
        req
          .on("error", (error: Error) => {
            console.error(error.message);
          })
          .on("data", (chunk: Uint8Array) => {
            body.push(chunk);
          })
          .on("end", async () => {
            const concatBody = Buffer.concat(body).toString();
            let parsedData: IEmployee = JSON.parse(concatBody);
            const isDataValid = validateEmployeeObject(parsedData);
            if (isDataValid) {
              if (!parsedData?.id) {
                parsedData.id = uuid.v1();
              }
              try {
                const response = await addEmployee(
                  parsedData as Required<IEmployee>
                );
                res.end(response);
              } catch (error) {
                res.writeHead(500);
                res.end("Sorry, could not save employee.");
              }
            } else {
              res.writeHead(400);
              res.end("Something is missing in sent data.");
            }
          });
      } else if (method === "DELETE") {
        const query = url.parse(endpoint, true).query;
        if (query?.id && !Array.isArray(query.id)) {
          try {
            const response = await deleteEmployee(query.id);
            res.end(response);
          } catch (error) {
            res.writeHead(500);
            res.end("An error occured when adding the employee.");
          }
        } else {
          res.writeHead(400);
          res.end("The query must contain exactly one id.");
        }
      } else {
        res.writeHead(405);
        res.end("Method is not allowed.");
      }
      break;
  }
};

const server = http.createServer(requestListenner);

server.listen(PORT, HOST, () => {
  console.log("Server is running on port " + PORT);
});

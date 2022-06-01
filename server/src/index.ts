import * as fs from "fs";
import * as url from "url";
import * as http from "http";
import * as uuid from "uuid";
import { EmployeeI } from "./types";

const uploadDir = `${__dirname}/../upload/`;
const HOST = "localhost";
const PORT = 3500;

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const ENDPOINTS = {
  deleteFile: "/delete-file",
  saveFile: "/save-file",
  getFiles: "/files",
};

const validateEmployeeObject = (obj: EmployeeI): boolean => {
  return !!obj?.name && !!obj?.lastName && !!obj?.occupation && !!obj?.age;
};

const getAllFiles = (): Array<EmployeeI> => {
  const data: Array<EmployeeI> = [];
  fs.readdirSync(uploadDir).forEach(file => {
    const content = fs.readFileSync(`${uploadDir}${file}`);
    data.push(JSON.parse(content.toString()) as EmployeeI);
  });
  return data;
};

const deleteFile = (fileName: string): boolean => {
  let deleted = false;
  try {
    fs.unlinkSync(`${uploadDir}${fileName}`);
    deleted = true;
  } catch (error: unknown) {
    console.error(error);
  }
  return deleted;
};

const saveFile = (fileName: string, content: string): boolean => {
  let saved = false;
  try {
    fs.writeFileSync(`${uploadDir}${fileName}`, content);
    saved = true;
  } catch (error: unknown) {
    console.error(error);
  }
  return saved;
};

const requestListenner = (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const { url: endpoint, method } = req;
  if (method === "POST" && endpoint?.startsWith(ENDPOINTS.saveFile)) {
    const body: Array<Uint8Array> = [];
    req
      .on("error", (error: Error) => console.error(error.message))
      .on("data", (chunk: Uint8Array) => body.push(chunk))
      .on("end", () => {
        let parsedData: EmployeeI = JSON.parse(Buffer.concat(body).toString());
        const isDataValid = validateEmployeeObject(parsedData);
        if (isDataValid) {
          if (!parsedData?.id) parsedData.id = uuid.v1();
          const json = JSON.stringify(parsedData);
          const savedSuccessfully = saveFile(`${parsedData.id}.json`, json);
          res.end(savedSuccessfully ? json : "Sorry, could not save data.");
        } else {
          res.end("Something is missing in sent data.");
        }
      });
  } else if (
    method === "DELETE" &&
    endpoint?.startsWith(ENDPOINTS.deleteFile)
  ) {
    const query = url.parse(endpoint, true).query;
    if (query?.id) {
      const deletedSuccessfully = deleteFile(`${query.id}.json`);
      res.end(deletedSuccessfully ? query.id : "Sorry, could not delete data.");
    } else {
      res.end("ID of employee is required to delete its data.");
    }
  } else if (method === "GET" && endpoint?.startsWith(ENDPOINTS.getFiles)) {
    const files = getAllFiles();
    res.end(JSON.stringify(files));
  }
};

const server = http.createServer(requestListenner);

server.listen(PORT, HOST, () => {
  console.log("Server is running on port " + PORT);
});

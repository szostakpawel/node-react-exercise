import * as fs from "fs";
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
  saveFile: "/save-file",
  getFiles: "/files",
  getFile: "/file",
};

const validateEmployeeObject = (obj: EmployeeI): boolean => {
  return !!obj?.name && !!obj?.lastName && !!obj?.occupation && !!obj?.age;
};

const saveFile = (fileName: string, content: string): boolean => {
  let saved = false;
  try {
    fs.writeFileSync(`${uploadDir}${fileName}.json`, content);
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
  const { url, method } = req;
  if (method === "POST" && url === ENDPOINTS.saveFile) {
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
          const savedSuccessfully = saveFile(parsedData.id, json);
          res.end(
            savedSuccessfully ? json : "Sorry, could not save your data."
          );
        } else {
          res.end("Something is missing in sent data.");
        }
      });
  }
};

const server = http.createServer(requestListenner);

server.listen(PORT, HOST, () => {
  console.log("Server is running on port " + PORT);
});

import fs from "fs";
import axios from "axios";
import {
  transformToFilePath,
  transformAxiosResponse,
} from "../utils/transforms";
import { Status } from "../constants";
import { GetSelectedEnvironment } from "./environment";
import { GetSelectedStatus } from "./status";

require("ssl-root-cas").inject();
const mocksFile = "storage/mocks.json";

export const GetMockFolders = () => {
  const folders = fs.readdirSync("mocks");
  return folders ? folders : [];
};

export const CreateMockFolder = (name) => {
  return new Promise((resolve) => {
    fs.mkdir("mocks/" + name, () => {
      resolve();
    });
  });
};

export const GetMockSelected = () => {
  const jsonFile = fs.readFileSync(mocksFile);
  const mocks = JSON.parse(jsonFile);
  return mocks.selected;
};

export const SelectMock = (option) => {
  const jsonFile = fs.readFileSync(mocksFile);
  const mocks = JSON.parse(jsonFile);
  mocks.selected = option;
  const mocksInput = JSON.stringify(mocks);

  return new Promise((resolve) => {
    fs.writeFile(mocksFile, mocksInput, () => {
      resolve();
    });
  });
};

export const GetMockOrService = (req) => {
  const selectedStatus = GetSelectedStatus();

  return new Promise((resolve, reject) => {
    const mockFolder = GetMockSelected();
    const servicePath = req.originalUrl;
    const mockPath =
      "mocks/" +
      mockFolder +
      "/" +
      req.method +
      "-" +
      transformToFilePath(servicePath) +
      ".json";
    let jsonResponse = {};

    fs.readFile(mockPath, (error, data) => {
      if (data && selectedStatus === Status.RUNNING) {
        const jsonString = data.toString("utf8");
        jsonResponse = JSON.parse(jsonString ?? "");
        resolve(jsonResponse);
      } else {
        const environment = GetSelectedEnvironment();
        const reqHeaders = { ...req.headers };
        delete reqHeaders.host;
        delete reqHeaders["accept-encoding"];

        axios({
          method: req.method,
          timeout: 1000,
          baseURL: environment.address,
          url: servicePath,
          data: req.body,
          headers: { ...reqHeaders },
        })
          .then((result) => {
            const finalResult = transformAxiosResponse(result);

            if (selectedStatus !== Status.RUNNING) {
              return resolve(finalResult);
            }

            fs.writeFile(mockPath, JSON.stringify(finalResult), (err) => {
              if (err) {
                reject({ error: "Cannot create success mock file" });
              }
              resolve(finalResult);
            });
          })
          .catch((error) => {
            const result = error.response;
            const finalResult = transformAxiosResponse(result);

            if (selectedStatus !== Status.RUNNING) {
              return resolve(finalResult);
            }

            fs.writeFile(mockPath, JSON.stringify(finalResult), (err) => {
              if (err) {
                reject({ error: "Cannot create error mock file" });
              }
              reject(finalResult);
            });
          });
      }
    });
  });
};

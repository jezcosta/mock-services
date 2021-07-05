import fs from "fs";
const statusFile = "storage/status.json";

export const GetSelectedStatus = () => {
  const jsonFile = fs.readFileSync(statusFile);
  const status = JSON.parse(jsonFile);
  return status.selected;
};

export const SelectStatus = (newStatus) => {
  const jsonFile = fs.readFileSync(statusFile);
  const status = JSON.parse(jsonFile);
  status.selected = newStatus;
  const statusInput = JSON.stringify(status);

  return new Promise((resolve) => {
    fs.writeFile(statusFile, statusInput, () => {
      resolve();
    });
  });
};

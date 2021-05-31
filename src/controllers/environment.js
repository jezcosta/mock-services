import fs from 'fs';
const environmentsFile = 'storage/environments.json';

export const GetEnvironments = () => {
    const jsonFile = fs.readFileSync(environmentsFile);
    const environments = JSON.parse(jsonFile);
    return environments;
}

export const SelectEnvironment = (index) => {
    const jsonFile = fs.readFileSync(environmentsFile);
    const environments = JSON.parse(jsonFile);
    environments.selected = index;
    const environmentsInput = JSON.stringify(environments);

    return new Promise((resolve, reject) => {
        fs.writeFile(environmentsFile, environmentsInput, () => {
            resolve();
        });
    });
}

export const DeleteEnvironment = (index) => {
    const jsonFile = fs.readFileSync(environmentsFile);
    const environments = JSON.parse(jsonFile);
    environments.options?.splice(index, 1);
    environments.selected = 0;
    const environmentsInput = JSON.stringify(environments);

    return new Promise((resolve, reject) => {
        fs.writeFile(environmentsFile, environmentsInput, () => {
            resolve();
        });
    });
}

export const CreateEnvironment = (name, address) => {
    const jsonFile = fs.readFileSync(environmentsFile);
    const environments = JSON.parse(jsonFile);
    const newEnvironment = {
        name,
        address
    }
    environments.options.push(newEnvironment);
    const environmentsInput = JSON.stringify(environments);

    return new Promise((resolve, reject) => {
        fs.writeFile(environmentsFile, environmentsInput, () => {
            resolve();
        });
    });
}
   
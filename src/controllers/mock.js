import fs from 'fs';
const mocksFile = 'storage/mocks.json';

export const GetMockFolders = () => {
    const folders = fs.readdirSync('mocks');
    return folders ? folders : [];
}

export const CreateMockFolder = (name) => {
    return new Promise((resolve, reject) => {
        fs.mkdir('mocks/' + name,() => {
            resolve();
        });
    });
}

export const GetMockSelected = () => {
    const jsonFile = fs.readFileSync(mocksFile);
    const mocks = JSON.parse(jsonFile);
    return mocks.selected;
}

export const SelectMock = (option) => {
    const jsonFile = fs.readFileSync(mocksFile);
    const mocks = JSON.parse(jsonFile);
    mocks.selected = option;
    const mocksInput = JSON.stringify(mocks);

    return new Promise((resolve, reject) => {
        fs.writeFile(mocksFile, mocksInput, () => {
            resolve();
        });
    });
}
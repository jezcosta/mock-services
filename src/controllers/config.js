import fs from 'fs';

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
   
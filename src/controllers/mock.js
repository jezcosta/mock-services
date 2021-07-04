import fs from 'fs';
import { transformToFilePath } from '../utils/transforms';
import { GetSelectedEnvironment } from './environment';
import axios from 'axios';

require('ssl-root-cas')
    .inject();
const mocksFile = 'storage/mocks.json';

export const GetMockFolders = () => {
    const folders = fs.readdirSync('mocks');
    return folders ? folders : [];
}

export const CreateMockFolder = (name) => {
    return new Promise((resolve, reject) => {
        fs.mkdir('mocks/' + name, () => {
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

export const GetMockOrService = (req) => {
    return new Promise((resolve, reject) => {
        const mockFolder = GetMockSelected();
        const servicePath = req.originalUrl;
        const mockPath = 'mocks/' + mockFolder + '/' + req.method + '-' + transformToFilePath(servicePath) + '.json'
        let jsonResponse = {};

        fs.readFile(mockPath, (error, data) => {
            if (data) {
                const jsonString = data.toString('utf8');
                jsonResponse = JSON.parse(jsonString ?? '');
                resolve(jsonResponse);
            } else {
                const environment = GetSelectedEnvironment();
                const reqHeaders = { ...req.headers };
                delete reqHeaders.host;
                delete reqHeaders['accept-encoding'];

                axios({
                    method: req.method,
                    timeout: 1000,
                    url: environment.address + servicePath,
                    data: req.body,
                    headers: { ...reqHeaders },
                }).then((result) => {
                    const headers = result.headers;
                    delete headers['transfer-encoding'];

                    const finalResult = {
                        headers,
                        status: result.status,
                        statusText: result.statusText,
                        data: result.data
                    }

                    fs.writeFile(mockPath, JSON.stringify(finalResult), (err) => {
                        if (err) {
                            reject({ error: 'Cannot create success mock file' });
                        }
                        resolve(finalResult);
                    });
                }).catch((error) => {
                    const result = error.response;
                    const headers = result ? result.headers : {};
                    delete headers['transfer-encoding'];

                    const finalResult = {
                        headers,
                        status: result ? result.status : 500,
                        statusText: result ? result.statusText : 'Timeout',
                        data: result ? result.data : { error: 'Timeout' }
                    }

                    fs.writeFile(mockPath, JSON.stringify(finalResult), (err) => {
                        if (err) {
                            reject({ error: 'Cannot create error mock file' });
                        }
                        reject(finalResult);
                    });
                });
            }
        });
    });
}
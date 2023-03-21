# mock-services

This application allows you to make real calls and save the return of those calls for future use.

## Table of Contents

- [Running](#running)
  - [Connecting to your application](#connecting-to-your-application)
  - [Creating a new mock collection](#creating-a-new-mock-collection)
  - [Setting up environments](#setting-up-environments)
  - [Status](#status)

## Running

1. Run: `$ npm i`
2. Run: `$ npm run start`
3. The default port of server is `3030`, so the application will run in http://localhost:3030
4. To access the mock config, open http://localhost:3030/mock-services/configs in your browser

\*If you receive a `Can't find Python executable "python", you can set the PYTHON env variable` in installation error, [please install the last version of python](https://www.python.org/downloads/) and try the above steps again.

### Connecting to your application

To use it, just set the baseURL of your project requests to the address where this application is running (default is http://localhost:3030)

### Creating a new mock collection

To create a new mock collection to save the responses, just fill the field 'Create New Mock' with your collection name and click in insert.

![New Mock](https://i.imgur.com/TyknGRw.png)

When you click in insert, the application will create a folder with the collection name for save the `.json` files with the responses in `mocks` folder.

![Mocks folder](https://i.imgur.com/5wKX2Lw.png)

### Setting up environments

The environment is the real base URL of the API your application should call. When your application is calling the mock and there is no mock file for the endpoint, the mock will call the real API based on the environment that is selected in the config.

You can add, select and delete environment in section `Select Environment` and `Create New Environment` of http://localhost:3030/mock-services/configs

![Environments](https://i.imgur.com/GZc80Is.png)

### Status

The status for the mocks can be `paused` or `running`:

- Paused: all calls will actually be made, calling the real API, without returning mocked responses.
- Running: if the endpoint mock already exists in the selected mock collection folder, the mock will be returned and the real API call will not be made. If the mock file does not exist, the call will be made to the real API, and the response will be written to a file in the selected mocks folder.

![Status](https://i.imgur.com/ZYRyhRF.png)

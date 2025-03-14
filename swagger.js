const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: "Contacts API Documentation",
        description: "A simple CRUD web services for managing contacts",
        version: "1.0.0",
    },
    host: "https://cse341-w01-project.onrender.com/",
    schemes: ['https']
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
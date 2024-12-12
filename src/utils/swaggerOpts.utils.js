import __dirname from "../../utils.js";

const opts = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "API de Productos y Usuarios",
            description: "Documentación del CRUD de productos y usuarios"
        }
    },
    apis: [`${__dirname}/src/docs/*.yaml`],
};

export default opts;

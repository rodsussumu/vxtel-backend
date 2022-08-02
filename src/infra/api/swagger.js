const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { Router } = require("express");

class Swagger {
  routes;
  swaggerDocs;

  constructor() {
    this.routes = Router();
    const swaggerOptions = {
      swaggerDefinition: {
        info: {
          title: "VxTel API", // Title (required)
          version: "1.0.0", // Version (required)
          description: "VxTel API",
        },
      },
      basePath: "/",
      apis: ["./src/infra/api/routes/*.js"],
    };
    this.swaggerDocs = swaggerJsDoc(swaggerOptions);
  }

  GetSwaggerRoutes() {
    this.routes.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerDocs, {
        explorer: true,
      })
    );
    return this.routes;
  }
}

module.exports = Swagger;

/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

///////////////////////////////////
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
/////////////////////////////

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
//app.use(errorHandler); // обязательно в конце

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    ///////////////////////////////////
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());

    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Petshelter backend API documentation",
          version: "0.1.0",
          description: "Simple CRUD API operations",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
          // securityDefinitions: {
          //   Bearer: {
          //     type: "apiKey",
          //     name: "Authorization",
          //     in: "header",
          //     description:
          //       'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".',
          //   },
        },
        servers: [{ url: "http://localhost:5000/api" }],
      },
      // apis: ["./routes/*.js"],
      apis: [
        "./routes/index.js",
        "./routes/*.js",
        "./models/*.js",
        "./controllers/*.js",
      ],
    };

    const specs = swaggerJsdoc(options);
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(specs, { explorer: true })
    );
    ////////////////////////////////////////////

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = { app, sequelize };

/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const sequelize = require("./db");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(errorHandler); // обязательно в конце

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Petshelter backend API documentation",
          version: "0.1.0",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        servers: [{ url: "http://localhost:5000/api" }],
      },
      apis: ["./models/*.js", "./controllers/*.js"],
    };

    const specs = swaggerJsdoc(options);
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(specs, { explorer: true })
    );

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = { app, sequelize };

import "express-async-errors";
import fs from 'fs'
import path from 'path';
import express from "express";
import morgan from "morgan";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import { notFound } from "./middleware/notfound";
import loginRegisterRoute from "./routes/login-register";
import moviesAPIRoute from "./routes/api-movies";
import dotenv from "dotenv";
import requireJsonContent from "./middleware/jsonContent";
dotenv.config();



const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const app = express();

//swagger-api-documentation

const options = {
    definition: {
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
        }},
        openapi: "3.0.0",
        info: {
            title: "Movie API",
            version: "1.0.0",
            description: "Movie API Documentation",
            license: {
                name: "MIT",
                url: "https://github.com/Mohammad-Alavi/Movie-API/blob/main/LICENSE",
            },
            contact: {
                name: 'Raka',
                url : "",
                email : "test@gmail.com"
            }
        },
        servers : [
            {
                url: 'http://localhost:3000',
            
            }
        ],
        
    },
    apis: ["./src/routes/*.ts"]
}
const specs = swaggerJsdoc(options);
app.use('/api-docs',
swaggerUI.serve,
swaggerUI.setup(specs,{explorer: true}))
// ----------------------------------------------------------------

//logging configuration
const accessLogStream = fs.createWriteStream(
    path.join(__dirname,"..","access.log"),
    { flags: 'a' }
  )
app.use(morgan('common', { stream: accessLogStream }));


//server
const port = process.env.PORT || 3000;
app.use(express.json());


//routes
app.use("/users", loginRegisterRoute);
app.use("/api/movies", moviesAPIRoute);


//middleware
app.use(errorHandlerMiddleware);
app.use(notFound);
app.use(requireJsonContent)



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

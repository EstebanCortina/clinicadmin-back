import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

dotenv.config();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "prod" ? "combined" : "dev"));

import v1Router from "./routes/v1/index.js";
app.use("/v1", v1Router);

app.listen(process.env.PORT, () => {
    console.log(`Running on ${process.env.PORT}`);
});


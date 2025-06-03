import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from 'cors';

dotenv.config();

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "prod" ? "combined" : "dev"));

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:8000",
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));

import v1Router from "./routes/v1/index.js";
app.use("/v1", v1Router);

app.listen(process.env.PORT, () => {
    console.log(`Running on ${process.env.PORT}`);
});


import express from "express";
import successRes from "../../helpers/response.js";
import {getDb} from "../../helpers/getDb.js"

const mainV1Router = express.Router()

mainV1Router.get("/health", async (req, res)=>{

    const db = getDb();
    const result = await db.exec("SELECT * FROM health")

    return successRes(
        res, 200, "Health", result
    );
})

import authRouter from "./auth.js"
mainV1Router.use("/auth", authRouter)

import patientsRouter from "./patients.js"
mainV1Router.use("/patients", patientsRouter)

import appointmentsRouter from "./appointments.js"
mainV1Router.use("/appointments", appointmentsRouter)

import treatmentsRouter from "./treatments.js";
mainV1Router.use("/treatments", treatmentsRouter)

export default mainV1Router
import express from "express";
import successRes from "../../helpers/response.js";
import {getDb} from "../../helpers/getDb.js"

import { authenticate } from "../../helpers/session.js";

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
mainV1Router.use("/patients", authenticate, patientsRouter)

import appointmentsRouter from "./appointments.js"
mainV1Router.use("/appointments", authenticate, appointmentsRouter)

import treatmentsRouter from "./treatments.js";
mainV1Router.use("/treatments", authenticate, treatmentsRouter)

import appointmentTypesRouter from "./appointment_types.js";
mainV1Router.use("/appointment-types", authenticate, appointmentTypesRouter)

import appointmentStatusesRouter from "./appointment_statuses_types.js";
mainV1Router.use("/appointment-statuses", authenticate, appointmentStatusesRouter)

export default mainV1Router
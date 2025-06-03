import express from "express";

import {response, getDb } from "../../helpers/index.js"
import { indexAppointmentTypes } from "../../services/appointment_types_service.js";

const appointmentTypes = express.Router({ mergeParams: true })

appointmentTypes.get("/", async (req, res)=>{
    const db = getDb()

    return response(
            res,
            200,
            "Index appointment types",
            await indexAppointmentTypes(
                db
            )
        )
})

export default appointmentTypes
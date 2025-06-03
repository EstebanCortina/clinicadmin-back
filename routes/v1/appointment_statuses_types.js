import express from "express";

import {response, getDb } from "../../helpers/index.js"
import { indexAppointmentStatusesTypes } from "../../services/appointment_statuses_types.js";

const appointmentStatusesTypes = express.Router({ mergeParams: true })

appointmentStatusesTypes.get("/", async (req, res)=>{
    const db = getDb()

    return response(
            res,
            200,
            "Index appointment status types",
            await indexAppointmentStatusesTypes(
                db
            )
        )
})

export default appointmentStatusesTypes
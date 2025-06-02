import express from "express";

import { indexTreatments } from "../../services/treatments_service.js";
import {response, getDb } from "../../helpers/index.js"

const treatmentsRouter = express.Router({ mergeParams: true })

treatmentsRouter.get("/", async (req, res)=>{
    const db = getDb()

    return response(
            res,
            200,
            "Index treatments",
            await indexTreatments(
                db
            )
        )
})

export default treatmentsRouter
import express from "express";
import { body } from "express-validator";

import validateHandler from "../../handlers/validation_handler.js"
import { retrieveTreatmentById, assignPatientTreatment } from "../../services/treatments_service.js";
import { retrievePatientById } from "../../services/patients_service.js";
import {response, getDb, pagination} from "../../helpers/index.js"

const patientsTreatmentsRouter = express.Router({ mergeParams: true })

patientsTreatmentsRouter.post("/",
    [
        body('**').trim().blacklist('<>&\'"/').escape(),
        body('treatment_type_id').notEmpty().withMessage("Treatment type cannot be empty")
        .isString().withMessage("Appointment type must be a string"),
        body('from_date').notEmpty().withMessage("From date cannot be empty")
        .isISO8601({ strict: true }).withMessage("From date must be a valid date-time"),
        body('to_date').notEmpty().withMessage("To date cannot be empty")
        .isISO8601({ strict: true }).withMessage("To date must be a valid date-time"),
        body('comments').optional().isString().withMessage("Comments must be a string").customSanitizer(value => value ?? null)
    ], validateHandler,
    async (req, res) => {
        const db = getDb();

        const treatmentDb = await retrieveTreatmentById(req.body.treatment_type_id, db)
        if(!treatmentDb) return response(res, 404,"Invalid treatment type", null);

        let patientTreatment = null;
        const patientDb = await retrievePatientById(req.body.patient_id, db)
        if (!patientDb) return response(res, 404,"Patient not found", null);

        try {
            patientTreatment = await assignPatientTreatment(
                [
                    req.params.id,
                    req.body.treatment_type_id,
                    req.body.from_date,
                    req.body.to_date,
                    req.body.comments
                ], db
            )
        return response(
                res,
                201,
                "Patient's treatmet assigned",
                patientTreatment
            )
        } catch (error) {
            console.error(error);
            return response(
                res,
                500,
                "Server Error",
                null
            )
        }

})

export default patientsTreatmentsRouter
import express from "express";
import { body } from "express-validator";

import validateHandler from "../../handlers/validation_handler.js"
import { 
    createAppointment,
    retrieveApptStatusIdByName,
    retrieveApptTypeById,
    indexAppointments,
    retrieveAppointmentById,
    countAppointments
} from "../../services/appointments_service.js";
import { retrievePatientById, isPatientScheduleAvailable } from "../../services/patients_service.js";
import {response, getDb, pagination} from "../../helpers/index.js"

const appointmentsRouter = express.Router()

appointmentsRouter.post("/",
    [
        body('**').trim().blacklist('<>&\'"/').escape(),
        body('appointment_type_id').notEmpty().withMessage("Appointment type cannot be empty")
        .isString().withMessage("Appointment type must be a string"),
        body('patient_id').notEmpty().withMessage("Patient cannot be empty")
        .isString().withMessage("Patient must be a string"),
        body('schedule_date').notEmpty().withMessage("Schedule date cannot be empty")
        .isISO8601({ strict: true }).withMessage("Schedule date must be a valid date-time"),
        body('comments').optional().isString().withMessage("Comments must be a string").customSanitizer(value => value ?? null)
    ], validateHandler,
    async (req, res) => {
        const db = getDb();

        const apptTypeIdDb = await retrieveApptTypeById(req.body.appointment_type_id, db)
        if(!apptTypeIdDb) return response(res, 404,"Invalid appointment type", null);

        let appointmentDb = null;
        const patientDb = await retrievePatientById(req.body.patient_id, db)
        if (!patientDb) return response(res, 404,"Patient not found", null);

        if(!(await isPatientScheduleAvailable(req.body.patient_id, req.body.schedule_date, db))){
            return response(res, 400,"Patient has already an appointment for the selected schedule date", null);
        }
        const apptPendingStatusId = await retrieveApptStatusIdByName("Pendiente", db)

        try {
            appointmentDb = await createAppointment(
                [
                    req.body.appointment_type_id,
                    req.body.patient_id,
                    req.body.schedule_date,
                    req.body.comments,
                    apptPendingStatusId
                ], db
            )
        return response(
                res,
                201,
                "New appointment created",
                appointmentDb
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

appointmentsRouter.get("/", async (req, res)=>{
    const db = getDb()
    const appointments = await indexAppointments(
            pagination(req.query),
            db
        )
    const totalAppointments = await countAppointments(db);
    return response(
        res,
        200,
        "Index Patients",
        {appointments: appointments, total: totalAppointments}
    )
})

appointmentsRouter.get("/:id", async (req,res)=>{
    const db = getDb()
    return response(
        res,
        200,
        "Show Appointment",
        await retrieveAppointmentById(
            req.params.id,
            db
        )
    )
})

export default appointmentsRouter
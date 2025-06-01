import express from "express";
import { body } from "express-validator";

import validateHandler from "../../handlers/validation_handler.js"
import { createPatient } from "../../services/patients_service.js";
import {response, getDb} from "../../helpers/index.js"

const patientsRouter = express.Router()

patientsRouter.post("/",
    [
        body('**').trim().blacklist('<>&\'"/').escape(),
        body('name').notEmpty().withMessage("Name cannot be empty")
        .isString().withMessage("Name must be a string"),
        body('last_name').notEmpty().withMessage("Last name cannot be empty")
        .isString().withMessage("Last name must be a string"),
        body('age').notEmpty().withMessage("Age cannot be empty")
        .isInt().withMessage("Age must be a number"),
        body('national_id_number').notEmpty().withMessage("National ID number cannot be empty")
        .isString().withMessage("National ID number must be a string"),
        body('phone').notEmpty().withMessage("Patient's phone cannot be empty")
        .isString().withMessage("Phone must be a string"),
        body('address').notEmpty().withMessage("Address cannot be empty")
        .isString().withMessage("Address must be a string"),
        body('email').optional().isEmail().withMessage("Must be a valid email").customSanitizer(value => value ?? null),
        body('blood_group').optional().isString().withMessage("National ID number must be a string")
        .isLength({min: 2, max: 3}).withMessage("Invalid blood group format").customSanitizer(value => value ?? null),
        body('sex').optional().isString().withMessage("Sex must be a string")
        .isLength({min: 1, max: 1}).withMessage("Invalid sex format").customSanitizer(value => value ?? null),
        body('comments').optional().isString().withMessage("Comments must be a string").customSanitizer(value => value ?? null)
    ], validateHandler,
    async (req, res) => {
        const db = getDb();
        let patientDb = null;
        try {
            patientDb = await createPatient(
                [
                    req.body.name,
                    req.body.last_name,
                    req.body.age,
                    req.body.national_id_number,
                    req.body.phone,
                    req.body.address,
                    req.body.email,
                    req.body.blood_group,
                    req.body.sex,
                    req.body.comments
                ], db
            )
        return response(
                res,
                201,
                "New patient created",
                patientDb
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

patientsRouter.get("/", (req, res)=>{

})

patientsRouter.get("/:id", (req, res)=>{

})

patientsRouter.put("/:id", (req, res)=>{

})



export default patientsRouter
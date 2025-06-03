import express from "express";

import {response, getDb } from "../../helpers/index.js"
import upload from "../../handlers/multer_handler.js";
import { addPatientFile } from "../../services/patient_files_services.js";

const patientFilesRouter = express.Router({ mergeParams: true })

patientFilesRouter.post("/", upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No se subió ningún archivo' });
    }

    const base64 = file.buffer.toString('base64');
    await addPatientFile(
        req.params.id,
        base64,
        getDb()
    )

    return response(res, 201, {
      message: "Patient's file uploaded successfully",
      data: null
    });
  } catch (err) {
    console.error(err);
    return response(res, 500, {
      message: "Error uploading patient's file",
      data: null
    });
  }
});

export default patientFilesRouter
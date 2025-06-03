import express from "express";

import {response, getDb } from "../../helpers/index.js"
import upload from "../../handlers/multer_handler.js";
import { addPatientFile, getMainPatientFile } from "../../services/patient_files_services.js";

const patientFilesRouter = express.Router({ mergeParams: true })

patientFilesRouter.post("/", upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No se subió ningún archivo' });
    }

    await addPatientFile(
      req.params.id,
      file.buffer,
      getDb()
    );

    return res.status(201).json({
      message: "Archivo del paciente subido exitosamente",
      data: null
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error al subir el archivo del paciente",
      data: null
    });
  }
});


patientFilesRouter.get("/main", async (req, res) => {
  try {
    const db = getDb();
    const { file } = await getMainPatientFile(req.params.id, db);

    if (!file || file.length === 0) {
      return res.status(404).json({ message: "Archivo no encontrado" });
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="patient_file_${req.params.id}.pdf"`
    );
    res.setHeader("Content-Length", file.length);

    return res.send(file);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error al recuperar el archivo",
      data: null,
    });
  }
});


export default patientFilesRouter
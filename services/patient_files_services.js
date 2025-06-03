export const addPatientFile = async (patientId, file, db) => {
    db.exec(`
        INSERT INTO "patient_file"
        (patient_id, file)
        VALUES
        ($1, $2)
    `, [patientId, file])[0]?? null;
}
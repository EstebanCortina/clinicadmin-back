export const addPatientFile = async (patientId, file, db) => {
    db.exec(`
        INSERT INTO "patient_file"
        (patient_id, file)
        VALUES
        ($1, $2)
    `, [patientId, file])[0]?? null;
}

export const getMainPatientFile = async (patientId, db) => {
    return (await db.exec(`
        SELECT
            file
        FROM "patient_file"
        WHERE 
            patient_id = $1 AND 
            is_main = true
    `, [patientId]))[0] ?? null;
}
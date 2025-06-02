export const retrieveTreatmentById = async (treatmentId, db) =>{
    return (await db.exec(`
        SELECT 
            name, description
        FROM "treatment_type"
        WHERE
            id = $1
    `, [treatmentId]))[0]?? null;
}

export const assignPatientTreatment = async (assignData, db) => {

    return await db.exec(`
        INSERT INTO "treatment_type_patient"
        (
            patient_id, treatment_type_id,
            from_date, to_date,
            comments
        ) VALUES
        (
            $1, $2,
            $3, $4,
            $5
        ) RETURNING id, treatment_type_id,
            from_date, to_date,
            comments
    `, assignData)

}

export const indexTreatments = async (db) => {
    return await db.exec(`
        SELECT 
            id, name, description
        FROM "treatment_type"
        ORDER BY name
    `);
}

export const updatePatientTreatment = async (updateData, db) => {
    return await db.exec(`
        UPDATE "treatment_type_patient"
        SET
            from_date = $1,
            to_date = $2,
            comments = $3,
            updated_at = $5
        WHERE id = $4
        RETURNING id, treatment_type_id,
            from_date, to_date,
            comments
    `, updateData.concat([new Date().toISOString()]));
}
export const retrievePatientTreatmentById = async (patientTreatmentId, db) => {
    return (await db.exec(`
        SELECT 
            tt.id, ttp.patient_id, ttp.treatment_type_id,
            tt.name AS treatment_type_name,
            tt.description AS treatment_type_description,
            ttp.from_date, ttp.to_date,
            ttp.comments
        FROM "treatment_type_patient" ttp
        JOIN "treatment_type" tt ON
        (ttp.treatment_type_id = tt.id)
        WHERE ttp.id = $1 AND ttp.deleted_at IS NULL
    `, [patientTreatmentId]))[0] ?? null;
}
export const deletePatientTreatment = async (patientTreatmentId, db) => {
    return (await db.exec(`
        UPDATE "treatment_type_patient"
        SET deleted_at = $2
        WHERE id = $1
        RETURNING id, treatment_type_id,
            from_date, to_date,
            comments
    `, [patientTreatmentId, new Date().toISOString()]))[0] ?? null;
}
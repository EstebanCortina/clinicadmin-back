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
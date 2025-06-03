export const createPatient = async (patientsData, db) => {
    return (await db.exec(`
        INSERT INTO "patient"
        (
            name, last_name,
            age, national_id_number,
            phone, address,
            email, blood_group,
            sex, comments
        ) VALUES
        (
            $1, $2,
            $3, $4,
            $5, $6,
            $7, $8,
            $9, $10
        ) RETURNING  name, last_name,
            age, national_id_number,
            phone, address,
            email, blood_group,
            sex, comments
    `, patientsData))[0]?? null;
}

export const indexPatients = async ({page, perPage}, search, db) => {
    console.log("Indexing patients with search:", search);
    const statementParams = [page, perPage]
    if (search) statementParams.push(search)
    return await db.exec(`
        SELECT
            id, name, last_name,
            age, national_id_number,
            phone, address,
            email, blood_group,
            sex, comments
        FROM "patient"
        ${search? 'WHERE name ILIKE $3 OR last_name ILIKE $3' : ''}
        ORDER BY created_at ASC
        OFFSET $1
        LIMIT $2
    `,statementParams)
}

export const retrievePatientById = async (id, db) => {
    return await db.exec(`
        SELECT 
            name, last_name,
            age, national_id_number,
            phone, address,
            email, blood_group,
            sex, comments
        FROM "patient"
        WHERE
            id = $1
    `,[id])
}

export const updatePatient = async (patientsData, db) => {
    return (await db.exec(`
        UPDATE "patient"
        SET
            name=$1,
            last_name=$2,
            age=$3,
            national_id_number=$4,
            phone=$5,
            address=$6,
            email=$7,
            blood_group=$8,
            sex=$9,
            comments=$10,
            updated_at=$11
        WHERE
            id=$12
        RETURNING name, last_name,
            age, national_id_number,
            phone, address,
            email, blood_group,
            sex, comments
    `, patientsData))[0]?? null;
}

export const isPatientScheduleAvailable = async (patientId, scheduleDate, db) => {
    return (await db.exec(`
        SELECT
            1
        FROM "appointment"
        WHERE
            patient_id = $1 AND
            schedule_date::date = $2::date
    `, [patientId, scheduleDate])).length ? false : true;
}

export const fetchPatientTreatments = async (patientId, {page, perPage}, db) => {
    return await db.exec(`
        SELECT
            ttp.id,
            ttp.patient_id,
            ttp.treatment_type_id,
            tt.name as treatment_type_name,
            ttp.from_date,
            ttp.to_date,
            ttp.comments
        FROM "treatment_type_patient" ttp
        JOIN "patient" p ON
        (ttp.patient_id=p.id)
        JOIN "treatment_type" tt ON
        (ttp.treatment_type_id=tt.id)
        WHERE
            ttp.patient_id = $1 AND
            ttp.deleted_at IS NULL
        ORDER BY ttp.created_at ASC
        LIMIT $2
        OFFSET $3
    `, [patientId, perPage, page])
}

export const totalPatientTreatments = async (patientId, db) => {
    return (await db.exec(`
        SELECT
            COUNT(*) as total
        FROM "treatment_type_patient" ttp
        WHERE
            ttp.patient_id = $1 AND
            ttp.deleted_at IS NULL
    `, [patientId]))[0].total;
}
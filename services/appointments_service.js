export const retrieveApptStatusIdByName = async (apptStatusName, db) => {
    return (await db.exec(`
        SELECT
            id
        FROM "appointment_status_type"
        WHERE
            name ILIKE $1
    `, [`%${apptStatusName}%`]))[0].id?? null;
}

export const retrieveApptTypeById = async (apptTypeId, db) => {
    return (await db.exec(`
        SELECT
            name, description
        FROM "appointment_type"
        WHERE
            id = $1
    `, [apptTypeId]))[0]?? null;
}

export const createAppointment = async (apptData, db) => {
    return (await db.exec(`
        INSERT INTO "appointment"
        (
            appointment_type_id,
            patient_id,
            schedule_date,
            comments,
            appointment_status_type_id
        ) VALUES
        (
            $1, $2, $3, $4, $5
        ) RETURNING  id, appointment_type_id,
            schedule_date,
            appointment_status_type_id
    `, apptData))[0]?? null;
}

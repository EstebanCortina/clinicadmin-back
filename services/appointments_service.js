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

export const indexAppointments = async ({page, perPage}, db) => {
    return await db.exec(`
        SELECT 
            a.id, a.appointment_type_id,
            at.name as appointment_type_name,
            a.patient_id, p.name as patient_name,
            p.last_name as patient_last_name,
            a.schedule_date, a.comments,
            a.appointment_status_type_id, ast.name as appointment_status_type_name
        FROM "appointment" a
        JOIN "appointment_type" at ON
        (a.appointment_type_id=at.id)
        JOIN "patient" p ON
        (a.patient_id=p.id)
        JOIN "appointment_status_type" ast ON
        (a.appointment_status_type_id=ast.id)
        OFFSET $1
        LIMIT $2
    `,[page, perPage])
}

export const retrieveAppointmentById = async (apptId, db) => {
    return (await db.exec(`
        SELECT 
            a.id, a.appointment_type_id,
            at.name as appointment_type_name,
            a.patient_id, p.name as patient_name,
            p.last_name as patient_last_name,
            a.schedule_date, a.comments,
            a.appointment_status_type_id, ast.name as appointment_status_type_name
        FROM "appointment" a
        JOIN "appointment_type" at ON
        (a.appointment_type_id=at.id)
        JOIN "patient" p ON
        (a.patient_id=p.id)
        JOIN "appointment_status_type" ast ON
        (a.appointment_status_type_id=ast.id)
        WHERE
            a.id = $1
    `,[apptId]))[0]?? null;
}

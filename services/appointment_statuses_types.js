export const indexAppointmentStatusesTypes = async (db) => {
    return await db.exec(`
        SELECT 
            id, name, description
        FROM "appointment_status_type"
        ORDER BY name
    `);
}
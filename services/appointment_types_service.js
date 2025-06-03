export const indexAppointmentTypes = async (db) => {
    return await db.exec(`
        SELECT 
            id, name, description
        FROM "appointment_type"
        ORDER BY name
    `);
}
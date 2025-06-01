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

export const indexPatients = async ({page, perPage}, db) => {
    console.log(page, perPage)
    return await db.exec(`
        SELECT 
            name, last_name,
            age, national_id_number,
            phone, address,
            email, blood_group,
            sex, comments
        FROM "patient"
        OFFSET ${page}
        LIMIT ${perPage}
    `)
}
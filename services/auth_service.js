
export const getUserByEmail = async (userEmail, db) => {
    return (await db.exec(`
        SELECT 
            id, email, password
        FROM "user"
        WHERE 
            email=$1 AND 
            is_active=true AND
            deleted_at IS NULL
    `, [userEmail]))[0]?? null
}

import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
export const generateSessionToken = (sessionData) => {
    const token = jwt.sign(
        sessionData,
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );
    return {token}
}

import bcrypt from 'bcrypt';
export const isPasswordCorrect = async (hashPass, plainPass) =>{
    console.log(plainPass, hashPass)
    return await bcrypt.compare(plainPass, hashPass);
}
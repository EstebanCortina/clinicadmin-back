import express from "express";
import { getDb } from "../../helpers/getDb.js"
import response from "../../helpers/response.js";
import { getUserByEmail, generateSessionToken, isPasswordCorrect } from "../../services/auth_service.js";

const authRouter = express.Router();


authRouter.post("/sign-in", async (req, res)=> {
    const db = getDb();
    let userDb = null
    try {
        userDb = await getUserByEmail(req.body.email, db);
        if (!userDb) return response
        (
            res,
            401,
            "Unauthorized",
            null
        )
        const match = await isPasswordCorrect(userDb.password, req.body.password)
        if (!(match)) return response
        (
            res,
            401,
            "Unauthorized",
            null
        )
        delete userDb.password
    } catch (error) {
        console.error(error);
        return response(
            res,
            500,
            "Server Error",
            null
        )
    }

    return response(
        res,
        200,
        "Sign-in success",
        generateSessionToken(userDb)
    )
});


export default authRouter;


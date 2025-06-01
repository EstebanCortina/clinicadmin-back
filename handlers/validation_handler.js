import { validationResult } from "express-validator"
import response from "../helpers/response.js"
export default (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return response(
                res,
                400,
                "Bad request",
                errors.array()[0].msg
            )
    }
    next();
}
import db from "../handlers/db_handler.js"
import { pool } from "../config/db_config.js"

export const getDb = () => new db(pool);


export const response = (
    res,
    httpStatus = 200,
    message = "Success",
    data = null
) => res.status(httpStatus).send({
    httpStatus: httpStatus,
    message: message,
    data: data,
});
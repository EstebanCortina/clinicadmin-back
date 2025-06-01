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

export const pagination = (queryParams) => {
    const page = parseInt(queryParams.page?? 1, 10)
    const limit = parseInt(queryParams.per_page?? 20, 10);
    return {page: ((page - 1) * limit), perPage: limit}
}
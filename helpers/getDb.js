import db from "../handlers/db_handler.js"
import { pool } from "../config/db_config.js"

export const getDb = () => new db(pool);
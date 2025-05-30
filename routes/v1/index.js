import express from "express";
import successRes from "../../helpers/successRes.js";

const mainV1Router = express.Router()

mainV1Router.get("/health", (req, res)=>{
    return successRes(
        res
    );
})

export default mainV1Router
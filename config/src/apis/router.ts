import express from "express";
import { getConfig } from "./config.service";
import { dtoCheck } from "../core/middleware/config.middleware";
import { ConfigDto } from "./config.dto";

const configRouter = express.Router();

configRouter.route("/").post(dtoCheck(ConfigDto), getConfig);

export default configRouter;

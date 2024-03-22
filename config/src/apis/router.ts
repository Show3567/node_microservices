import express from "express";
import { getConfig, getKey } from "./config.service";
import { dtoCheck } from "../core/middleware/config.middleware";
import { ConfigDto } from "./config.dto";

const configRouter = express.Router();

configRouter
	.route("/")
	.post(dtoCheck(ConfigDto), getConfig)
	.get(getKey);

export default configRouter;

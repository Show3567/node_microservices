import express from "express";
import { getConfig } from "./config.service";

const configRouter = express.Router();

configRouter.route("/").post(getConfig);

export default configRouter;

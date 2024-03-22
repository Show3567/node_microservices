import express, { RequestHandler } from "express";
import { dtoCheck } from "../core/middleware/auth.middleware";
import { SetServerDto } from "./dto/setServer.dto";

export const discoveryRouter = (service: {
	[key: string]: RequestHandler;
}) => {
	const router = express.Router();

	router.route("").post(dtoCheck(SetServerDto), service.setServerAdd);
	router.route("/:key").get(service.getServerAdd);

	return router;
};

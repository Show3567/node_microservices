import express, { RequestHandler } from "express";
import { dtoCheck } from "../core/middleware/auth.middleware";
import { ServiceRegistryDTO } from "./dto/setServer.dto";

export const discoveryRouter = (service: {
	[key: string]: RequestHandler;
}) => {
	const router = express.Router();

	router
		.route("/set")
		.post(dtoCheck(ServiceRegistryDTO), service.setServerAdd);
	router.route("/get/:key").get(service.getServerAdd);
	router.route("/delete/:key").delete(service.deleteKey);
	router.route("/get-all").get(service.checkAllData);

	return router;
};
